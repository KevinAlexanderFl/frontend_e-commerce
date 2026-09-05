import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'panel', loadComponent: () => import('./features/panel/panel.page').then(m => m.PanelPage) },
  { path: 'clientes', loadComponent: () => import('./features/clientes/clientes.page').then(m => m.ClientesPage) },
  { path: 'proveedores', loadComponent: () => import('./features/proveedores/proveedores.page').then(m => m.ProveedoresPage) },
  { path: 'inventario', loadComponent: () => import('./features/inventario/inventario.page').then(m => m.InventarioPage) },
  { path: 'carrito', loadComponent: () => import('./features/carrito/carrito.page').then(m => m.CarritoPage) },
  { path: 'pedidos', loadComponent: () => import('./features/pedidos/pedidos.page').then(m => m.PedidosPage) },
  { path: 'pagos', loadComponent: () => import('./features/pagos/pagos.page').then(m => m.PagosPage) },
  { path: '', pathMatch: 'full', redirectTo: 'panel' },
  { path: '**', redirectTo: 'panel' },
];
