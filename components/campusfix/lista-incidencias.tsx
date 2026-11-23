import Link from "next/link"
import { Building2, ChevronRight, MapPin } from "lucide-react"
import type { Incidencia } from "@/lib/campusfix/types"
import { EstadoBadge, PrioridadTexto, formatearFecha } from "./badges"

export function ListaIncidencias({ incidencias }: { incidencias: Incidencia[] }) {
  return (
    <ul className="flex flex-col divide-y overflow-hidden rounded-lg border bg-card">
      {incidencias.map((inc) => (
        <li key={inc.id}>
          <Link
            href={`/reportes/${inc.id}`}
            className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none sm:p-5"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-xs text-muted-foreground">{inc.id}</span>
                <EstadoBadge estado={inc.estado} />
                <PrioridadTexto prioridad={inc.prioridad} />
              </div>
              <h3 className="font-semibold text-pretty group-hover:text-primary">{inc.titulo}</h3>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-4">
                <span className="flex items-center gap-1.5">
                  <Building2 className="size-3.5 shrink-0" aria-hidden="true" />
                  {inc.edificio}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  {inc.ubicacion}
                </span>
              </div>
            </div>
            <div className="hidden shrink-0 text-right text-xs text-muted-foreground sm:block">
              <p className="font-medium text-foreground">{inc.categoria}</p>
              <p className="mt-1">{formatearFecha(inc.fechaCreacion)}</p>
            </div>
            <ChevronRight
              className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
