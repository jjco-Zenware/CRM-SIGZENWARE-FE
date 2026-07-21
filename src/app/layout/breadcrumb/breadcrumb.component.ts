import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../shared/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  template: `<p-breadcrumb [model]="(items$ | async) ?? []" [home]="home" styleClass="erp-breadcrumb"></p-breadcrumb>`,
  styles: [`
    :host ::ng-deep .erp-breadcrumb { background: transparent; border: none; padding: 0 0 1rem 0; }
  `]
})
export class BreadcrumbComponent {
  items$ = this.breadcrumbService.items$;
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/dashboard' };

  constructor(private breadcrumbService: BreadcrumbService) {}
}
