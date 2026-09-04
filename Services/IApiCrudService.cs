using Ecommerce_SOLID.Models;

namespace Ecommerce_SOLID.Services;

public interface IApiCrudService<T> where T : class, IEntity
{
    Task<List<T>> ListAsync();
    Task<T?> GetAsync(int id);
    Task<T> CreateAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}

public interface IClienteService : IApiCrudService<Cliente> { }
public interface IProveedorService : IApiCrudService<Proveedor> { }
