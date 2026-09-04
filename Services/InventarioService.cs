using Ecommerce_SOLID.Models;
namespace Ecommerce_SOLID.Services;

public class InventarioService(HttpClient client, IConfiguration configuration)
    : ApiCrudService<Producto>(client, configuration["BackendApi:Endpoints:Productos"] ?? "Productos"), IInventarioService
{
    public Task<List<Producto>> ListWithSuppliersAsync() => ListAsync();
    public async Task<List<Producto>> LowStockAsync() =>
        (await ListAsync()).Where(item => item.Stock <= item.StockMinimo).OrderBy(item => item.Stock).ToList();
}
