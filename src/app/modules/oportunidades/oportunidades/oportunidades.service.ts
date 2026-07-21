import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { PaginatedResponse, QueryParams } from '../../../core/models/paginated-response.model';
import { Oportunidad } from './oportunidad.model';
import { OPORTUNIDADES_MOCK } from './oportunidades-mock-data';

@Injectable({ providedIn: 'root' })
export class OportunidadesService extends BaseCrudService<Oportunidad> {
  protected endpoint = 'oportunidades';

  private readonly useMock = !environment.production && environment.mockData;
  private mock: Oportunidad[] = OPORTUNIDADES_MOCK.map(o => ({ ...o }));

  constructor(http: HttpClient) { super(http); }

  override list(params: QueryParams = {}): Observable<PaginatedResponse<Oportunidad>> {
    if (!this.useMock) return super.list(params);
    return of(this.buildMockPage(params));
  }

  override getById(id: number | string): Observable<Oportunidad> {
    if (!this.useMock) return super.getById(id);
    return of(this.mock.find(o => o.id === Number(id)) as Oportunidad);
  }

  override create(payload: Partial<Oportunidad>): Observable<Oportunidad> {
    if (!this.useMock) return super.create(payload);
    const nextId = this.mock.reduce((max, o) => Math.max(max, o.id), 0) + 1;
    const created: Oportunidad = { ...(payload as Oportunidad), id: nextId };
    this.mock = [created, ...this.mock];
    return of(created);
  }

  override update(id: number | string, payload: Partial<Oportunidad>): Observable<Oportunidad> {
    if (!this.useMock) return super.update(id, payload);
    const numericId = Number(id);
    this.mock = this.mock.map(o => o.id === numericId ? { ...o, ...payload, id: numericId } : o);
    return of(this.mock.find(o => o.id === numericId) as Oportunidad);
  }

  override delete(id: number | string): Observable<void> {
    if (!this.useMock) return super.delete(id);
    this.mock = this.mock.filter(o => o.id !== Number(id));
    return of(undefined);
  }

  private buildMockPage(params: QueryParams): PaginatedResponse<Oportunidad> {
    let items = [...this.mock];

    const estados = params['estados'];
    if (estados) {
      const allowed = String(estados).split(',');
      items = items.filter(o => allowed.includes(o.estado));
    }

    if (params.search) {
      const term = String(params.search).toLowerCase();
      items = items.filter(o =>
        o.nombre.toLowerCase().includes(term) || o.cliente.toLowerCase().includes(term)
      );
    }

    if (params.sortField) {
      const field = params.sortField as keyof Oportunidad;
      const order = params.sortOrder === -1 ? -1 : 1;
      items = [...items].sort((a, b) => {
        if (a[field] === b[field]) return 0;
        return a[field] > b[field] ? order : -order;
      });
    }

    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const start = (page - 1) * pageSize;

    return { data: items.slice(start, start + pageSize), total: items.length, page, pageSize };
  }
}
