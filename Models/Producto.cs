using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_SOLID.Models;

public class Producto : IEntity
{
    public int Id { get; set; }
    [Required, StringLength(20)] public string Codigo { get; set; } = string.Empty;
    [Required, StringLength(120)] public string Nombre { get; set; } = string.Empty;
    [Required, StringLength(60)] public string Categoria { get; set; } = string.Empty;
    [Range(0, int.MaxValue)] public int Stock { get; set; }
    [Range(0, int.MaxValue)] public int StockMinimo { get; set; } = 5;
    [Column(TypeName = "decimal(10,2)"), Range(0.01, 999999)] public decimal Precio { get; set; }
    public bool Activo { get; set; } = true;
    [Display(Name = "Proveedor"), Range(1, int.MaxValue, ErrorMessage = "Seleccione un proveedor.")] public int ProveedorId { get; set; }
    public Proveedor? Proveedor { get; set; }
}
