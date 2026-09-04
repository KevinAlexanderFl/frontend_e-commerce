using Ecommerce_SOLID.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddHttpContextAccessor();

// Inyección de dependencias: los controladores dependen de abstracciones.
var backendUrl = builder.Configuration["BackendApi:BaseUrl"]
    ?? throw new InvalidOperationException("Configure BackendApi:BaseUrl en appsettings.json.");
void ConfigureApi(HttpClient client) => client.BaseAddress = new Uri(backendUrl);

builder.Services.AddHttpClient<IClienteService, ClienteService>(ConfigureApi);
builder.Services.AddHttpClient<IProveedorService, ProveedorService>(ConfigureApi);
builder.Services.AddHttpClient<IInventarioService, InventarioService>(ConfigureApi);
builder.Services.AddHttpClient<IPedidoService, PedidoService>(ConfigureApi);
builder.Services.AddHttpClient<IPagoService, PagoService>(ConfigureApi);
builder.Services.AddScoped<ICarritoService, CarritoService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseSession();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
