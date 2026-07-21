import { Meta } from './meta.model';

/**
 * Datos de ejemplo usados solo cuando environment.mockData está activo,
 * para poder ver Gestión de Metas y Seguimiento de Metas sin depender de
 * un backend real.
 */
export const METAS_MOCK: Meta[] = [
  {
    id: 1,
    nombre: 'Meta de ventas anual 2022',
    responsable: 'Equipo Comercial',
    periodo: '2022',
    montoObjetivo: 200000,
    montoAlcanzado: 158000,
    estado: 'EN_PROGRESO',
    activo: true
  },
  {
    // Monto alcanzado = suma de las oportunidades en estado GANADA de noviembre 2022
    // (Renovación licencias Office 6400 + Soporte técnico anual 11200 + Implementación BI y reportes 24500).
    id: 2,
    nombre: 'Meta de cierre - Oportunidades ganadas Q4 2022',
    responsable: 'Equipo Comercial',
    periodo: '2022-Q4',
    montoObjetivo: 50000,
    montoAlcanzado: 42100,
    estado: 'EN_PROGRESO',
    activo: true
  }
];
