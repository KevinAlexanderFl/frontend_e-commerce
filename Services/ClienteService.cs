using Ecommerce_SOLID.Models;

namespace Ecommerce_SOLID.Services;

public class ClienteService(HttpClient client, IConfiguration configuration)
    : ApiCrudService<Cliente>(client, configuration["BackendApi:Endpoints:Clientes"] ?? "Clientes"), IClienteService
{
}
