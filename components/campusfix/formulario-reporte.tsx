"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle, Send } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  CATEGORIAS,
  EDIFICIOS,
  PRIORIDADES,
  type Categoria,
  type Edificio,
  type Prioridad,
} from "@/lib/campusfix/types"
import { useCampusFix } from "./campusfix-provider"

type Campo = "titulo" | "edificio" | "ubicacion" | "categoria" | "prioridad" | "descripcion"

type Valores = Record<Campo, string>

const ETIQUETAS: Record<Campo, string> = {
  titulo: "Título de la incidencia",
  edificio: "Edificio",
  ubicacion: "Aula / Ubicación específica",
  categoria: "Categoría",
  prioridad: "Prioridad",
  descripcion: "Descripción del problema",
}

const MENSAJES: Record<Exclude<Campo, "descripcion">, string> = {
  titulo: "Escribe un título que resuma la incidencia.",
  edificio: "Selecciona el edificio donde ocurre la incidencia.",
  ubicacion: "Indica el aula o la ubicación específica.",
  categoria: "Selecciona la categoría de la falla.",
  prioridad: "Selecciona el nivel de prioridad.",
}

const OBLIGATORIOS = Object.keys(MENSAJES) as (keyof typeof MENSAJES)[]
const ORDEN: Campo[] = [...OBLIGATORIOS, "descripcion"]

const VALORES_INICIALES: Valores = {
  titulo: "",
  edificio: "",
  ubicacion: "",
  categoria: "",
  prioridad: "",
  descripcion: "",
}

function validar(valores: Valores) {
  const errores: Partial<Record<Campo, string>> = {}
  for (const campo of OBLIGATORIOS) {
    if (!valores[campo].trim()) errores[campo] = MENSAJES[campo]
  }
  return errores
}

const claseSelect =
  "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"

export function FormularioReporte() {
  const router = useRouter()
  const { agregarIncidencia } = useCampusFix()
  const [valores, setValores] = useState<Valores>(VALORES_INICIALES)
  const [errores, setErrores] = useState<Partial<Record<Campo, string>>>({})
  const [intentado, setIntentado] = useState(false)
  const resumenRef = useRef<HTMLDivElement>(null)

  function actualizar(campo: Campo, valor: string) {
    const siguientes = { ...valores, [campo]: valor }
    setValores(siguientes)
    if (intentado) setErrores(validar(siguientes))
  }

  function manejarEnvio(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIntentado(true)
    const nuevosErrores = validar(valores)
    setErrores(nuevosErrores)

    const primerError = ORDEN.find((c) => nuevosErrores[c])
    if (primerError) {
      resumenRef.current?.focus()
      return
    }

    const nueva = agregarIncidencia({
      titulo: valores.titulo.trim(),
      edificio: valores.edificio as Edificio,
      ubicacion: valores.ubicacion.trim(),
      categoria: valores.categoria as Categoria,
      prioridad: valores.prioridad as Prioridad,
      descripcion: valores.descripcion.trim() || "Sin descripción adicional.",
    })
    router.push(`/reportes/${nueva.id}?creado=1`)
  }

  const listaErrores = ORDEN.filter((c) => errores[c])

  const propsCampo = (campo: Campo) => ({
    id: campo,
    name: campo,
    "aria-invalid": errores[campo] ? true : undefined,
    "aria-describedby": errores[campo] ? `${campo}-error` : undefined,
  })

  return (
    <form onSubmit={manejarEnvio} noValidate className="flex flex-col gap-6 rounded-xl border bg-card p-5 shadow-sm sm:p-8">
      {listaErrores.length > 0 && (
        <div
          ref={resumenRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 outline-none"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">
              No se pudo guardar el reporte. Revisa {listaErrores.length === 1 ? "el siguiente campo" : `los ${listaErrores.length} campos siguientes`}:
            </p>
            <ul className="mt-2 list-disc pl-5">
              {listaErrores.map((c) => (
                <li key={c}>
                  <a href={`#${c}`} className="underline underline-offset-2">
                    {ETIQUETAS[c]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Campo campo="titulo" error={errores.titulo}>
        <Input
          {...propsCampo("titulo")}
          value={valores.titulo}
          onChange={(e) => actualizar("titulo", e.target.value)}
          placeholder="Ej. Proyector sin señal en el aula 204"
          maxLength={100}
          className="h-10"
        />
      </Campo>

      <div className="grid gap-6 sm:grid-cols-2">
        <Campo campo="edificio" error={errores.edificio}>
          <select
            {...propsCampo("edificio")}
            value={valores.edificio}
            onChange={(e) => actualizar("edificio", e.target.value)}
            className={claseSelect}
          >
            <option value="">Selecciona un edificio</option>
            {EDIFICIOS.map((ed) => (
              <option key={ed.clave} value={ed.clave}>
                {ed.nombre}
              </option>
            ))}
          </select>
        </Campo>

        <Campo campo="ubicacion" error={errores.ubicacion}>
          <Input
            {...propsCampo("ubicacion")}
            value={valores.ubicacion}
            onChange={(e) => actualizar("ubicacion", e.target.value)}
            placeholder="Ej. Aula 204, segundo piso o Laboratorio 3"
            maxLength={80}
            className="h-10"
          />
        </Campo>

        <Campo campo="categoria" error={errores.categoria}>
          <select
            {...propsCampo("categoria")}
            value={valores.categoria}
            onChange={(e) => actualizar("categoria", e.target.value)}
            className={claseSelect}
          >
            <option value="">Selecciona una categoría</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </Campo>

        <Campo campo="prioridad" error={errores.prioridad}>
          <select
            {...propsCampo("prioridad")}
            value={valores.prioridad}
            onChange={(e) => actualizar("prioridad", e.target.value)}
            className={claseSelect}
          >
            <option value="">Selecciona la prioridad</option>
            {PRIORIDADES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <Campo campo="descripcion" error={errores.descripcion} opcional>
        <Textarea
          {...propsCampo("descripcion")}
          value={valores.descripcion}
          onChange={(e) => actualizar("descripcion", e.target.value)}
          placeholder="Describe qué ocurre, desde cuándo y cómo afecta a las actividades."
          rows={5}
          maxLength={600}
        />
        <p className="text-right text-xs text-muted-foreground">{valores.descripcion.length}/600</p>
      </Campo>

      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <Link href="/panel" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}>
          Cancelar
        </Link>
        <Button type="submit" size="lg" className="h-10 px-4">
          <Send data-icon="inline-start" />
          Guardar reporte
        </Button>
      </div>
    </form>
  )
}

function Campo({
  campo,
  error,
  opcional = false,
  children,
}: {
  campo: Campo
  error?: string
  opcional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={campo}>
        {ETIQUETAS[campo]}
        {opcional ? (
          <span className="font-normal text-muted-foreground">(opcional)</span>
        ) : (
          <>
            <span className="text-red-700" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(obligatorio)</span>
          </>
        )}
      </Label>
      {children}
      {error && (
        <p id={`${campo}-error`} className="flex items-center gap-1.5 text-sm text-red-700">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
