import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private itemsSubject = new BehaviorSubject<MenuItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.itemsSubject.next(this.buildBreadcrumb(this.activatedRoute.root));
    });
  }

  private buildBreadcrumb(route: ActivatedRoute, items: MenuItem[] = []): MenuItem[] {
    const children = route.children;
    if (children.length === 0) {
      return items;
    }
    for (const child of children) {
      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        items = [...items, { label }];
      }
      return this.buildBreadcrumb(child, items);
    }
    return items;
  }
}
