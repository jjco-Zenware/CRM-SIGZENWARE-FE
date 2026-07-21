import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TableColumn } from '../../../shared/models/table-column.model';
import { QueryParams } from '../../../core/models/paginated-response.model';
import { ExportService } from '../../../shared/services/export.service';
import { AccionesService } from '../acciones/acciones.service';
import { Accion, EstadoAccion } from '../acciones/accion.model';

const ESTADOS: { label: string; value: EstadoAccion }[] = [
  { label: 'Pendiente', value: 'PENDIENTE' },
  { label: 'Completado', value: 'COMPLETADO' },
  { label: 'Vencido', value: 'VENCIDO' }
];

@Component({
  selector: 'app-gestion-acciones',
  templateUrl: './gestion-acciones.component.html',
  styleUrls: ['./gestion-acciones.component.scss']
})
export class GestionAccionesComponent implements OnInit {
  columns: TableColumn[] = [
    { field: 'asunto', header: 'Asunto', sortable: true },
    { field: 'tipo', header: 'Tipo' },
    { field: 'oportunidadRelacionada', header: 'Oportunidad Relacionada' },
    { field: 'fechaProgramada', header: 'Fecha Programada', type: 'date' },
    { field: 'estado', header: 'Estado' },
    { field: 'responsable', header: 'Responsable' },
    { field: 'activo', header: 'Activo', type: 'badge' }
  ];

  data: Accion[] = [];
  total = 0;
  loading = false;
  query: QueryParams = { page: 1, pageSize: 10 };

  constructor(
    private service: AccionesService,
    private messageService: MessageService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.service.list(this.query).subscribe({
      next: res => { this.data = res.data; this.total = res.total; this.loading = false; },
      error: () => this.loading = false
    });
  }

  onPageChange(e: { page: number; rows: number }): void {
    this.query = { ...this.query, page: e.page, pageSize: e.rows };
    this.load();
  }

  onSearch(term: string): void {
    this.query = { ...this.query, page: 1, search: term };
    this.load();
  }

  onSort(e: { field: string; order: number }): void {
    this.query = { ...this.query, sortField: e.field, sortOrder: e.order };
    this.load();
  }

  buildEstadoMenu(row: Accion): MenuItem[] {
    return ESTADOS
      .filter(e => e.value !== row.estado)
      .map(e => ({ label: e.label, command: () => this.changeEstado(row, e.value) }));
  }

  private changeEstado(row: Accion, nuevoEstado: EstadoAccion): void {
    this.service.update(row.id, { estado: nuevoEstado }).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Estado actualizado',
        detail: `"${row.asunto}" ahora está en estado ${this.estadoLabel(nuevoEstado)}.`
      });
      this.load();
    });
  }

  private estadoLabel(value: EstadoAccion): string {
    return ESTADOS.find(e => e.value === value)?.label || value;
  }

  exportExcel(): void { this.service.exportExcel(this.query).subscribe(blob => this.exportService.downloadExcel(blob, 'acciones')); }
  exportPdf(): void { this.service.exportPdf(this.query).subscribe(blob => this.exportService.downloadPdf(blob, 'acciones')); }
}
