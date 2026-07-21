import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

/**
 * Definición del menú lateral del CRM. Contiene exactamente los módulos
 * solicitados (Oportunidades, Gestión de Acciones, Gestión de Metas) más
 * Dashboard, sin agregar módulos adicionales no pedidos (p.ej. Clientes/Contactos).
 */
@Injectable({ providedIn: 'root' })
export class MenuService {
  getMenu(): MenuItem[] {
    return [
      { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
      {
        label: 'Oportunidades',
        icon: 'pi pi-briefcase',
        children: [
          { label: 'Gestión de Oportunidades', icon: 'pi pi-briefcase', route: '/oportunidades/gestion' },
          { label: 'Registro de Lead', icon: 'pi pi-user-plus', route: '/oportunidades/registro-lead' },
          { label: 'Seguimiento de Leads', icon: 'pi pi-directions', route: '/oportunidades/seguimiento-leads' }
        ]
      },
      {
        label: 'Acciones',
        icon: 'pi pi-check-square',
        children: [
          { label: 'Gestión de Acciones', icon: 'pi pi-sync', route: '/acciones/gestion' },
          { label: 'Registro de Acciones', icon: 'pi pi-list', route: '/acciones/registro' },
          { label: 'Seguimiento de Acciones', icon: 'pi pi-eye', route: '/acciones/seguimiento' }
        ]
      },
      {
        label: 'Metas',
        icon: 'pi pi-chart-line',
        children: [
          { label: 'Gestión de Metas', icon: 'pi pi-chart-line', route: '/metas/gestion' },
          { label: 'Seguimiento de Metas', icon: 'pi pi-chart-bar', route: '/metas/seguimiento' }
        ]
      }
    ];
  }
}
