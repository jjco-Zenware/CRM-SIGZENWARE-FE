import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="page-header">
      <div>
        <h2>{{ title }}</h2>
        <p *ngIf="subtitle" class="subtitle">{{ subtitle }}</p>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 1rem; }
    .page-header h2 { margin: 0 0 .15rem; font-size: 1.4rem; }
    .subtitle { margin: 0; color: var(--crm-text-muted); font-size: .9rem; }
  `]
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
