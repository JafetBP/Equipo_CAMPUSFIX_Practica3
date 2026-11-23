"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, LogOut, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCampusFix } from "./campusfix-provider"
import { Logo } from "./logo"

const ENLACES = [
  { href: "/panel", etiqueta: "Panel de incidencias", icono: LayoutDashboard },
  { href: "/reportes/nuevo", etiqueta: "Nuevo reporte", icono: PlusCircle },
]

export function MarcoSistema({ children }: { children: React.ReactNode }) {
  const { usuario, cerrarSesion } = useCampusFix()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!usuario) router.replace("/")
  }, [usuario, router])

  if (!usuario) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-muted-foreground" role="status">
        Redirigiendo al inicio de sesión…
      </div>
    )
  }

  function salir() {
    cerrarSesion()
    router.replace("/")
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link href="/panel" aria-label="CAMPUSFIX, ir al panel">
            <Logo />
          </Link>
          <nav aria-label="Principal" className="ml-2 flex items-center gap-1">
            {ENLACES.map(({ href, etiqueta, icono: Icono }) => {
              const activo = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={activo ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    activo
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icono className="size-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{etiqueta}</span>
                  <span className="sr-only sm:hidden">{etiqueta}</span>
                </Link>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-sm font-medium leading-tight">{usuario.nombre}</p>
              <p className="text-xs text-muted-foreground">{usuario.rol}</p>
            </div>
            <Button variant="outline" size="sm" onClick={salir}>
              <LogOut data-icon="inline-start" />
              <span className="hidden sm:inline">Cerrar sesión</span>
              <span className="sr-only sm:hidden">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        CAMPUSFIX · Dirección de Infraestructura y Mantenimiento Universitario
      </footer>
    </div>
  )
}
