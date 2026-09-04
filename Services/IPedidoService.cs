using Ecommerce_SOLID.Models;

namespace Ecommerce_SOLID.Services;

public interface IPedidoService
{
    Task<List<Pedido>> ListAsync();
    Task<Pedido> CheckoutAsync(int clienteId, string metodoPago, IReadOnlyList<CarritoItem> items);
    Task ChangeStatusAsync(int id, string status);
}
