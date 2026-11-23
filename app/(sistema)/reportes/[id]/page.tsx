import { Suspense } from "react"
import { DetalleIncidencia } from "@/components/campusfix/detalle-incidencia"

export default async function PaginaDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <Suspense>
      <DetalleIncidencia id={id} />
    </Suspense>
  )
}
