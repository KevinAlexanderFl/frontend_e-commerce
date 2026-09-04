using Ecommerce_SOLID.Models;
using Ecommerce_SOLID.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce_SOLID.Controllers;

public class ProveedoresController(IProveedorService service) : Controller
{
    public async Task<IActionResult> Index() => View(await service.ListAsync());

    public async Task<IActionResult> Upsert(int? id)
    {
        if (id is null) return View(new Proveedor());
        var supplier = await service.GetAsync(id.Value);
        return supplier is null ? NotFound() : View(supplier);
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Upsert(Proveedor model)
    {
        if (!ModelState.IsValid) return View(model);
        if (model.Id == 0) await service.CreateAsync(model);
        else await service.UpdateAsync(model);
        TempData["Success"] = "Proveedor guardado correctamente.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteAsync(id);
        TempData["Success"] = "Proveedor eliminado correctamente.";
        return RedirectToAction(nameof(Index));
    }
}
