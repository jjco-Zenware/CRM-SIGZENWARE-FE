import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, NavbarComponent, BreadcrumbComponent],
  imports: [SharedModule, RouterModule],
  exports: [LayoutComponent]
})
export class LayoutModule {}
