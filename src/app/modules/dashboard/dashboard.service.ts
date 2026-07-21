import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { OportunidadesService } from '../oportunidades/oportunidades/oportunidades.service';
import { AccionesService } from '../acciones/acciones/acciones.service';
import { MetasService } from '../metas/metas/metas.service';
import { DashboardKpi, GanadasVsPerdidas, OportunidadEstadoMonto } from './dashboard.model';

const ESTADOS_ABIERTOS = ['LEAD', 'PROSPECTO', 'CALIFICADO', 'PROPUESTA', 'NEGOCIACION'];
const ORDEN_ESTADOS = ['LEAD', 'PROSPECTO', 'CALIFICADO', 'PROPUESTA', 'NEGOCIACION', 'GANADA', 'PERDIDA'];

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly useMock = !environment.production && environment.mockData;

  constructor(
    private http: HttpClient,
    private oportunidadesService: OportunidadesService,
    private accionesService: AccionesService,
    private metasService: MetasService
  ) {}

  getKpis(): Observable<DashboardKpi> {
    if (!this.useMock) {
      return this.http.get<DashboardKpi>(`${environment.apiUrl}/dashboard/kpis`);
    }

    return forkJoin({
      oportunidades: this.oportunidadesService.list({ pageSize: 1000 }),
      acciones: this.accionesService.list({ pageSize: 1000 }),
      metas: this.metasService.list({ pageSize: 1000 })
    }).pipe(
      map(({ oportunidades, acciones, metas }) => {
        const abiertas = oportunidades.data.filter(o => ESTADOS_ABIERTOS.includes(o.estado));
        const valorPipeline = abiertas.reduce((sum, o) => sum + o.valor, 0);
        const accionesPendientes = acciones.data.filter(a => a.estado === 'PENDIENTE').length;
        const metasCumplidasPorcentaje = metas.data.length
          ? metas.data.reduce((sum, m) => sum + Math.min(100, (m.montoAlcanzado / m.montoObjetivo) * 100), 0) / metas.data.length
          : 0;

        return {
          oportunidadesAbiertas: abiertas.length,
          valorPipeline,
          accionesPendientes,
          metasCumplidasPorcentaje
        };
      })
    );
  }

  getOportunidadesPorEstado(): Observable<OportunidadEstadoMonto[]> {
    if (!this.useMock) {
      return this.http.get<OportunidadEstadoMonto[]>(`${environment.apiUrl}/dashboard/oportunidades-por-estado`);
    }

    return this.oportunidadesService.list({ pageSize: 1000 }).pipe(
      map(res => {
        const totales = new Map<string, { valor: number; cantidad: number }>();
        res.data.forEach(o => {
          const actual = totales.get(o.estado) ?? { valor: 0, cantidad: 0 };
          totales.set(o.estado, { valor: actual.valor + o.valor, cantidad: actual.cantidad + 1 });
        });
        return ORDEN_ESTADOS.map(estado => ({
          estado,
          valor: totales.get(estado)?.valor ?? 0,
          cantidad: totales.get(estado)?.cantidad ?? 0
        }));
      })
    );
  }

  getGanadasVsPerdidas(): Observable<GanadasVsPerdidas> {
    if (!this.useMock) {
      return this.http.get<GanadasVsPerdidas>(`${environment.apiUrl}/dashboard/ganadas-vs-perdidas`);
    }

    return this.oportunidadesService.list({ pageSize: 1000 }).pipe(
      map(res => {
        const ganadas = res.data.filter(o => o.estado === 'GANADA');
        const perdidas = res.data.filter(o => o.estado === 'PERDIDA');
        return {
          ganadas: { cantidad: ganadas.length, valor: ganadas.reduce((sum, o) => sum + o.valor, 0) },
          perdidas: { cantidad: perdidas.length, valor: perdidas.reduce((sum, o) => sum + o.valor, 0) }
        };
      })
    );
  }
}
