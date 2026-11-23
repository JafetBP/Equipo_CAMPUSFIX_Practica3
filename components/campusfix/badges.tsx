import { cn } from "@/lib/utils"
import type { Estado, Prioridad } from "@/lib/campusfix/types"

const estiloEstado: Record<Estado, string> = {
  Pendiente: "bg-amber-50 text-amber-800 ring-amber-200",
  "En proceso": "bg-sky-50 text-sky-800 ring-sky-200",
  Resuelto: "bg-emerald-50 text-emerald-800 ring-emerald-200",
}

const puntoEstado: Record<Estado, string> = {
  Pendiente: "bg-amber-500",
  "En proceso": "bg-sky-500",
  Resuelto: "bg-emerald-500",
}

export function EstadoBadge({ estado, className }: { estado: Estado; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        estiloEstado[estado],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", puntoEstado[estado])} aria-hidden="true" />
      {estado}
    </span>
  )
}

const estiloPrioridad: Record<Prioridad, string> = {
  Baja: "text-muted-foreground",
  Media: "text-cian-fuerte",
  Alta: "text-red-700",
}

export function PrioridadTexto({ prioridad }: { prioridad: Prioridad }) {
  return (
    <span className={cn("text-xs font-medium whitespace-nowrap", estiloPrioridad[prioridad])}>
      Prioridad {prioridad.toLowerCase()}
    </span>
  )
}

export function formatearFecha(iso: string, conHora = false) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(conHora ? { hour: "2-digit", minute: "2-digit" } : {}),
  })
}
