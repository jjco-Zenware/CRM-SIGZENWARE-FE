import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TableColumn } from '../../../shared/models/table-column.model';
import { QueryParams } from '../../../core/models/paginated-response.model';
import { ExportService } from '../../../shared/services/export.service';
import { OportunidadesService } from '../oportunidades/oportunidades.service';
import { EstadoOportunidad, Oportunidad } from '../oportunidades/oportunidad.model';

const ESTADOS: { label: string; value: EstadoOportunidad; probabilidad: number }[] = [
  { label: 'Lead', value: 'LEAD', probabilidad: 10 },
  { label: 'Prospecto', value: 'PROSPECTO', probabilidad: 30 },
  { label: 'Calificado', value: 'CALIFICADO', probabilidad: 50 },
  { label: 'Propuesta', value: 'PROPUESTA', probabilidad: 65 },
  { label: 'Negociación', value: 'NEGOCIACION', probabilidad: 80 },
  { label: 'Ganada', value: 'GANADA', probabilidad: 100 },
  { label: 'Perdida', value: 'PERDIDA', probabilidad: 0 }
];

@Component({
  selector: 'app-gestion-oportunidades',
  templateUrl: './gestion-oportunidades.component.html',
  styleUrls: ['./gestion-oportunidades.component.scss']
})
export class GestionOportunidadesComponent implements OnInit {
  columns: TableColumn[] = [
    { field: 'nombre', header: 'Oportunidad', sortable: true },
    { field: 'cliente', header: 'Cliente', sortable: true },
    { field: 'estado', header: 'Estado' },
    { field: 'valor', header: 'Valor', type: 'currency' },
    { field: 'probabilidad', header: 'Prob. %', type: 'number' },
    { field: 'fechaCierreEstimada', header: 'Cierre Estimado', type: 'date' },
    { field: 'activo', header: 'Activo', type: 'badge' }
  ];

  data: Oportunidad[] = [];
  total = 0;
  loading = false;
  query: QueryParams = { page: 1, pageSize: 10 };

  menuItems: MenuItem[] = [];

  constructor(
    private service: OportunidadesService,
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

  buildEstadoMenu(row: Oportunidad): MenuItem[] {
    return ESTADOS
      .filter(e => e.value !== row.estado)
      .map(e => ({ label: e.label, command: () => this.changeEstado(row, e.value) }));
  }

  private changeEstado(row: Oportunidad, nuevoEstado: EstadoOportunidad): void {
    const probabilidad = ESTADOS.find(e => e.value === nuevoEstado)?.probabilidad ?? row.probabilidad;
    this.service.update(row.id, { estado: nuevoEstado, probabilidad }).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Estado actualizado',
        detail: `"${row.nombre}" ahora está en estado ${this.estadoLabel(nuevoEstado)} (${probabilidad}%).`
      });
      this.load();
    });
  }

  private estadoLabel(value: EstadoOportunidad): string {
    return ESTADOS.find(e => e.value === value)?.label || value;
  }

  exportExcel(): void { this.service.exportExcel(this.query).subscribe(blob => this.exportService.downloadExcel(blob, 'oportunidades')); }
  exportPdf(): void { this.service.exportPdf(this.query).subscribe(blob => this.exportService.downloadPdf(blob, 'oportunidades')); }
}
