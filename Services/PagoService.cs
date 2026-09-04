using Ecommerce_SOLID.Models;
using System.Net.Http.Json;

namespace Ecommerce_SOLID.Services;

public class PagoService(HttpClient client, IConfiguration configuration) : IPagoService
{
    private static readonly string[] ValidStatuses = ["Aprobado", "Pendiente", "Rechazado"];
    private readonly string _endpoint = configuration["BackendApi:Endpoints:Pagos"] ?? "Pagos";

    public async Task<List<Pago>> ListAsync() =>
        (await client.GetFromJsonAsync<List<Pago>>(_endpoint) ?? [])
        .OrderByDescending(item => item.Fecha).ToList();

    public async Task ChangeStatusAsync(int id, string status)
    {
        if (!ValidStatuses.Contains(status)) throw new InvalidOperationException("Estado de pago no válido.");
        var response = await client.PutAsJsonAsync($"{_endpoint}/{id}/estado", new { Estado = status });
        await ApiResponse.EnsureSuccessAsync(response);
    }
}
