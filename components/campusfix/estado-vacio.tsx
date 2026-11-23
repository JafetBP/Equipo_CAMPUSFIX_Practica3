import { SearchX } from "lucide-react"

interface Props {
  titulo: string
  descripcion: string
  accion?: React.ReactNode
}

export function EstadoVacio({ titulo, descripcion, accion }: Props) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed bg-card px-6 py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary" aria-hidden="true">
        <SearchX className="size-6" />
      </span>
      <h3 className="mt-4 font-semibold">{titulo}</h3>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">{descripcion}</p>
      {accion && <div className="mt-6">{accion}</div>}
    </div>
  )
}
