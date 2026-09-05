import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { MetodoPago, Pago, Pedido, Producto } from '../models/entities';
import { Nuevo } from '../contracts/crud-service';
import { CarritoService } from './carrito.service';
import { InventarioService, PagoService, PedidoService } from './entity-services';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  constructor(private readonly carrito: CarritoService, private readonly inventario: InventarioService,
    private readonly pedidos: PedidoService, private readonly pagos: PagoService) {}

  procesar(clienteId: number, cliente: string, metodo: MetodoPago): Observable<Pedido> {
    const items = this.carrito.items();
    if (!items.length) throw new Error('El carrito está vacío.');
    const actualizaciones = items.map((item) => this.inventario.obtenerPorId(item.productoId).pipe(
      switchMap((producto) => {
        if (producto.stock < item.cantidad) throw new Error(`Stock insuficiente para ${producto.nombre}.`);
        const stock = producto.stock - item.cantidad;
        const actualizado: Producto = { ...producto, stock, estado: stock === 0 ? 'Agotado' : 'Disponible' };
        return this.inventario.actualizar(actualizado);
      })));
    return forkJoin(actualizaciones).pipe(
      switchMap(() => this.pedidos.crear({ numero: `PED-${Date.now().toString().slice(-7)}`, clienteId,
        cliente, fecha: new Date().toISOString(), total: this.carrito.total(), estado: 'Nuevo', items })),
      switchMap((pedido) => {
        const pago: Nuevo<Pago> = { pedidoId: pedido.id, pedido: pedido.numero, metodo,
          fecha: new Date().toISOString(), monto: pedido.total,
          estado: metodo === 'Transferencia' ? 'Pendiente' : 'Aprobado',
          referencia: `PAY-${Math.random().toString(36).slice(2, 8).toUpperCase()}` };
        return this.pagos.crear(pago).pipe(map(() => pedido));
      }), tap(() => this.carrito.limpiar()));
  }
}
