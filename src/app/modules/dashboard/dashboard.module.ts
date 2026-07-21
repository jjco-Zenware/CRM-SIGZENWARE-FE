import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [SharedModule, ChartModule, RouterModule.forChild(routes)]
})
export class DashboardModule {}
