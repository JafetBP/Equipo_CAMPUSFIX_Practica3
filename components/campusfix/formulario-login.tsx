"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap, HardHat, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { Rol } from "@/lib/campusfix/types"
import { useCampusFix } from "./campusfix-provider"

const ROLES: { rol: Rol; descripcion: string; icono: typeof GraduationCap; nombrePorDefecto: string }[] = [
  {
    rol: "Alumno",
    descripcion: "Reporta incidencias y consulta su avance",
    icono: GraduationCap,
    nombrePorDefecto: "Alumno Invitado",
  },
  {
    rol: "Técnico",
    descripcion: "Atiende reportes y actualiza su estado",
    icono: HardHat,
    nombrePorDefecto: "Técnico de Mantenimiento",
  },
]

export function FormularioLogin() {
  const router = useRouter()
  const { iniciarSesion } = useCampusFix()
  const [rol, setRol] = useState<Rol>("Alumno")
  const [nombre, setNombre] = useState("")

  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault()
    const porDefecto = ROLES.find((r) => r.rol === rol)!.nombrePorDefecto
    iniciarSesion({ nombre: nombre.trim() || porDefecto, rol })
    router.push("/panel")
  }

  return (
    <form onSubmit={manejarEnvio} className="mt-8 flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium">Rol de acceso</legend>
        <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
          {ROLES.map(({ rol: r, descripcion, icono: Icono }) => {
            const activo = rol === r
            return (
              <label
                key={r}
                className={cn(
                  "flex cursor-pointer flex-col gap-2 rounded-lg border bg-card p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                  activo ? "border-primary ring-1 ring-primary" : "hover:border-primary/40",
                )}
              >
                <input
                  type="radio"
                  name="rol"
                  value={r}
                  checked={activo}
                  onChange={() => setRol(r)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-md",
                    activo ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
                  )}
                  aria-hidden="true"
                >
                  <Icono className="size-5" />
                </span>
                <span className="font-semibold">{r}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{descripcion}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor="nombre">
          Nombre <span className="font-normal text-muted-foreground">(opcional)</span>
        </Label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. María Fernanda López"
          autoComplete="name"
          className="h-10 bg-card"
        />
      </div>

      <Button type="submit" size="lg" className="h-11">
        <LogIn data-icon="inline-start" />
        Entrar como {rol}
      </Button>
    </form>
  )
}
