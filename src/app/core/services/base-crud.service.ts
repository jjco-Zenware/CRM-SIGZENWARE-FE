import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { PaginatedResponse, QueryParams } from '../models/paginated-response.model';

/**
 * Servicio base genérico para operaciones REST estándar.
 * Cada módulo de negocio extiende esta clase indicando su endpoint,
 * evitando duplicar lógica de Listado / Nuevo / Editar / Eliminar / Filtros / Paginación.
 */
export abstract class BaseCrudService<T> {
  protected abstract endpoint: string;

  constructor(protected http: HttpClient) {}

  private get baseUrl(): string {
    return `${environment.apiUrl}/${this.endpoint}`;
  }

  list(params: QueryParams = {}): Observable<PaginatedResponse<T>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<PaginatedResponse<T>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(payload: Partial<T>): Observable<T> {
    return this.http.post<T>(this.baseUrl, payload);
  }

  update(id: number | string, payload: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  exportExcel(params: QueryParams = {}): Observable<Blob> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get(`${this.baseUrl}/export/excel`, { params: httpParams, responseType: 'blob' });
  }

  exportPdf(params: QueryParams = {}): Observable<Blob> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get(`${this.baseUrl}/export/pdf`, { params: httpParams, responseType: 'blob' });
  }
}
