import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiCrudService } from './api-crud.service';
import { Cliente, EstadoPago, EstadoPedido, Pago, Pedido, Producto, Proveedor } from '../models/entities';

@Injectable({ providedIn: 'root' })
export class ClienteService extends ApiCrudService<Cliente> {
  constructor(http: HttpClient) { super(http, 'Clientes'); }
}
@Injectable({ providedIn: 'root' })
export class ProveedorService extends ApiCrudService<Proveedor> {
  constructor(http: HttpClient) { super(http, 'Proveedores'); }
}
@Injectable({ providedIn: 'root' })
export class InventarioService extends ApiCrudService<Producto> {
  constructor(http: HttpClient) { super(http, 'Productos'); }
}
@Injectable({ providedIn: 'root' })
export class PedidoService extends ApiCrudService<Pedido> {
  constructor(http: HttpClient) { super(http, 'Pedidos'); }
  cambiarEstado(pedido: Pedido, estado: EstadoPedido): Observable<void> {
    return this.actualizar({ ...pedido, estado });
  }
}
@Injectable({ providedIn: 'root' })
export class PagoService extends ApiCrudService<Pago> {
  constructor(http: HttpClient) { super(http, 'Pagos'); }
  cambiarEstado(pago: Pago, estado: EstadoPago): Observable<void> {
    return this.actualizar({ ...pago, estado });
  }
}
