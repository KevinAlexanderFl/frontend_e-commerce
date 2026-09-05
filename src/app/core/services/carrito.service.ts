import { Injectable, computed, signal } from '@angular/core';
import { ItemCarrito, Producto } from '../models/entities';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly estado = signal<ItemCarrito[]>([]);
  readonly items = this.estado.asReadonly();
  readonly cantidad = computed(() => this.estado().reduce((total, item) => total + item.cantidad, 0));
  readonly total = computed(() => this.estado().reduce((total, item) => total + item.precio * item.cantidad, 0));

  agregar(producto: Producto, cantidad: number): void {
    if (cantidad < 1 || cantidad > producto.stock) throw new Error('La cantidad supera el stock disponible.');
    const actual = this.estado().find((item) => item.productoId === producto.id);
    if (actual && actual.cantidad + cantidad > producto.stock) throw new Error('La cantidad total supera el stock disponible.');
    this.estado.update((items) => actual
      ? items.map((item) => item.productoId === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item)
      : [...items, { productoId: producto.id, codigo: producto.codigo, nombre: producto.nombre,
        precio: producto.precio, cantidad, stockDisponible: producto.stock }]);
  }
  cambiarCantidad(productoId: number, diferencia: number): void {
    this.estado.update((items) => items.flatMap((item) => {
      if (item.productoId !== productoId) return [item];
      const cantidad = item.cantidad + diferencia;
      if (cantidad <= 0) return [];
      if (cantidad > item.stockDisponible) throw new Error('No existe más stock disponible.');
      return [{ ...item, cantidad }];
    }));
  }
  eliminar(productoId: number): void {
    this.estado.update((items) => items.filter((item) => item.productoId !== productoId));
  }
  limpiar(): void { this.estado.set([]); }
}
