import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../shared/models/menu-item.model';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  menu: MenuItem[] = this.menuService.getMenu();

  constructor(private menuService: MenuService, private router: Router) {}

  isChildActive(item: MenuItem): boolean {
    return !!item.children?.some(child => child.route && this.router.url.startsWith(child.route));
  }

  onParentClick(item: MenuItem): void {
    const firstRoute = item.children?.[0]?.route;
    if (firstRoute) this.router.navigateByUrl(firstRoute);
  }
}
