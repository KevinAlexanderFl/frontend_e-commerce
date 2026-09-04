# Aplicación de SOLID

## S — Responsabilidad única

Los controladores atienden solicitudes, los servicios consumen la API, los modelos representan los datos y las vistas muestran la interfaz. Cada clase tiene una responsabilidad definida.

## O — Abierto/cerrado

Las funciones se amplían mediante interfaces. Se puede reemplazar el cliente HTTP o agregar otro servicio sin reescribir los controladores.

## L — Sustitución de Liskov

`ClienteService`, `ProveedorService` e `InventarioService` respetan contratos estables. Cualquier implementación que conserve esos contratos puede sustituirlas sin afectar los controladores.

## I — Segregación de interfaces

Se usan contratos pequeños: `IApiCrudService<T>`, `IClienteService`, `IProveedorService`, `IInventarioService`, `ICarritoService`, `IPedidoService` e `IPagoService`. Cada controlador recibe únicamente las operaciones que necesita.

## D — Inversión de dependencias

Los controladores dependen de interfaces y no de clases concretas. `Program.cs` registra clientes HTTP tipados mediante inyección de dependencias. Por ejemplo, `ClientesController` recibe `IClienteService` y `CarritoController` recibe servicios abstractos para carrito, inventario, clientes y pedidos.

## Flujo del pedido

1. `CarritoController` solicita agregar un producto mediante `ICarritoService`.
2. `CarritoService` consulta `IInventarioService` y valida el stock.
3. Al confirmar, `IPedidoService` envía el cliente, el método de pago y los productos al endpoint de checkout.
4. El backend realiza las validaciones y registra la operación en su propia base de datos.
5. El carrito se limpia solamente después de recibir una respuesta exitosa del backend.
