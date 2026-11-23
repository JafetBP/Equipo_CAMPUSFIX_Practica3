import type { CambioEstado } from "@/lib/campusfix/types"
import { EstadoBadge, formatearFecha } from "./badges"

export function HistorialEstados({ historial }: { historial: CambioEstado[] }) {
  const ordenado = [...historial].reverse()
  return (
    <section aria-labelledby="titulo-historial" className="rounded-xl border bg-card p-5 shadow-sm">
      <h2 id="titulo-historial" className="font-semibold">
        Historial de atención
      </h2>
      <ol className="mt-4 flex flex-col">
        {ordenado.map((cambio, i) => (
          <li key={`${cambio.fecha}-${i}`} className="relative flex gap-3 pb-5 last:pb-0">
            {i < ordenado.length - 1 && (
              <span className="absolute top-4 left-[5px] h-full w-px bg-border" aria-hidden="true" />
            )}
            <span
              className="relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-primary bg-card"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <EstadoBadge estado={cambio.estado} className="w-fit" />
              <p className="text-xs text-muted-foreground">
                {cambio.autor} · {formatearFecha(cambio.fecha, true)}
              </p>
              {cambio.nota && (
                <p className="mt-1 rounded-md border-l-2 border-cian bg-cian-suave px-3 py-2 text-sm leading-relaxed">
                  {cambio.nota}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
