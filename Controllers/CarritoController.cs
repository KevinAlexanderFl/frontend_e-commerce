using Ecommerce_SOLID.Models;
using Ecommerce_SOLID.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_SOLID.Controllers;

public class CarritoController(
    ICarritoService cart,
    IInventarioService inventory,
    IClienteService clients,
    IPedidoService orders) : Controller
{
    public async Task<IActionResult> Index()
    {
        return View(new CarritoViewModel
        {
            Items = cart.GetItems().ToList(),
            Productos = (await inventory.ListAsync()).Where(item => item.Activo && item.Stock > 0).ToList(),
            Clientes = (await clients.ListAsync()).Where(item => item.Activo).ToList()
        });
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Add(int productoId, int cantidad)
    {
        try
        {
            await cart.AddAsync(productoId, cantidad);
            TempData["Success"] = "Producto agregado al carrito.";
        }
        catch (InvalidOperationException exception) { TempData["Error"] = exception.Message; }
        return RedirectToAction(nameof(Index));
    }

    [HttpPost, ValidateAntiForgeryToken]
    public IActionResult Remove(int productoId)
    {
        cart.Remove(productoId);
        return RedirectToAction(nameof(Index));
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Checkout(CheckoutViewModel model)
    {
        if (!ModelState.IsValid)
        {
            TempData["Error"] = "Complete los datos del pedido.";
            return RedirectToAction(nameof(Index));
        }
        try
        {
            var order = await orders.CheckoutAsync(model.ClienteId, model.MetodoPago, cart.GetItems());
            cart.Clear();
            TempData["Success"] = $"Pedido {order.Numero} generado correctamente.";
            return RedirectToAction("Index", "Pedidos");
        }
        catch (InvalidOperationException exception)
        {
            TempData["Error"] = exception.Message;
            return RedirectToAction(nameof(Index));
        }
    }
}
