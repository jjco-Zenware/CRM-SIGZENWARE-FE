import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `<p-confirmDialog [style]="{width: '28rem'}" acceptLabel="Sí, eliminar" rejectLabel="Cancelar" acceptButtonStyleClass="p-button-danger"></p-confirmDialog>`
})
export class ConfirmDialogComponent {}
