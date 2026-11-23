"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Estado } from "@/lib/campusfix/types"
import { useCampusFix } from "./campusfix-provider"
import { FiltrosIncidencias, type FiltroEstado } from "./filtros-incidencias"
import { ResumenEstados } from "./resumen-estados"
import { ListaIncidencias } from "./lista-incidencias"
import { EstadoVacio } from "./estado-vacio"

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function PanelIncidencias() {
  const { incidencias, usuario } = useCampusFix()
  const [busqueda, setBusqueda] = useState("")
  const [estado, setEstado] = useState<FiltroEstado>("Todos")

  const conteo = useMemo(() => {
    const base: Record<Estado, number> = { Pendiente: 0, "En proceso": 0, Resuelto: 0 }
    for (const inc of incidencias) base[inc.estado]++
    return base
  }, [incidencias])

  const filtradas = useMemo(() => {
    const termino = normalizar(busqueda.trim())
    return incidencias.filter((inc) => {
      if (estado !== "Todos" && inc.estado !== estado) return false
      if (!termino) return true
      const campos = [inc.id, inc.titulo, inc.descripcion, inc.edificio, inc.ubicacion, inc.categoria]
      return campos.some((c) => normalizar(c).includes(termino))
    })
  }, [incidencias, busqueda, estado])

  const hayFiltros = busqueda.trim() !== "" || estado !== "Todos"

  function limpiarFiltros() {
    setBusqueda("")
    setEstado("Todos")
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-cian-fuerte">
            Bienvenido(a), {usuario?.nombre} · {usuario?.rol}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Panel de incidencias</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Consulta y da seguimiento a los reportes de infraestructura del campus.
          </p>
        </div>
        <Link href="/reportes/nuevo" className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}>
          <Plus data-icon="inline-start" />
          Nuevo reporte
        </Link>
      </div>

      <ResumenEstados total={incidencias.length} conteo={conteo} activo={estado} onSeleccionar={setEstado} />

      <section aria-labelledby="titulo-listado" className="flex flex-col gap-4">
        <h2 id="titulo-listado" className="sr-only">
          Listado de incidencias
        </h2>
        <FiltrosIncidencias
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          estado={estado}
          onEstado={setEstado}
        />
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Mostrando {filtradas.length} de {incidencias.length} incidencias
        </p>

        {filtradas.length > 0 ? (
          <ListaIncidencias incidencias={filtradas} />
        ) : hayFiltros ? (
          <EstadoVacio
            titulo="No se encontraron incidencias"
            descripcion={
              busqueda.trim()
                ? `No hay reportes que coincidan con "${busqueda.trim()}"${estado !== "Todos" ? ` en estado ${estado}` : ""}. Prueba con otros términos o cambia el filtro.`
                : `No hay reportes con estado ${estado} por el momento.`
            }
            accion={
              <Button variant="outline" onClick={limpiarFiltros}>
                Limpiar filtros
              </Button>
            }
          />
        ) : (
          <EstadoVacio
            titulo="Aún no hay incidencias registradas"
            descripcion="Cuando se reporte una falla de infraestructura aparecerá en este listado."
            accion={
              <Link href="/reportes/nuevo" className={buttonVariants()}>
                Crear el primer reporte
              </Link>
            }
          />
        )}
      </section>
    </div>
  )
}
