export interface DashboardKpi {
  oportunidadesAbiertas: number;
  valorPipeline: number;
  accionesPendientes: number;
  metasCumplidasPorcentaje: number;
}

export interface OportunidadEstadoMonto {
  estado: string;
  valor: number;
  cantidad: number;
}

export interface GanadasVsPerdidas {
  ganadas: { cantidad: number; valor: number };
  perdidas: { cantidad: number; valor: number };
}
