using Ecommerce_SOLID.Models;
using Ecommerce_SOLID.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Ecommerce_SOLID.Controllers;

public class InventarioController(IInventarioService service, IProveedorService suppliers) : Controller
{
    public async Task<IActionResult> Index() => View(await service.ListWithSuppliersAsync());

    public async Task<IActionResult> Upsert(int? id)
    {
        await LoadSuppliers();
        if (id is null) return View(new Producto());
        var product = await service.GetAsync(id.Value);
        return product is null ? NotFound() : View(product);
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Upsert(Producto model)
    {
        if (!ModelState.IsValid)
        {
            await LoadSuppliers();
            return View(model);
        }
        if (model.Id == 0) await service.CreateAsync(model);
        else await service.UpdateAsync(model);
        TempData["Success"] = "Producto guardado correctamente.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteAsync(id);
        TempData["Success"] = "Producto eliminado correctamente.";
        return RedirectToAction(nameof(Index));
    }

    private async Task LoadSuppliers() =>
        ViewBag.Proveedores = new SelectList((await suppliers.ListAsync()).Where(item => item.Activo), "Id", "Nombre");
}
