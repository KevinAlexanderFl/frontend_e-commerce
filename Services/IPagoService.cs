using Ecommerce_SOLID.Models;

namespace Ecommerce_SOLID.Services;

public interface IPagoService
{
    Task<List<Pago>> ListAsync();
    Task ChangeStatusAsync(int id, string status);
}
