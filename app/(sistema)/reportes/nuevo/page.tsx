import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FormularioReporte } from "@/components/campusfix/formulario-reporte"

export default function PaginaNuevoReporte() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link
        href="/panel"
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver al panel
      </Link>
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Nuevo reporte de incidencia</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Describe la falla de infraestructura con el mayor detalle posible. Los campos marcados con{" "}
          <span className="text-red-700">*</span> son obligatorios.
        </p>
      </div>
      <FormularioReporte />
    </div>
  )
}
