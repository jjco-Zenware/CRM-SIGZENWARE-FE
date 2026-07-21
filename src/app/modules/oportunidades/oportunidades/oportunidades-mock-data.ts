import { Oportunidad } from './oportunidad.model';

/**
 * Datos de ejemplo (noviembre 2022) usados solo cuando environment.mockData
 * está activo, para poder ver Gestión de Oportunidades, Registro de Lead y
 * Seguimiento de Leads sin depender de un backend real.
 */
export const OPORTUNIDADES_MOCK: Oportunidad[] = [
  // Estado LEAD -> visibles en "Registro de Lead"
  { id: 1, nombre: 'Implementación ERP', cliente: 'Constructora Andes', valor: 18000, estado: 'LEAD', probabilidad: 10, fechaCierreEstimada: '2022-11-02', responsable: 'María Torres', activo: true },
  { id: 2, nombre: 'Migración a la nube', cliente: 'Textiles del Norte', valor: 9500, estado: 'LEAD', probabilidad: 10, fechaCierreEstimada: '2022-11-05', responsable: 'Carlos Ramírez', activo: true },
  { id: 3, nombre: 'Licencias antivirus corporativo', cliente: 'Farmacéutica Vitalis', valor: 4200, estado: 'LEAD', probabilidad: 15, fechaCierreEstimada: '2022-11-08', responsable: 'María Torres', activo: true },
  { id: 4, nombre: 'Portal de autoservicio clientes', cliente: 'Banco Sur', valor: 26000, estado: 'LEAD', probabilidad: 10, fechaCierreEstimada: '2022-11-11', responsable: 'Luis Fernández', activo: true },
  { id: 5, nombre: 'Renovación flota de equipos', cliente: 'Logística Rápida', valor: 15500, estado: 'LEAD', probabilidad: 10, fechaCierreEstimada: '2022-11-14', responsable: 'Ana Gómez', activo: true },
  { id: 6, nombre: 'Consultoría en ciberseguridad', cliente: 'Retail Express', valor: 7800, estado: 'LEAD', probabilidad: 15, fechaCierreEstimada: '2022-11-16', responsable: 'Carlos Ramírez', activo: true },

  // Estados intermedios -> visibles en "Seguimiento de Leads"
  { id: 7, nombre: 'Sistema de facturación electrónica', cliente: 'Distribuidora Central', valor: 12500, estado: 'PROSPECTO', probabilidad: 30, fechaCierreEstimada: '2022-11-09', responsable: 'Luis Fernández', activo: true },
  { id: 8, nombre: 'CRM para fuerza de ventas', cliente: 'Agroindustrial del Valle', valor: 21000, estado: 'PROSPECTO', probabilidad: 35, fechaCierreEstimada: '2022-11-12', responsable: 'Ana Gómez', activo: true },
  { id: 9, nombre: 'Plataforma de e-commerce B2B', cliente: 'Ferretería Central', valor: 17500, estado: 'CALIFICADO', probabilidad: 50, fechaCierreEstimada: '2022-11-17', responsable: 'María Torres', activo: true },
  { id: 10, nombre: 'Integración de pasarela de pagos', cliente: 'Hotelera Costa Azul', valor: 8900, estado: 'CALIFICADO', probabilidad: 55, fechaCierreEstimada: '2022-11-19', responsable: 'Carlos Ramírez', activo: true },
  { id: 11, nombre: 'Modernización de call center', cliente: 'Aseguradora Confianza', valor: 32000, estado: 'PROPUESTA', probabilidad: 65, fechaCierreEstimada: '2022-11-22', responsable: 'Luis Fernández', activo: true },
  { id: 12, nombre: 'Automatización de bodega', cliente: 'Distribuidora Central', valor: 27500, estado: 'NEGOCIACION', probabilidad: 80, fechaCierreEstimada: '2022-11-25', responsable: 'Ana Gómez', activo: true },

  // Estados finales -> visibles solo en "Gestión de Oportunidades"
  { id: 13, nombre: 'Renovación licencias Office', cliente: 'Universidad del Pacífico', valor: 6400, estado: 'GANADA', probabilidad: 100, fechaCierreEstimada: '2022-11-04', responsable: 'María Torres', activo: true },
  { id: 14, nombre: 'Soporte técnico anual', cliente: 'Clínica San Rafael', valor: 11200, estado: 'GANADA', probabilidad: 100, fechaCierreEstimada: '2022-11-15', responsable: 'Carlos Ramírez', activo: true },
  { id: 15, nombre: 'Implementación BI y reportes', cliente: 'Minera del Sur', valor: 24500, estado: 'GANADA', probabilidad: 100, fechaCierreEstimada: '2022-11-28', responsable: 'Luis Fernández', activo: true },
  { id: 16, nombre: 'Rediseño de sitio web corporativo', cliente: 'Inmobiliaria Horizonte', valor: 5300, estado: 'PERDIDA', probabilidad: 0, fechaCierreEstimada: '2022-11-18', responsable: 'Ana Gómez', activo: false },
  { id: 17, nombre: 'Servicio de mesa de ayuda', cliente: 'Colegio San Marcos', valor: 9000, estado: 'PERDIDA', probabilidad: 0, fechaCierreEstimada: '2022-11-30', responsable: 'María Torres', activo: false }
];
