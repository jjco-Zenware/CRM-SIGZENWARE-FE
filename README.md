# CRM Empresarial - Angular 13 + PrimeNG 13

## Requisitos previos
- Node.js 16 o 18
- Angular CLI 13 (`npm install -g @angular/cli@13`)

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm start
```

Disponible en `http://localhost:4200`.

## Configuración de la API

`src/environments/environment.ts` (desarrollo) y `environment.prod.ts` (producción):

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

## Alcance de este proyecto

Este CRM se generó a partir del prompt maestro, que en su Requisito #1 pide explícitamente
crear **solo** los módulos de **Oportunidades**, **Gestión de Acciones** y **Gestión de Metas**
(más Dashboard y Login, que son transversales). La sección "Estructura" del prompt listaba
carpetas de un ERP (ventas, compras, inventario, etc.) que corresponden a otro proyecto, así
que no se incluyeron aquí para no inventar funcionalidades fuera del Requisito #1.

Tampoco se proporcionó una imagen de referencia, por lo que los campos de cada entidad
(Oportunidad, Acción, Meta) son un supuesto razonable de dominio CRM, documentado abajo.

## Endpoints REST esperados

Patrón estándar expuesto por `BaseCrudService`:

| Método | Ruta                                    | Descripción                |
|--------|-------------------------------------------|------------------------------|
| GET    | `/api/{modulo}?page=&pageSize=&search=&sortField=&sortOrder=` | Listado paginado/filtrado |
| GET    | `/api/{modulo}/{id}`                    | Detalle                     |
| POST   | `/api/{modulo}`                          | Crear                       |
| PUT    | `/api/{modulo}/{id}`                     | Actualizar                  |
| DELETE | `/api/{modulo}/{id}`                     | Eliminar                    |
| GET    | `/api/{modulo}/export/excel`             | Exportar Excel (blob)       |
| GET    | `/api/{modulo}/export/pdf`               | Exportar PDF (blob)         |

Módulos: `oportunidades`, `acciones`, `metas`.

Adicional:
- `POST /api/auth/login` → `{ token, user }`
- `GET /api/dashboard/kpis`
- `GET /api/dashboard/serie-oportunidades`

## Modelos de datos (supuestos)

**Oportunidad**: nombre, cliente, valor, etapa (Prospección/Calificación/Propuesta/Negociación/Ganada/Perdida), probabilidad %, fechaCierreEstimada, responsable, activo.

**Acción** (Gestión de Acciones): tipo (Llamada/Reunión/Tarea/Correo), asunto, oportunidadRelacionada, fechaProgramada, estado (Pendiente/Completada/Cancelada), responsable, activo.

**Meta** (Gestión de Metas): nombre, responsable, periodo, montoObjetivo, montoAlcanzado, estado (En progreso/Cumplida/No cumplida), activo.

## Arquitectura

- **Core**: `AuthGuard`, `AuthInterceptor`, `ErrorInterceptor`, `AuthService`, `BaseCrudService<T>` genérico.
- **Shared**: `DataTableComponent` (listado/filtros/paginación/export reutilizable), `PageHeaderComponent`, `ConfirmDialogComponent`, `MenuService`, `BreadcrumbService`, `ExportService`.
- **Layout**: Sidebar, Navbar, Breadcrumb.
- **Modules**: Login, Dashboard, Oportunidades, Acciones, Metas — cada uno lazy-loaded.
# CRM-SIGZENWARE-FE
