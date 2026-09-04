using System.Diagnostics;
using Ecommerce_SOLID.Models;
using Ecommerce_SOLID.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_SOLID.Controllers;

public class HomeController(
    IClienteService clients,
    IProveedorService suppliers,
    IInventarioService inventory,
    IPedidoService orders,
    IPagoService payments) : Controller
{
    public async Task<IActionResult> Index()
    {
        var customerList = await clients.ListAsync();
        var supplierList = await suppliers.ListAsync();
        var productList = await inventory.ListAsync();
        var orderList = await orders.ListAsync();
        var paymentList = await payments.ListAsync();
        return View(new DashboardViewModel
        {
            Clientes = customerList.Count,
            Proveedores = supplierList.Count,
            Productos = productList.Count,
            Pedidos = orderList.Count,
            Ingresos = paymentList.Where(item => item.Estado == "Aprobado").Sum(item => item.Monto),
            StockBajo = await inventory.LowStockAsync(),
            PedidosRecientes = orderList.Take(5).ToList()
        });
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error() => View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
}
