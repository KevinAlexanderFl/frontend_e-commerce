# NexoCommerce — Frontend Angular con principios SOLID

Frontend administrativo para un sistema web e-commerce. Está desarrollado completamente con **Angular 22, TypeScript, HTML y CSS**. No contiene C#, Razor, Entity Framework ni base de datos: consume el backend mediante servicios HTTP.

## Módulos incluidos

- Panel principal con indicadores, últimos pedidos y alertas de stock.
- Clientes y Proveedores: CRUD completo con búsqueda.
- Inventario: productos, precios, existencias y stock mínimo.
- Carrito: productos, cantidades, cliente y método de pago.
- Pedidos: consulta, detalle y actualización del estado.
- Pagos: totales, transacciones y actualización del estado.

## Cómo ejecutar en Visual Studio Code

Requisitos: Node.js 20.19 o superior, Visual Studio Code y el backend en ejecución.

```bash
npm install
npm start
```

Angular abrirá la aplicación normalmente en `http://localhost:4200`. En Windows también puedes ejecutar `Iniciar.bat`.

## Conexión con el backend

La URL se configura en `src/environments/environment.ts`. El valor incluido es:

```ts
apiUrl: 'https://localhost:7068/api'
```

Si tu API usa otro puerto, modifica solamente ese valor.

| Módulo | Endpoint esperado |
|---|---|
| Clientes | `/api/Clientes` |
| Proveedores | `/api/Proveedores` |
| Inventario | `/api/Productos` |
| Pedidos | `/api/Pedidos` |
| Pagos | `/api/Pagos` |

El backend debe permitir CORS para `http://localhost:4200`. Si utiliza HTTPS local, abre primero Swagger y acepta el certificado de desarrollo.

## Compilación

```bash
npm run build
```

La versión final se genera en `dist/frontend-angular/browser`.

## Estructura

```text
src/app/
├── core/
│   ├── contracts/          Interfaces
│   ├── models/             Modelos TypeScript
│   └── services/           Acceso HTTP y reglas de negocio
├── features/
│   ├── panel/
│   ├── clientes/
│   ├── proveedores/
│   ├── inventario/
│   ├── carrito/
│   ├── pedidos/
│   └── pagos/
├── shared/utils/           Utilidades reutilizables
├── app.routes.ts           Rutas con carga diferida
└── app.config.ts           Inyección de dependencias
```

La justificación académica está en `DOCUMENTACION_SOLID.md`.
