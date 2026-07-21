import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p-toast></p-toast>
    <app-confirm-dialog></app-confirm-dialog>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
