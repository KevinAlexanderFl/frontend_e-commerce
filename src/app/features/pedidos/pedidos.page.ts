import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoPedido, Pedido } from '../../core/models/entities';
import { PedidoService } from '../../core/services/entity-services';
import { dinero, fechaCorta, mensajeError } from '../../shared/utils/formatters';

@Component({ selector: 'app-pedidos', imports: [FormsModule], templateUrl: './pedidos.page.html' })
export class PedidosPage {
  readonly registros = signal<Pedido[]>([]); readonly consulta = signal(''); readonly cargando = signal(true);
  readonly mensaje = signal(''); readonly seleccionado = signal<Pedido | null>(null); readonly dinero = dinero; readonly fechaCorta = fechaCorta;
  readonly estados: EstadoPedido[] = ['Nuevo', 'Preparando', 'Enviado', 'Entregado', 'Cancelado'];
  readonly filtrados = computed(() => { const q = this.consulta().toLowerCase(); return [...this.registros()]
    .sort((a,b) => b.fecha.localeCompare(a.fecha)).filter(p => `${p.numero} ${p.cliente} ${p.estado}`.toLowerCase().includes(q)); });
  constructor(private readonly servicio: PedidoService) { this.cargar(); }
  cargar(): void { this.cargando.set(true); this.mensaje.set(''); this.servicio.obtenerTodos().subscribe({ next: d => { this.registros.set(d); this.cargando.set(false); }, error: e => { this.mensaje.set(mensajeError(e)); this.cargando.set(false); } }); }
  cambiar(item: Pedido, estado: EstadoPedido): void { this.servicio.cambiarEstado(item, estado).subscribe({ next: () => this.cargar(), error: e => this.mensaje.set(mensajeError(e)) }); }
}
