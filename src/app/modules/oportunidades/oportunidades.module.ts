import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../../shared/shared.module';
import { OportunidadesListComponent } from './oportunidades/oportunidades-list.component';
import { GestionOportunidadesComponent } from './gestion/gestion-oportunidades.component';

const routes: Routes = [
  { path: '', redirectTo: 'gestion', pathMatch: 'full' },
  {
    path: 'gestion',
    component: GestionOportunidadesComponent,
    data: { breadcrumb: 'Gestión de Oportunidades' }
  },
  {
    path: 'registro-lead',
    component: OportunidadesListComponent,
    data: {
      breadcrumb: 'Registro de Lead',
      title: 'Registro de Lead',
      subtitle: 'Altas de nuevos leads',
      estadosFilter: ['LEAD']
    }
  },
  {
    path: 'seguimiento-leads',
    component: OportunidadesListComponent,
    data: {
      breadcrumb: 'Seguimiento de Leads',
      title: 'Seguimiento de Leads',
      subtitle: 'Leads en proceso de conversión',
      estadosFilter: ['PROSPECTO', 'CALIFICADO', 'PROPUESTA', 'NEGOCIACION'],
      readOnly: true
    }
  }
];

@NgModule({
  declarations: [OportunidadesListComponent, GestionOportunidadesComponent],
  imports: [SharedModule, InputNumberModule, CalendarModule, RouterModule.forChild(routes)]
})
export class OportunidadesModule {}
