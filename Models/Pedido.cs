using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_SOLID.Models;

public class Pedido : IEntity
{
    public int Id { get; set; }
    [Required, StringLength(20)] public string Numero { get; set; } = string.Empty;
    public DateTime Fecha { get; set; } = DateTime.Now;
    [Required, StringLength(20)] public string Estado { get; set; } = "Nuevo";
    [Column(TypeName = "decimal(10,2)")] public decimal Total { get; set; }
    public int ClienteId { get; set; }
    public Cliente? Cliente { get; set; }
    public ICollection<PedidoDetalle> Detalles { get; set; } = new List<PedidoDetalle>();
    public Pago? Pago { get; set; }
}
