using Ecommerce_SOLID.Models;

namespace Ecommerce_SOLID.Services;

public interface IInventarioService : IApiCrudService<Producto>
{
    Task<List<Producto>> ListWithSuppliersAsync();
    Task<List<Producto>> LowStockAsync();
}
