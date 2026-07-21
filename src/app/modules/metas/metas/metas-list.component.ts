import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableColumn } from '../../../shared/models/table-column.model';
import { QueryParams } from '../../../core/models/paginated-response.model';
import { ExportService } from '../../../shared/services/export.service';
import { MetasService } from './metas.service';
import { Meta } from './meta.model';

@Component({
  selector: 'app-metas-list',
  templateUrl: './metas-list.component.html',
  styleUrls: ['./metas-list.component.scss']
})
export class MetasListComponent implements OnInit {
  columns: TableColumn[] = [
    { field: 'nombre', header: 'Meta', sortable: true },
    { field: 'responsable', header: 'Responsable', sortable: true },
    { field: 'periodo', header: 'Periodo' },
    { field: 'montoObjetivo', header: 'Objetivo', type: 'currency' },
    { field: 'montoAlcanzado', header: 'Alcanzado', type: 'currency' },
    { field: 'estado', header: 'Estado' },
    { field: 'activo', header: 'Activo', type: 'badge' }
  ];

  data: Meta[] = [];
  total = 0;
  loading = false;
  query: QueryParams = { page: 1, pageSize: 10 };

  pageTitle = 'Gestión de Metas';
  pageSubtitle = 'Objetivos comerciales por responsable y periodo';
  metaIds?: number[];
  readOnly = false;

  estados = [
    { label: 'En progreso', value: 'EN_PROGRESO' },
    { label: 'Cumplida', value: 'CUMPLIDA' },
    { label: 'No cumplida', value: 'NO_CUMPLIDA' }
  ];

  dialogVisible = false;
  editing = false;
  form: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    responsable: ['', Validators.required],
    periodo: ['', Validators.required],
    montoObjetivo: [0, [Validators.required, Validators.min(0)]],
    montoAlcanzado: [0, [Validators.min(0)]],
    estado: ['EN_PROGRESO', Validators.required],
    activo: [true]
  });

  constructor(
    private service: MetasService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private exportService: ExportService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.pageTitle = data['title'] || this.pageTitle;
    this.pageSubtitle = data['subtitle'] || this.pageSubtitle;
    this.metaIds = data['metaIds'];
    this.readOnly = !!data['readOnly'];
    this.load();
  }

  load(): void {
    this.loading = true;
    const query: QueryParams = { ...this.query };
    if (this.metaIds?.length) {
      query['ids'] = this.metaIds.join(',');
    }
    this.service.list(query).subscribe({
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

  openNew(): void {
    this.editing = false;
    this.form.reset({ activo: true, estado: 'EN_PROGRESO', montoObjetivo: 0, montoAlcanzado: 0 });
    this.dialogVisible = true;
  }

  openEdit(row: unknown): void {
    this.editing = true;
    this.form.reset(row as Meta);
    this.dialogVisible = true;
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = this.form.value;
    const request$ = this.editing ? this.service.update(value.id, value) : this.service.create(value);
    request$.subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: this.editing ? 'Meta actualizada.' : 'Meta creada.' });
      this.dialogVisible = false;
      this.load();
    });
  }

  remove(row: unknown): void {
    const meta = row as Meta;
    this.confirmationService.confirm({
      message: `¿Eliminar la meta "${meta.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(meta.id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Meta eliminada correctamente.' });
          this.load();
        });
      }
    });
  }

  exportExcel(): void { this.service.exportExcel(this.query).subscribe(blob => this.exportService.downloadExcel(blob, 'metas')); }
  exportPdf(): void { this.service.exportPdf(this.query).subscribe(blob => this.exportService.downloadPdf(blob, 'metas')); }
}
