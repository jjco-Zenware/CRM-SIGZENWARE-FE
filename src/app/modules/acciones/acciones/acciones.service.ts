import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { PaginatedResponse, QueryParams } from '../../../core/models/paginated-response.model';
import { Accion } from './accion.model';
import { ACCIONES_MOCK } from './acciones-mock-data';

@Injectable({ providedIn: 'root' })
export class AccionesService extends BaseCrudService<Accion> {
  protected endpoint = 'acciones';

  private readonly useMock = !environment.production && environment.mockData;
  private mock: Accion[] = ACCIONES_MOCK.map(a => ({ ...a }));

  constructor(http: HttpClient) { super(http); }

  override list(params: QueryParams = {}): Observable<PaginatedResponse<Accion>> {
    if (!this.useMock) return super.list(params);
    return of(this.buildMockPage(params));
  }

  override getById(id: number | string): Observable<Accion> {
    if (!this.useMock) return super.getById(id);
    return of(this.mock.find(a => a.id === Number(id)) as Accion);
  }

  override create(payload: Partial<Accion>): Observable<Accion> {
    if (!this.useMock) return super.create(payload);
    const nextId = this.mock.reduce((max, a) => Math.max(max, a.id), 0) + 1;
    const created: Accion = { ...(payload as Accion), id: nextId };
    this.mock = [created, ...this.mock];
    return of(created);
  }

  override update(id: number | string, payload: Partial<Accion>): Observable<Accion> {
    if (!this.useMock) return super.update(id, payload);
    const numericId = Number(id);
    this.mock = this.mock.map(a => a.id === numericId ? { ...a, ...payload, id: numericId } : a);
    return of(this.mock.find(a => a.id === numericId) as Accion);
  }

  override delete(id: number | string): Observable<void> {
    if (!this.useMock) return super.delete(id);
    this.mock = this.mock.filter(a => a.id !== Number(id));
    return of(undefined);
  }

  private buildMockPage(params: QueryParams): PaginatedResponse<Accion> {
    let items = [...this.mock];

    if (params.search) {
      const term = String(params.search).toLowerCase();
      items = items.filter(a =>
        a.asunto.toLowerCase().includes(term) || a.oportunidadRelacionada.toLowerCase().includes(term)
      );
    }

    if (params.sortField) {
      const field = params.sortField as keyof Accion;
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
