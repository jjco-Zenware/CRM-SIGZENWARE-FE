export type EstadoOportunidad =
  | 'LEAD'
  | 'PROSPECTO'
  | 'CALIFICADO'
  | 'PROPUESTA'
  | 'NEGOCIACION'
  | 'GANADA'
  | 'PERDIDA';

export interface Oportunidad {
  id: number;
  nombre: string;
  cliente: string;
  valor: number;
  estado: EstadoOportunidad;
  probabilidad: number;
  fechaCierreEstimada: string;
  responsable: string;
  activo: boolean;
}
