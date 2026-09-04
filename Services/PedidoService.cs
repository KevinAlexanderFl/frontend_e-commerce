using Ecommerce_SOLID.Models;
using System.Net.Http.Json;

namespace Ecommerce_SOLID.Services;

public class PedidoService(HttpClient client, IConfiguration configuration) : IPedidoService
{
    private static readonly string[] ValidStatuses = ["Nuevo", "Preparando", "Enviado", "Entregado", "Cancelado"];
    private static readonly string[] ValidPaymentMethods = ["Tarjeta", "Transferencia", "Efectivo"];
    private readonly string _endpoint = configuration["BackendApi:Endpoints:Pedidos"] ?? "Pedidos";
    private readonly string _checkoutEndpoint = configuration["BackendApi:Endpoints:Checkout"] ?? "Pedidos/checkout";

    public async Task<List<Pedido>> ListAsync() =>
        (await client.GetFromJsonAsync<List<Pedido>>(_endpoint) ?? [])
        .OrderByDescending(item => item.Fecha).ToList();

    public async Task<Pedido> CheckoutAsync(int clienteId, string metodoPago, IReadOnlyList<CarritoItem> items)
    {
        if (items.Count == 0) throw new InvalidOperationException("El carrito está vacío.");
        if (!ValidPaymentMethods.Contains(metodoPago))
            throw new InvalidOperationException("El método de pago no es válido.");
        var request = new CheckoutApiRequest
        {
            ClienteId = clienteId,
            MetodoPago = metodoPago,
            Items = items.Select(item => new CheckoutApiItem
            {
                ProductoId = item.ProductoId,
                Cantidad = item.Cantidad
            }).ToList()
        };
        var response = await client.PostAsJsonAsync(_checkoutEndpoint, request);
        await ApiResponse.EnsureSuccessAsync(response);
        return await response.Content.ReadFromJsonAsync<Pedido>()
            ?? throw new HttpRequestException("El backend no devolvió el pedido creado.");
    }

    public async Task ChangeStatusAsync(int id, string status)
    {
        if (!ValidStatuses.Contains(status)) throw new InvalidOperationException("Estado de pedido no válido.");
        var response = await client.PutAsJsonAsync($"{_endpoint}/{id}/estado", new { Estado = status });
        await ApiResponse.EnsureSuccessAsync(response);
    }

    private sealed class CheckoutApiRequest
    {
        public int ClienteId { get; init; }
        public string MetodoPago { get; init; } = string.Empty;
        public List<CheckoutApiItem> Items { get; init; } = [];
    }

    private sealed class CheckoutApiItem
    {
        public int ProductoId { get; init; }
        public int Cantidad { get; init; }
    }
}
