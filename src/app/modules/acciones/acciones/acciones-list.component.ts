import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableColumn } from '../../../shared/models/table-column.model';
import { QueryParams } from '../../../core/models/paginated-response.model';
import { ExportService } from '../../../shared/services/export.service';
import { AccionesService } from './acciones.service';
import { Accion } from './accion.model';

@Component({
  selector: 'app-acciones-list',
  templateUrl: './acciones-list.component.html',
  styleUrls: ['./acciones-list.component.scss']
})
export class AccionesListComponent implements OnInit {
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

  pageTitle = 'Gestión de Acciones';
  pageSubtitle = 'Llamadas, reuniones y tareas comerciales';
  readOnly = false;

  tipos = [
    { label: 'Llamada', value: 'LLAMADA' },
    { label: 'Reunión', value: 'REUNION' },
    { label: 'Tarea', value: 'TAREA' },
    { label: 'Correo', value: 'CORREO' }
  ];

  estados = [
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'Completado', value: 'COMPLETADO' },
    { label: 'Vencido', value: 'VENCIDO' }
  ];

  dialogVisible = false;
  editing = false;
  form: FormGroup = this.fb.group({
    id: [null],
    tipo: [null, Validators.required],
    asunto: ['', Validators.required],
    oportunidadRelacionada: [''],
    fechaProgramada: [null, Validators.required],
    estado: ['PENDIENTE', Validators.required],
    responsable: ['', Validators.required],
    activo: [true]
  });

  constructor(
    private service: AccionesService,
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
    this.readOnly = !!data['readOnly'];
    this.load();
  }

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

  openNew(): void {
    this.editing = false;
    this.form.reset({ activo: true, estado: 'PENDIENTE' });
    this.dialogVisible = true;
  }

  openEdit(row: unknown): void {
    this.editing = true;
    const accion = row as Accion;
    this.form.reset({
      ...accion,
      fechaProgramada: accion.fechaProgramada ? new Date(accion.fechaProgramada) : null
    });
    this.dialogVisible = true;
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = { ...this.form.value };
    if (value.fechaProgramada instanceof Date) {
      value.fechaProgramada = value.fechaProgramada.toISOString().substring(0, 10);
    }
    const request$ = this.editing ? this.service.update(value.id, value) : this.service.create(value);
    request$.subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: this.editing ? 'Acción actualizada.' : 'Acción creada.' });
      this.dialogVisible = false;
      this.load();
    });
  }

  remove(row: unknown): void {
    const accion = row as Accion;
    this.confirmationService.confirm({
      message: `¿Eliminar la acción "${accion.asunto}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(accion.id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Acción eliminada correctamente.' });
          this.load();
        });
      }
    });
  }

  exportExcel(): void { this.service.exportExcel(this.query).subscribe(blob => this.exportService.downloadExcel(blob, 'acciones')); }
  exportPdf(): void { this.service.exportPdf(this.query).subscribe(blob => this.exportService.downloadPdf(blob, 'acciones')); }
}
