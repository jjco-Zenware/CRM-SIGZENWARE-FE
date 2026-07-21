import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { BaseCrudService } from '../../../core/services/base-crud.service';
import { PaginatedResponse, QueryParams } from '../../../core/models/paginated-response.model';
import { Meta } from './meta.model';
import { METAS_MOCK } from './metas-mock-data';

@Injectable({ providedIn: 'root' })
export class MetasService extends BaseCrudService<Meta> {
  protected endpoint = 'metas';

  private readonly useMock = !environment.production && environment.mockData;
  private mock: Meta[] = METAS_MOCK.map(m => ({ ...m }));

  constructor(http: HttpClient) { super(http); }

  override list(params: QueryParams = {}): Observable<PaginatedResponse<Meta>> {
    if (!this.useMock) return super.list(params);
    return of(this.buildMockPage(params));
  }

  override getById(id: number | string): Observable<Meta> {
    if (!this.useMock) return super.getById(id);
    return of(this.mock.find(m => m.id === Number(id)) as Meta);
  }

  override create(payload: Partial<Meta>): Observable<Meta> {
    if (!this.useMock) return super.create(payload);
    const nextId = this.mock.reduce((max, m) => Math.max(max, m.id), 0) + 1;
    const created: Meta = { ...(payload as Meta), id: nextId };
    this.mock = [created, ...this.mock];
    return of(created);
  }

  override update(id: number | string, payload: Partial<Meta>): Observable<Meta> {
    if (!this.useMock) return super.update(id, payload);
    const numericId = Number(id);
    this.mock = this.mock.map(m => m.id === numericId ? { ...m, ...payload, id: numericId } : m);
    return of(this.mock.find(m => m.id === numericId) as Meta);
  }

  override delete(id: number | string): Observable<void> {
    if (!this.useMock) return super.delete(id);
    this.mock = this.mock.filter(m => m.id !== Number(id));
    return of(undefined);
  }

  private buildMockPage(params: QueryParams): PaginatedResponse<Meta> {
    let items = [...this.mock];

    const ids = params['ids'];
    if (ids) {
      const allowed = String(ids).split(',').map(Number);
      items = items.filter(m => allowed.includes(m.id));
    }

    if (params.search) {
      const term = String(params.search).toLowerCase();
      items = items.filter(m =>
        m.nombre.toLowerCase().includes(term) || m.responsable.toLowerCase().includes(term)
      );
    }

    if (params.sortField) {
      const field = params.sortField as keyof Meta;
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
