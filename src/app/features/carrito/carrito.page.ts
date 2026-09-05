import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente, MetodoPago, Producto } from '../../core/models/entities';
import { CarritoService } from '../../core/services/carrito.service';
import { CheckoutService } from '../../core/services/checkout.service';
import { ClienteService, InventarioService } from '../../core/services/entity-services';
import { dinero, mensajeError } from '../../shared/utils/formatters';

@Component({ selector: 'app-carrito', imports: [FormsModule], templateUrl: './carrito.page.html' })
export class CarritoPage {
  readonly productos = signal<Producto[]>([]); readonly clientes = signal<Cliente[]>([]); readonly mensaje = signal('');
  readonly procesando = signal(false); readonly dinero = dinero; productoId = 0; clienteId = 0; cantidad = 1; metodo: MetodoPago = 'Tarjeta';
  constructor(readonly carrito: CarritoService, private readonly inventario: InventarioService,
    private readonly clienteService: ClienteService, private readonly checkout: CheckoutService, private readonly router: Router) { this.cargar(); }
  cargar(): void {
    this.inventario.obtenerTodos().subscribe({ next: p => { const disponibles = p.filter(x => x.stock > 0); this.productos.set(disponibles); this.productoId = disponibles[0]?.id ?? 0; }, error: e => this.mensaje.set(mensajeError(e)) });
    this.clienteService.obtenerTodos().subscribe({ next: c => { const activos = c.filter(x => x.estado === 'Activo'); this.clientes.set(activos); this.clienteId = activos[0]?.id ?? 0; }, error: e => this.mensaje.set(mensajeError(e)) });
  }
  agregar(): void { this.mensaje.set(''); const producto = this.productos().find(x => x.id === this.productoId); if (!producto) return;
    try { this.carrito.agregar(producto, this.cantidad); this.cantidad = 1; } catch (e) { this.mensaje.set(mensajeError(e)); } }
  cambiar(productoId: number, diferencia: number): void { try { this.carrito.cambiarCantidad(productoId, diferencia); } catch (e) { this.mensaje.set(mensajeError(e)); } }
  comprar(): void { const cliente = this.clientes().find(x => x.id === this.clienteId); if (!cliente) { this.mensaje.set('Seleccione un cliente válido.'); return; }
    this.procesando.set(true); this.mensaje.set(''); this.checkout.procesar(cliente.id, `${cliente.nombres} ${cliente.apellidos}`, this.metodo).subscribe({
      next: p => { this.procesando.set(false); alert(`Pedido ${p.numero} creado correctamente.`); void this.router.navigate(['/pedidos']); },
      error: e => { this.procesando.set(false); this.mensaje.set(mensajeError(e)); } }); }
}
