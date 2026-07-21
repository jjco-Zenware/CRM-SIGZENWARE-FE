import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  collapsed = false;

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}
