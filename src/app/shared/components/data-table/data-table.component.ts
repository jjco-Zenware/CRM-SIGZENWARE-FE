import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: unknown[] = [];
  @Input() totalRecords = 0;
  @Input() loading = false;
  @Input() rows = 10;
  @Input() title = '';
  @Input() showNewButton = true;
  @Input() showActionsColumn = true;
  /** Plantilla opcional para reemplazar los botones Editar/Eliminar por defecto en la columna Acciones. Recibe la fila como $implicit. */
  @Input() actionsTemplate?: TemplateRef<unknown>;

  @Output() pageChange = new EventEmitter<{ page: number; rows: number }>();
  @Output() search = new EventEmitter<string>();
  @Output() sort = new EventEmitter<{ field: string; order: number }>();
  @Output() newItem = new EventEmitter<void>();
  @Output() editItem = new EventEmitter<unknown>();
  @Output() deleteItem = new EventEmitter<unknown>();
  @Output() exportExcel = new EventEmitter<void>();
  @Output() exportPdf = new EventEmitter<void>();

  searchTerm = '';

  onLazyLoad(event: { first?: number; rows?: number; sortField?: string; sortOrder?: number }): void {
    const rows = event.rows ?? this.rows;
    const first = event.first ?? 0;
    const page = Math.floor(first / rows) + 1;
    this.pageChange.emit({ page, rows });
    if (event.sortField) {
      this.sort.emit({ field: event.sortField, order: event.sortOrder ?? 1 });
    }
  }

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  fieldValue(row: unknown, field: string): unknown {
    return (row as Record<string, unknown>)[field];
  }
}
