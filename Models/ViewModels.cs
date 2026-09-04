using System.ComponentModel.DataAnnotations;

namespace Ecommerce_SOLID.Models;

public class DashboardViewModel
{
    public int Clientes { get; set; }
    public int Proveedores { get; set; }
    public int Productos { get; set; }
    public int Pedidos { get; set; }
    public decimal Ingresos { get; set; }
    public List<Producto> StockBajo { get; set; } = [];
    public List<Pedido> PedidosRecientes { get; set; } = [];
}

public class CarritoViewModel
{
    public List<CarritoItem> Items { get; set; } = [];
    public List<Producto> Productos { get; set; } = [];
    public List<Cliente> Clientes { get; set; } = [];
    public decimal Total => Items.Sum(item => item.Subtotal);
}

public class CheckoutViewModel
{
    [Required(ErrorMessage = "Seleccione un cliente.")]
    public int ClienteId { get; set; }

    [Required(ErrorMessage = "Seleccione un método de pago.")]
    public string MetodoPago { get; set; } = "Tarjeta";
}

public class ErrorViewModel
{
    public string? RequestId { get; set; }
    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
}
