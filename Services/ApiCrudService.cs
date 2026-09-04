using System.Net;
using System.Net.Http.Json;
using Ecommerce_SOLID.Models;

namespace Ecommerce_SOLID.Services;

public abstract class ApiCrudService<T>(HttpClient httpClient, string endpoint)
    : IApiCrudService<T> where T : class, IEntity
{
    protected readonly HttpClient HttpClient = httpClient;
    protected readonly string Endpoint = endpoint.Trim('/');

    public virtual async Task<List<T>> ListAsync() =>
        await HttpClient.GetFromJsonAsync<List<T>>(Endpoint) ?? [];

    public virtual async Task<T?> GetAsync(int id)
    {
        var response = await HttpClient.GetAsync($"{Endpoint}/{id}");
        if (response.StatusCode == HttpStatusCode.NotFound) return null;
        await ApiResponse.EnsureSuccessAsync(response);
        return await response.Content.ReadFromJsonAsync<T>();
    }

    public virtual async Task<T> CreateAsync(T entity)
    {
        var response = await HttpClient.PostAsJsonAsync(Endpoint, entity);
        await ApiResponse.EnsureSuccessAsync(response);
        return await response.Content.ReadFromJsonAsync<T>() ?? entity;
    }

    public virtual async Task UpdateAsync(T entity)
    {
        var response = await HttpClient.PutAsJsonAsync($"{Endpoint}/{entity.Id}", entity);
        await ApiResponse.EnsureSuccessAsync(response);
    }

    public virtual async Task DeleteAsync(int id)
    {
        var response = await HttpClient.DeleteAsync($"{Endpoint}/{id}");
        await ApiResponse.EnsureSuccessAsync(response);
    }
}

internal static class ApiResponse
{
    public static async Task EnsureSuccessAsync(HttpResponseMessage response)
    {
        if (response.IsSuccessStatusCode) return;
        var detail = await response.Content.ReadAsStringAsync();
        throw new HttpRequestException(
            string.IsNullOrWhiteSpace(detail)
                ? $"El backend respondió con el código {(int)response.StatusCode}."
                : $"El backend rechazó la operación: {detail}");
    }
}
