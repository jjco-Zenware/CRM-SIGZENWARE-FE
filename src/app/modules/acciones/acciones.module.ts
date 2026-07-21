import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../../shared/shared.module';
import { AccionesListComponent } from './acciones/acciones-list.component';
import { GestionAccionesComponent } from './gestion/gestion-acciones.component';

const routes: Routes = [
  { path: '', redirectTo: 'gestion', pathMatch: 'full' },
  {
    path: 'gestion',
    component: GestionAccionesComponent,
    data: { breadcrumb: 'Gestión de Acciones' }
  },
  {
    path: 'registro',
    component: AccionesListComponent,
    data: {
      breadcrumb: 'Registro de Acciones',
      title: 'Registro de Acciones',
      subtitle: 'Alta y mantenimiento de acciones'
    }
  },
  {
    path: 'seguimiento',
    component: AccionesListComponent,
    data: {
      breadcrumb: 'Seguimiento de Acciones',
      title: 'Seguimiento de Acciones',
      subtitle: 'Acciones programadas para dar seguimiento',
      readOnly: true
    }
  }
];

@NgModule({
  declarations: [AccionesListComponent, GestionAccionesComponent],
  imports: [SharedModule, CalendarModule, RouterModule.forChild(routes)]
})
export class AccionesModule {}
