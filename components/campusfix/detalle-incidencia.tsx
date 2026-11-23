"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Building2, CalendarDays, CheckCircle2, MapPin, Tag, User } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { useCampusFix } from "./campusfix-provider"
import { EstadoBadge, PrioridadTexto, formatearFecha } from "./badges"
import { EstadoVacio } from "./estado-vacio"
import { CambiarEstado } from "./cambiar-estado"
import { HistorialEstados } from "./historial-estados"

export function DetalleIncidencia({ id }: { id: string }) {
  const { incidencias } = useCampusFix()
  const creado = useSearchParams().get("creado") === "1"
  const incidencia = incidencias.find((i) => i.id === decodeURIComponent(id))

  const volver = (
    <Link
      href="/panel"
      className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Volver al panel
    </Link>
  )

  if (!incidencia) {
    return (
      <div className="flex flex-col gap-6">
        {volver}
        <EstadoVacio
          titulo="Incidencia no encontrada"
          descripcion={`No existe un reporte con el folio ${decodeURIComponent(id)}. Es posible que haya sido eliminado o que el enlace sea incorrecto.`}
          accion={
            <Link href="/panel" className={buttonVariants()}>
              Ir al panel
            </Link>
          }
        />
      </div>
    )
  }

  const datos = [
    { icono: Building2, etiqueta: "Edificio", valor: incidencia.edificio },
    { icono: MapPin, etiqueta: "Ubicación", valor: incidencia.ubicacion },
    { icono: Tag, etiqueta: "Categoría", valor: incidencia.categoria },
    { icono: User, etiqueta: "Reportado por", valor: incidencia.reportadoPor },
    { icono: CalendarDays, etiqueta: "Fecha de reporte", valor: formatearFecha(incidencia.fechaCreacion, true) },
  ]

  return (
    <div className="flex flex-col gap-6">
      {volver}

      {creado && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
          <p>
            <span className="font-semibold">Reporte registrado correctamente.</span> Se asignó el folio{" "}
            {incidencia.id} y quedó en estado Pendiente.
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="flex flex-col gap-6 rounded-xl border bg-card p-5 shadow-sm sm:p-8 lg:col-span-2">
          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm text-muted-foreground">{incidencia.id}</span>
              <EstadoBadge estado={incidencia.estado} />
              <PrioridadTexto prioridad={incidencia.prioridad} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{incidencia.titulo}</h1>
          </header>

          <section aria-labelledby="titulo-descripcion">
            <h2 id="titulo-descripcion" className="text-sm font-semibold text-muted-foreground">
              Descripción
            </h2>
            <p className="mt-2 leading-relaxed text-pretty">{incidencia.descripcion}</p>
          </section>

          <dl className="grid gap-4 border-t pt-6 sm:grid-cols-2">
            {datos.map(({ icono: Icono, etiqueta, valor }) => (
              <div key={etiqueta} className="flex gap-3">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-primary"
                  aria-hidden="true"
                >
                  <Icono className="size-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">{etiqueta}</dt>
                  <dd className="text-sm font-medium">{valor}</dd>
                </div>
              </div>
            ))}
          </dl>
        </article>

        <aside className="flex flex-col gap-6">
          <CambiarEstado incidencia={incidencia} />
          <HistorialEstados historial={incidencia.historial} />
        </aside>
      </div>
    </div>
  )
}
