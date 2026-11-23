"use client"

import { useState } from "react"
import { Check, CheckCircle2, Lock, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ESTADOS, type Estado, type Incidencia } from "@/lib/campusfix/types"
import { useCampusFix } from "./campusfix-provider"

const DESCRIPCION: Record<Estado, string> = {
  Pendiente: "En espera de ser atendida",
  "En proceso": "Personal técnico trabajando en ella",
  Resuelto: "La falla fue corregida",
}

const LIMITE_NOTA = 200

export function CambiarEstado({ incidencia }: { incidencia: Incidencia }) {
  const { usuario, cambiarEstado } = useCampusFix()
  const esTecnico = usuario?.rol === "Técnico"
  const [seleccion, setSeleccion] = useState<Estado>(incidencia.estado)
  const [nota, setNota] = useState("")
  const [aviso, setAviso] = useState<string | null>(null)

  const cambioEstado = seleccion !== incidencia.estado
  const hayCambios = cambioEstado || nota.trim() !== ""

  function guardar(e: React.FormEvent) {
    e.preventDefault()
    if (!esTecnico || !hayCambios) return
    cambiarEstado(incidencia.id, seleccion, nota)
    setAviso(
      cambioEstado
        ? `Estado actualizado a "${seleccion}"${nota.trim() ? " con nota de seguimiento" : ""}.`
        : "Nota de seguimiento agregada al historial.",
    )
    setNota("")
  }

  return (
    <section aria-labelledby="titulo-estado" className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="titulo-estado" className="font-semibold">
            {esTecnico ? "Actualizar estado" : "Estado del reporte"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {esTecnico
              ? "Selecciona el nuevo estado y agrega una nota de seguimiento."
              : "Consulta el avance de esta incidencia."}
          </p>
        </div>
        {!esTecnico && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            <Lock className="size-3" aria-hidden="true" />
            Solo lectura
          </span>
        )}
      </div>

      <form onSubmit={guardar} className="mt-4 flex flex-col gap-4">
        <div role="radiogroup" aria-labelledby="titulo-estado" className="flex flex-col gap-2">
          {ESTADOS.map((estado) => {
            const activo = (esTecnico ? seleccion : incidencia.estado) === estado
            return (
              <button
                key={estado}
                type="button"
                role="radio"
                aria-checked={activo}
                disabled={!esTecnico}
                onClick={() => {
                  setSeleccion(estado)
                  setAviso(null)
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors disabled:cursor-not-allowed",
                  activo ? "border-cian bg-cian-suave ring-1 ring-cian" : "enabled:hover:border-cian/60",
                  !esTecnico && !activo && "opacity-50",
                )}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border",
                    activo ? "border-primary bg-primary text-primary-foreground" : "border-input",
                  )}
                  aria-hidden="true"
                >
                  {activo && <Check className="size-3" />}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium">
                    {estado}
                    {estado === incidencia.estado && esTecnico && (
                      <span className="ml-1.5 text-xs font-normal text-muted-foreground">(actual)</span>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">{DESCRIPCION[estado]}</span>
                </span>
              </button>
            )
          })}
        </div>

        {esTecnico ? (
          <>
            <div className="flex flex-col gap-2">
              <Label htmlFor="nota">
                Nota de seguimiento <span className="font-normal text-muted-foreground">(opcional)</span>
              </Label>
              <Textarea
                id="nota"
                value={nota}
                onChange={(e) => {
                  setNota(e.target.value)
                  setAviso(null)
                }}
                placeholder="Ej. Se revisó el cableado y se solicitó la refacción."
                rows={3}
                maxLength={LIMITE_NOTA}
              />
              <p className="text-right text-xs text-muted-foreground">
                {nota.length}/{LIMITE_NOTA}
              </p>
            </div>
            <Button type="submit" disabled={!hayCambios} className="h-10">
              <Save data-icon="inline-start" />
              Guardar actualización
            </Button>
          </>
        ) : (
          <>
            <Button type="button" disabled className="h-10" aria-describedby="aviso-rol">
              <Lock data-icon="inline-start" />
              Cambiar estado
            </Button>
            <p id="aviso-rol" className="rounded-lg bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
              Solo el personal técnico puede actualizar el estado de una incidencia. Como alumno puedes consultar su
              avance en el historial de atención.
            </p>
          </>
        )}

        <p className="flex min-h-5 items-center gap-1.5 text-sm font-medium text-emerald-700" aria-live="polite">
          {aviso && <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />}
          {aviso}
        </p>
      </form>
    </section>
  )
}
