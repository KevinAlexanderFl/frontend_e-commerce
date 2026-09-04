using Ecommerce_SOLID.Models;

namespace Ecommerce_SOLID.Services;

public class ProveedorService(HttpClient client, IConfiguration configuration)
    : ApiCrudService<Proveedor>(client, configuration["BackendApi:Endpoints:Proveedores"] ?? "Proveedores"), IProveedorService
{
}
