import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableColumn } from '../../../shared/models/table-column.model';
import { QueryParams } from '../../../core/models/paginated-response.model';
import { ExportService } from '../../../shared/services/export.service';
import { OportunidadesService } from './oportunidades.service';
import { EstadoOportunidad, Oportunidad } from './oportunidad.model';

@Component({
  selector: 'app-oportunidades-list',
  templateUrl: './oportunidades-list.component.html',
  styleUrls: ['./oportunidades-list.component.scss']
})
export class OportunidadesListComponent implements OnInit {
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

  pageTitle = 'Oportunidades';
  pageSubtitle = 'Gestión del pipeline comercial';
  estadosFilter?: EstadoOportunidad[];
  readOnly = false;

  estados = [
    { label: 'Lead', value: 'LEAD' },
    { label: 'Prospecto', value: 'PROSPECTO' },
    { label: 'Calificado', value: 'CALIFICADO' },
    { label: 'Propuesta', value: 'PROPUESTA' },
    { label: 'Negociación', value: 'NEGOCIACION' },
    { label: 'Ganada', value: 'GANADA' },
    { label: 'Perdida', value: 'PERDIDA' }
  ];

  dialogVisible = false;
  editing = false;
  form: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    cliente: ['', Validators.required],
    valor: [0, [Validators.required, Validators.min(0)]],
    estado: [null, Validators.required],
    probabilidad: [0, [Validators.min(0), Validators.max(100)]],
    fechaCierreEstimada: [null, Validators.required],
    responsable: ['', Validators.required],
    activo: [true]
  });

  constructor(
    private service: OportunidadesService,
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
    this.estadosFilter = data['estadosFilter'];
    this.readOnly = !!data['readOnly'];
    this.load();
  }

  load(): void {
    this.loading = true;
    const query: QueryParams = { ...this.query };
    if (this.estadosFilter?.length) {
      query['estados'] = this.estadosFilter.join(',');
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
    const estadoInicial = this.estadosFilter?.length === 1 ? this.estadosFilter[0] : null;
    this.form.reset({ activo: true, valor: 0, probabilidad: 0, estado: estadoInicial });
    this.dialogVisible = true;
  }

  openEdit(row: unknown): void {
    this.editing = true;
    const oportunidad = row as Oportunidad;
    this.form.reset({
      ...oportunidad,
      fechaCierreEstimada: oportunidad.fechaCierreEstimada ? new Date(oportunidad.fechaCierreEstimada) : null
    });
    this.dialogVisible = true;
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = { ...this.form.value };
    if (value.fechaCierreEstimada instanceof Date) {
      value.fechaCierreEstimada = value.fechaCierreEstimada.toISOString().substring(0, 10);
    }
    const request$ = this.editing ? this.service.update(value.id, value) : this.service.create(value);
    request$.subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: this.editing ? 'Oportunidad actualizada.' : 'Oportunidad creada.' });
      this.dialogVisible = false;
      this.load();
    });
  }

  remove(row: unknown): void {
    const oportunidad = row as Oportunidad;
    this.confirmationService.confirm({
      message: `¿Eliminar la oportunidad "${oportunidad.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(oportunidad.id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Oportunidad eliminada correctamente.' });
          this.load();
        });
      }
    });
  }

  exportExcel(): void { this.service.exportExcel(this.query).subscribe(blob => this.exportService.downloadExcel(blob, 'oportunidades')); }
  exportPdf(): void { this.service.exportPdf(this.query).subscribe(blob => this.exportService.downloadPdf(blob, 'oportunidades')); }
}
