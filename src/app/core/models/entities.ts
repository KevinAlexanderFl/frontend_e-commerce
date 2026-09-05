export interface Entity { id: number; }
export type EstadoRegistro = 'Activo' | 'Inactivo';

export interface Cliente extends Entity {
  nombres: string; apellidos: string; direccion: string; telefono: string;
  email: string; ruc: string; estado: EstadoRegistro;
}

export interface Proveedor extends Entity {
  nombre: string; ruc: string; contacto: string; telefono: string;
  email: string; categoria: string; estado: EstadoRegistro;
}

export interface Producto extends Entity {
  codigo: string; nombre: string; categoria: string; stock: number;
  stockMinimo: number; precio: number; proveedorId: number;
  estado: 'Disponible' | 'Agotado';
}

export interface ItemCarrito {
  productoId: number; codigo: string; nombre: string; precio: number;
  cantidad: number; stockDisponible: number;
}

export type EstadoPedido = 'Nuevo' | 'Preparando' | 'Enviado' | 'Entregado' | 'Cancelado';
export interface Pedido extends Entity {
  numero: string; clienteId: number; cliente: string; fecha: string;
  total: number; estado: EstadoPedido; items: ItemCarrito[];
}

export type MetodoPago = 'Tarjeta' | 'Transferencia' | 'Efectivo';
export type EstadoPago = 'Aprobado' | 'Pendiente' | 'Rechazado';
export interface Pago extends Entity {
  pedidoId: number; pedido: string; metodo: MetodoPago; fecha: string;
  monto: number; estado: EstadoPago; referencia: string;
}
