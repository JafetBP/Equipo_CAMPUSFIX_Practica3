export type Rol = "Alumno" | "Técnico"

export type Estado = "Pendiente" | "En proceso" | "Resuelto"

export type Prioridad = "Baja" | "Media" | "Alta"

export type Categoria = "Eléctrico" | "Redes/Proyector" | "Mobiliario" | "Plomería"

export type Edificio = "CCO1" | "CCO2" | "Biblioteca Central" | "DAE"

export interface Usuario {
  nombre: string
  rol: Rol
}

export interface CambioEstado {
  estado: Estado
  fecha: string
  autor: string
  nota?: string
}

export interface Incidencia {
  id: string
  titulo: string
  descripcion: string
  edificio: Edificio
  ubicacion: string
  categoria: Categoria
  prioridad: Prioridad
  estado: Estado
  reportadoPor: string
  fechaCreacion: string
  historial: CambioEstado[]
}

export const ESTADOS: Estado[] = ["Pendiente", "En proceso", "Resuelto"]
export const PRIORIDADES: Prioridad[] = ["Baja", "Media", "Alta"]
export const CATEGORIAS: Categoria[] = ["Eléctrico", "Redes/Proyector", "Mobiliario", "Plomería"]
export const EDIFICIOS: { clave: Edificio; nombre: string }[] = [
  { clave: "CCO1", nombre: "CCO1 · Ciencias de la Computación, Edificio 1" },
  { clave: "CCO2", nombre: "CCO2 · Ciencias de la Computación, Edificio 2" },
  { clave: "Biblioteca Central", nombre: "Biblioteca Central" },
  { clave: "DAE", nombre: "DAE · Dirección de Administración Escolar" },
]
