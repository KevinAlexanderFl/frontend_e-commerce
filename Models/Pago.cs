using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce_SOLID.Models;

public class Pago : IEntity
{
    public int Id { get; set; }
    public int PedidoId { get; set; }
    public Pedido? Pedido { get; set; }
    [Required, StringLength(30)] public string Metodo { get; set; } = string.Empty;
    [Required, StringLength(30)] public string Estado { get; set; } = "Pendiente";
    [Required, StringLength(30)] public string Referencia { get; set; } = string.Empty;
    public DateTime Fecha { get; set; } = DateTime.Now;
    [Column(TypeName = "decimal(10,2)")] public decimal Monto { get; set; }
}
