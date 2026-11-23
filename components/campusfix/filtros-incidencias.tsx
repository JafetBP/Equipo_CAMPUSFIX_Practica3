"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ESTADOS, type Estado } from "@/lib/campusfix/types"

export type FiltroEstado = Estado | "Todos"

const OPCIONES: FiltroEstado[] = ["Todos", ...ESTADOS]

interface Props {
  busqueda: string
  onBusqueda: (valor: string) => void
  estado: FiltroEstado
  onEstado: (valor: FiltroEstado) => void
}

export function FiltrosIncidencias({ busqueda, onBusqueda, estado, onEstado }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-3 md:flex-row md:items-center">
      <div className="relative flex-1">
        <label htmlFor="busqueda" className="sr-only">
          Buscar incidencias
        </label>
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="busqueda"
          type="search"
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Buscar por título, edificio, ubicación, categoría o folio…"
          className="h-10 pr-9 pl-9"
        />
        {busqueda && (
          <button
            type="button"
            onClick={() => onBusqueda("")}
            className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Borrar búsqueda"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div role="group" aria-label="Filtrar por estado" className="flex flex-wrap gap-1 rounded-md bg-muted p-1">
        {OPCIONES.map((op) => (
          <button
            key={op}
            type="button"
            onClick={() => onEstado(op)}
            aria-pressed={estado === op}
            className={cn(
              "rounded px-3 py-1.5 text-sm font-medium transition-colors",
              estado === op
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  )
}
