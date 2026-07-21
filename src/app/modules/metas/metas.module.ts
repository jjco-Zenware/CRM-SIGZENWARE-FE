import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { SharedModule } from '../../shared/shared.module';
import { MetasListComponent } from './metas/metas-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'gestion', pathMatch: 'full' },
  {
    path: 'gestion',
    component: MetasListComponent,
    data: {
      breadcrumb: 'Gestión de Metas',
      title: 'Gestión de Metas',
      subtitle: 'Objetivos comerciales por responsable y periodo',
      metaIds: [1]
    }
  },
  {
    path: 'seguimiento',
    component: MetasListComponent,
    data: {
      breadcrumb: 'Seguimiento de Metas',
      title: 'Seguimiento de Metas',
      subtitle: 'Avance de metas según oportunidades ganadas',
      metaIds: [2],
      readOnly: true
    }
  }
];

@NgModule({
  declarations: [MetasListComponent],
  imports: [SharedModule, InputNumberModule, RouterModule.forChild(routes)]
})
export class MetasModule {}
