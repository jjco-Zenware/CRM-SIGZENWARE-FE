export type EstadoAccion = 'PENDIENTE' | 'COMPLETADO' | 'VENCIDO';

export interface Accion {
  id: number;
  tipo: string;
  asunto: string;
  oportunidadRelacionada: string;
  fechaProgramada: string;
  estado: EstadoAccion;
  responsable: string;
  activo: boolean;
}
