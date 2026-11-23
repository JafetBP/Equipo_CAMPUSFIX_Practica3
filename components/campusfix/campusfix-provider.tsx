"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { INCIDENCIAS_INICIALES } from "@/lib/campusfix/datos-iniciales"
import type { Estado, Incidencia, Usuario } from "@/lib/campusfix/types"

export type NuevaIncidencia = Pick<
  Incidencia,
  "titulo" | "descripcion" | "edificio" | "ubicacion" | "categoria" | "prioridad"
>

interface CampusFixContextValue {
  usuario: Usuario | null
  iniciarSesion: (usuario: Usuario) => void
  cerrarSesion: () => void
  incidencias: Incidencia[]
  agregarIncidencia: (datos: NuevaIncidencia) => Incidencia
  cambiarEstado: (id: string, estado: Estado, nota?: string) => void
}

const CampusFixContext = createContext<CampusFixContextValue | null>(null)

function siguienteId(incidencias: Incidencia[]) {
  const max = incidencias.reduce((acc, inc) => Math.max(acc, Number(inc.id.replace("INC-", ""))), 1000)
  return `INC-${max + 1}`
}

export function CampusFixProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [incidencias, setIncidencias] = useState<Incidencia[]>(INCIDENCIAS_INICIALES)

  const iniciarSesion = useCallback((u: Usuario) => setUsuario(u), [])
  const cerrarSesion = useCallback(() => setUsuario(null), [])

  const agregarIncidencia = useCallback(
    (datos: NuevaIncidencia) => {
      const ahora = new Date().toISOString()
      const autor = usuario?.nombre ?? "Usuario"
      const nueva: Incidencia = {
        ...datos,
        id: siguienteId(incidencias),
        estado: "Pendiente",
        reportadoPor: autor,
        fechaCreacion: ahora,
        historial: [{ estado: "Pendiente", fecha: ahora, autor }],
      }
      setIncidencias((prev) => [nueva, ...prev])
      return nueva
    },
    [incidencias, usuario],
  )

  const cambiarEstado = useCallback(
    (id: string, estado: Estado, nota?: string) => {
      if (usuario?.rol !== "Técnico") return
      const autor = usuario.nombre
      const notaLimpia = nota?.trim() || undefined
      setIncidencias((prev) =>
        prev.map((inc) =>
          inc.id === id && (inc.estado !== estado || notaLimpia)
            ? {
                ...inc,
                estado,
                historial: [
                  ...inc.historial,
                  { estado, fecha: new Date().toISOString(), autor, nota: notaLimpia },
                ],
              }
            : inc,
        ),
      )
    },
    [usuario],
  )

  const value = useMemo(
    () => ({ usuario, iniciarSesion, cerrarSesion, incidencias, agregarIncidencia, cambiarEstado }),
    [usuario, iniciarSesion, cerrarSesion, incidencias, agregarIncidencia, cambiarEstado],
  )

  return <CampusFixContext.Provider value={value}>{children}</CampusFixContext.Provider>
}

export function useCampusFix() {
  const ctx = useContext(CampusFixContext)
  if (!ctx) throw new Error("useCampusFix debe usarse dentro de CampusFixProvider")
  return ctx
}
