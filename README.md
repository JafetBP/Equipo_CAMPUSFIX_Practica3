\# CAMPUSFIX — Prototipo Funcional de Frontend (Práctica 3)



Prototipo de alta fidelidad interactivo para la gestión de incidencias universitarias en la Universidad Metropolitana del Centro (UMC), desarrollado bajo el enfoque RUP (Fase de Construcción — Iteración C1).



\## Equipo

\- Zahid Hernández Pajarito

\- Jafet Adolfo Barrientos Portada

\- Francisco Lumbreras Pérez

\- \*\*Docente:\*\* Dr. Luis Yael Méndez Sánchez (Ingeniería de Software I — FCC, BUAP)



\## Pantallas Implementadas

1\. \*\*UI-01 Inicio de sesión (`/`):\*\* Autenticación simulada por rol (Reportante, Mesa de Servicio, Técnico, Supervisor).

2\. \*\*UI-02 Panel por rol (`/panel`):\*\* Resumen estadístico de incidencias y tablero de acceso rápido.

3\. \*\*UI-03 Nuevo reporte (`/reportes/nuevo`):\*\* Formulario de registro de incidencias con validación en cliente.

4\. \*\*UI-04 Listado de folios (`/reportes`):\*\* Vista general con filtros por estado, categoría y búsqueda.

5\. \*\*UI-05 Detalle de incidencia (`/reportes/\[id]`):\*\* Consulta de folio, cambio de estado operativo e historial de movimientos.



\## Stack Tecnológico

\- Next.js (App Router) + React + TypeScript

\- Tailwind CSS + shadcn/ui

\- Gestión de estado en memoria (`CampusfixProvider`) con datos simulados (`datos-iniciales.ts`)



\## Ejecución Local

1\. Instalar dependencias:

&#x20;  ```bash

&#x20;  pnpm install

