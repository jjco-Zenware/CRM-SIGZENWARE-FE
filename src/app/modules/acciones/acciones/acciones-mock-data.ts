import { Accion } from './accion.model';

/**
 * Datos de ejemplo (noviembre 2022) usados solo cuando environment.mockData
 * está activo, para poder ver Gestión, Registro y Seguimiento de Acciones
 * sin depender de un backend real.
 */
export const ACCIONES_MOCK: Accion[] = [
  { id: 1, tipo: 'LLAMADA', asunto: 'Llamada de descubrimiento', oportunidadRelacionada: 'Implementación ERP', fechaProgramada: '2022-11-02', estado: 'COMPLETADO', responsable: 'María Torres', activo: true },
  { id: 2, tipo: 'REUNION', asunto: 'Demo de producto', oportunidadRelacionada: 'CRM para fuerza de ventas', fechaProgramada: '2022-11-07', estado: 'PENDIENTE', responsable: 'Ana Gómez', activo: true },
  { id: 3, tipo: 'CORREO', asunto: 'Envío de propuesta comercial', oportunidadRelacionada: 'Modernización de call center', fechaProgramada: '2022-11-10', estado: 'COMPLETADO', responsable: 'Luis Fernández', activo: true },
  { id: 4, tipo: 'TAREA', asunto: 'Preparar cotización', oportunidadRelacionada: 'Automatización de bodega', fechaProgramada: '2022-11-13', estado: 'VENCIDO', responsable: 'Ana Gómez', activo: true },
  { id: 5, tipo: 'LLAMADA', asunto: 'Seguimiento post-demo', oportunidadRelacionada: 'Plataforma de e-commerce B2B', fechaProgramada: '2022-11-17', estado: 'PENDIENTE', responsable: 'María Torres', activo: true },
  { id: 6, tipo: 'REUNION', asunto: 'Reunión de cierre', oportunidadRelacionada: 'Integración de pasarela de pagos', fechaProgramada: '2022-11-22', estado: 'VENCIDO', responsable: 'Carlos Ramírez', activo: true },
  { id: 7, tipo: 'TAREA', asunto: 'Actualizar ficha del cliente', oportunidadRelacionada: 'Sistema de facturación electrónica', fechaProgramada: '2022-11-28', estado: 'PENDIENTE', responsable: 'Luis Fernández', activo: true }
];
