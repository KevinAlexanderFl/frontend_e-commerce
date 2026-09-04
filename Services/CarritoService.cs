using System.Text.Json;
using Ecommerce_SOLID.Models;

namespace Ecommerce_SOLID.Services;

public class CarritoService(IHttpContextAccessor accessor, IInventarioService inventory) : ICarritoService
{
    private const string SessionKey = "EcommerceCart";
    private ISession Session => accessor.HttpContext?.Session
        ?? throw new InvalidOperationException("La sesión no está disponible.");

    public IReadOnlyList<CarritoItem> GetItems() => Read();

    public async Task AddAsync(int productoId, int cantidad)
    {
        if (cantidad < 1) throw new InvalidOperationException("La cantidad debe ser mayor a cero.");
        var product = await inventory.GetAsync(productoId)
            ?? throw new InvalidOperationException("El producto no existe.");
        var items = Read();
        var current = items.FirstOrDefault(item => item.ProductoId == productoId);
        var requested = cantidad + (current?.Cantidad ?? 0);
        if (!product.Activo || requested > product.Stock)
            throw new InvalidOperationException("No existe stock suficiente para completar la operación.");

        if (current is null)
        {
            items.Add(new CarritoItem
            {
                ProductoId = product.Id,
                Codigo = product.Codigo,
                Nombre = product.Nombre,
                Precio = product.Precio,
                Cantidad = cantidad,
                StockDisponible = product.Stock
            });
        }
        else current.Cantidad = requested;

        Write(items);
    }

    public void Remove(int productoId)
    {
        var items = Read();
        items.RemoveAll(item => item.ProductoId == productoId);
        Write(items);
    }

    public void Clear() => Session.Remove(SessionKey);

    private List<CarritoItem> Read() =>
        JsonSerializer.Deserialize<List<CarritoItem>>(Session.GetString(SessionKey) ?? "[]") ?? [];

    private void Write(List<CarritoItem> items) =>
        Session.SetString(SessionKey, JsonSerializer.Serialize(items));
}
