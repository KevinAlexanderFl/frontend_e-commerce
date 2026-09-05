import { Component, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Pedido, Producto } from '../../core/models/entities';
import { ClienteService, InventarioService, PagoService, PedidoService } from '../../core/services/entity-services';
import { dinero, fechaCorta, mensajeError } from '../../shared/utils/formatters';

@Component({ selector: 'app-panel', templateUrl: './panel.page.html' })
export class PanelPage {
  readonly estadisticas = signal({ clientes: 0, productos: 0, pedidos: 0, ingresos: 0 });
  readonly recientes = signal<Pedido[]>([]); readonly stockBajo = signal<Producto[]>([]); readonly mensaje = signal('');
  readonly dinero = dinero; readonly fechaCorta = fechaCorta;
  constructor(clientes: ClienteService, inventario: InventarioService, pedidos: PedidoService, pagos: PagoService) {
    forkJoin({ clientes: clientes.obtenerTodos(), productos: inventario.obtenerTodos(), pedidos: pedidos.obtenerTodos(), pagos: pagos.obtenerTodos() }).subscribe({
      next: data => { this.estadisticas.set({ clientes: data.clientes.length, productos: data.productos.length, pedidos: data.pedidos.length,
        ingresos: data.pagos.filter(p => p.estado === 'Aprobado').reduce((s,p) => s + p.monto, 0) });
        this.recientes.set([...data.pedidos].sort((a,b) => b.fecha.localeCompare(a.fecha)).slice(0,5));
        this.stockBajo.set(data.productos.filter(p => p.stock <= p.stockMinimo)); }, error: e => this.mensaje.set(mensajeError(e)) });
  }
}
