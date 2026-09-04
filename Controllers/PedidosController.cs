using Ecommerce_SOLID.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_SOLID.Controllers;

public class PedidosController(IPedidoService service) : Controller
{
    public async Task<IActionResult> Index() => View(await service.ListAsync());

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> ChangeStatus(int id, string estado)
    {
        await service.ChangeStatusAsync(id, estado);
        TempData["Success"] = "Estado del pedido actualizado.";
        return RedirectToAction(nameof(Index));
    }
}
