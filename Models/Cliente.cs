using System.ComponentModel.DataAnnotations;

namespace Ecommerce_SOLID.Models;

public class Cliente : IEntity
{
    public int Id { get; set; }

    [Required, StringLength(80)]
    public string Nombres { get; set; } = string.Empty;

    [Required, StringLength(80)]
    public string Apellidos { get; set; } = string.Empty;

    [Required, StringLength(180)]
    public string Direccion { get; set; } = string.Empty;

    [Required, Phone, StringLength(20)]
    public string Telefono { get; set; } = string.Empty;

    [Required, EmailAddress, StringLength(120)]
    public string Email { get; set; } = string.Empty;

    [Required, StringLength(13, MinimumLength = 10)]
    public string Ruc { get; set; } = string.Empty;

    public bool Activo { get; set; } = true;
}
