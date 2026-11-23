import { FormularioLogin } from "@/components/campusfix/formulario-login"
import { Logo } from "@/components/campusfix/logo"
import { Building2, ClipboardCheck, Clock } from "lucide-react"

export default function PaginaInicioSesion() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Logo invertido />
        <div className="max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-balance">
            Un campus en buenas condiciones es responsabilidad de todos.
          </h2>
          <p className="mt-4 leading-relaxed text-primary-foreground/80">
            Reporta fallas de infraestructura y da seguimiento a su atención en tiempo real.
          </p>
          <ul className="mt-8 flex flex-col gap-4 text-sm">
            <li className="flex items-center gap-3">
              <Building2 className="size-5 text-cian" aria-hidden="true" />
              Cobertura de todas las facultades y edificios
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-5 text-cian" aria-hidden="true" />
              Seguimiento del estado de cada reporte
            </li>
            <li className="flex items-center gap-3">
              <ClipboardCheck className="size-5 text-cian" aria-hidden="true" />
              Historial completo de atención técnica
            </li>
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/60">Dirección de Infraestructura y Mantenimiento</p>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Logo className="mb-8 lg:hidden" />
          <h1 className="text-2xl font-bold tracking-tight">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Selecciona tu rol para acceder al sistema. Este es un acceso simulado, no se requiere contraseña.
          </p>
          <FormularioLogin />
        </div>
      </section>
    </main>
  )
}
