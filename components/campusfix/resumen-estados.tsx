"use client"

import { CheckCircle2, CircleDashed, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Estado } from "@/lib/campusfix/types"
import type { FiltroEstado } from "./filtros-incidencias"

interface Props {
  total: number
  conteo: Record<Estado, number>
  activo: FiltroEstado
  onSeleccionar: (estado: FiltroEstado) => void
}

export function ResumenEstados({ total, conteo, activo, onSeleccionar }: Props) {
  const porcentaje = (n: number) => (total === 0 ? 0 : Math.round((n / total) * 100))

  const tarjetas = [
    {
      clave: "Todos" as FiltroEstado,
      etiqueta: "Total de incidencias",
      valor: total,
      detalle: `${conteo["En proceso"]} en proceso actualmente`,
      icono: ClipboardList,
      color: "bg-primary text-primary-foreground",
      barra: "bg-primary",
    },
    {
      clave: "Pendiente" as FiltroEstado,
      etiqueta: "Pendientes",
      valor: conteo.Pendiente,
      detalle: `${porcentaje(conteo.Pendiente)}% del total`,
      icono: CircleDashed,
      color: "bg-amber-100 text-amber-800",
      barra: "bg-amber-500",
    },
    {
      clave: "Resuelto" as FiltroEstado,
      etiqueta: "Resueltas",
      valor: conteo.Resuelto,
      detalle: `${porcentaje(conteo.Resuelto)}% del total`,
      icono: CheckCircle2,
      color: "bg-emerald-100 text-emerald-800",
      barra: "bg-emerald-500",
    },
  ]

  return (
    <section aria-label="Resumen de incidencias" className="grid gap-4 sm:grid-cols-3">
      {tarjetas.map(({ clave, etiqueta, valor, detalle, icono: Icono, color, barra }) => (
        <button
          key={clave}
          type="button"
          onClick={() => onSeleccionar(clave)}
          aria-pressed={activo === clave}
          aria-label={`${etiqueta}: ${valor}. Filtrar listado`}
          className={cn(
            "relative flex flex-col gap-4 overflow-hidden rounded-xl border bg-card p-5 text-left shadow-sm transition-all hover:border-cian hover:shadow-md",
            activo === clave && "border-cian ring-2 ring-cian/40",
          )}
        >
          <span className={cn("absolute inset-x-0 top-0 h-1", barra)} aria-hidden="true" />
          <span className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{etiqueta}</span>
            <span className={cn("flex size-9 items-center justify-center rounded-lg", color)} aria-hidden="true">
              <Icono className="size-5" />
            </span>
          </span>
          <span className="text-4xl font-bold leading-none tracking-tight tabular-nums text-primary">{valor}</span>
          <span className="text-xs text-muted-foreground">{detalle}</span>
        </button>
      ))}
    </section>
  )
}
