using Ecommerce_SOLID.Models;
using Ecommerce_SOLID.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_SOLID.Controllers;

public class ClientesController(IClienteService service) : Controller
{
    public async Task<IActionResult> Index() => View(await service.ListAsync());

    public async Task<IActionResult> Upsert(int? id)
    {
        if (id is null) return View(new Cliente());
        var client = await service.GetAsync(id.Value);
        return client is null ? NotFound() : View(client);
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Upsert(Cliente model)
    {
        if (!ModelState.IsValid) return View(model);
        if (model.Id == 0) await service.CreateAsync(model);
        else await service.UpdateAsync(model);
        TempData["Success"] = "Cliente guardado correctamente.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteAsync(id);
        TempData["Success"] = "Cliente eliminado correctamente.";
        return RedirectToAction(nameof(Index));
    }
}
