# Aplicación de los principios SOLID

## S — Responsabilidad única

Las páginas gestionan la interacción visual; `ApiCrudService` realiza solicitudes HTTP; `CarritoService` controla el carrito; `CheckoutService` coordina la compra. La presentación no accede directamente a la API.

## O — Abierto/cerrado

`ApiCrudService<T>` concentra el CRUD común y puede extenderse para nuevos módulos sin cambiar su implementación. Para agregar una entidad se crea su modelo, servicio especializado y página.

## L — Sustitución de Liskov

Los servicios concretos respetan el contrato CRUD heredado. Cualquier consumidor puede utilizar las mismas operaciones sin alterar el comportamiento esperado.

## I — Segregación de interfaces

`CrudService<T>` expone solo las operaciones necesarias para administrar una entidad. Las funciones particulares permanecen en servicios especializados.

## D — Inversión de dependencias

Los componentes reciben servicios mediante la inyección de dependencias de Angular. No crean `HttpClient` ni construyen manualmente sus dependencias, reduciendo el acoplamiento.

## Decisiones complementarias

- Modelos fuertemente tipados con TypeScript.
- Rutas con carga diferida para separar módulos.
- URL del backend centralizada en `environment.ts`.
- Estado temporal del carrito administrado con Signals, sin base de datos.
- Manejo visible de errores de red y validaciones HTML.
