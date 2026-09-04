using System.ComponentModel.DataAnnotations;

namespace Ecommerce_SOLID.Models;

public class Proveedor : IEntity
{
    public int Id { get; set; }
    [Required, StringLength(120)] public string Nombre { get; set; } = string.Empty;
    [Required, StringLength(13)] public string Ruc { get; set; } = string.Empty;
    [Required, StringLength(100)] public string Contacto { get; set; } = string.Empty;
    [Required, Phone, StringLength(20)] public string Telefono { get; set; } = string.Empty;
    [Required, EmailAddress, StringLength(120)] public string Email { get; set; } = string.Empty;
    [Required, StringLength(60)] public string Categoria { get; set; } = string.Empty;
    public bool Activo { get; set; } = true;
    public ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
