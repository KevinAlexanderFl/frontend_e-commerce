# NexoCommerce — ASP.NET Core MVC con SOLID

Proyecto e-commerce desarrollado en C# siguiendo la estructura del repositorio `Api_Clientes_Quito`:

```text
Ecommerce_SOLID_MVC/
├── Controllers/
├── Models/
├── Properties/
├── Services/
├── Views/
├── wwwroot/
├── Ecommerce_SOLID.csproj
├── Ecommerce_SOLID.http
├── Ecommerce_SOLID.slnx
├── Program.cs
├── appsettings.Development.json
└── appsettings.json
```

Las carpetas `Views` y `wwwroot` contienen la interfaz. `Services` contiene únicamente clientes HTTP para consumir el backend existente. Este proyecto no incluye Entity Framework, migraciones ni conexión a una base de datos.

## Módulos

- Clientes: crear, consultar, editar, buscar y eliminar.
- Proveedores: CRUD y clasificación por categoría.
- Inventario: productos, precios, existencias y alertas de stock mínimo.
- Carrito: selección de productos y cantidades con validación de stock.
- Pedidos: checkout, descuento de inventario y seguimiento de estado.
- Pagos: registro automático, referencia, método y estado.
- Dashboard: resumen de clientes, productos, pedidos, ingresos y stock bajo.

## Cómo ejecutar en Visual Studio

1. Instalar el SDK de .NET 10.
2. Descomprimir el proyecto.
3. Abrir `Ecommerce_SOLID.slnx` en Visual Studio 2026 o abrir la carpeta en Visual Studio Code.
4. Restaurar paquetes NuGet.
5. Ejecutar primero el backend y después este frontend con el perfil HTTPS.

Desde una terminal también se puede ejecutar:

```bash
dotnet restore
dotnet run
```

## Conexión con el backend

La dirección del backend se configura en `appsettings.json`. La URL predeterminada coincide con el perfil HTTPS del repositorio `Api_Clientes_Quito`:

```json
"BaseUrl": "https://localhost:7068/api/"
```

Los endpoints esperados también son configurables:

```json
"Clientes": "Clientes",
"Proveedores": "Proveedores",
"Productos": "Productos",
"Pedidos": "Pedidos",
"Checkout": "Pedidos/checkout",
"Pagos": "Pagos"
```

Si el backend utiliza rutas distintas, solo se modifican esos valores. No es necesario cambiar los controladores ni las vistas.

Consulta `DOCUMENTACION_SOLID.md` para la explicación académica de la arquitectura.
