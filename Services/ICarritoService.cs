using Ecommerce_SOLID.Models;

namespace Ecommerce_SOLID.Services;

public interface ICarritoService
{
    IReadOnlyList<CarritoItem> GetItems();
    Task AddAsync(int productoId, int cantidad);
    void Remove(int productoId);
    void Clear();
}
