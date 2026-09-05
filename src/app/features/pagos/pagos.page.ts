import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoPago, Pago } from '../../core/models/entities';
import { PagoService } from '../../core/services/entity-services';
import { dinero, fechaCorta, mensajeError } from '../../shared/utils/formatters';

@Component({ selector: 'app-pagos', imports: [FormsModule], templateUrl: './pagos.page.html' })
export class PagosPage {
  readonly registros = signal<Pago[]>([]); readonly consulta = signal(''); readonly cargando = signal(true); readonly mensaje = signal('');
  readonly dinero = dinero; readonly fechaCorta = fechaCorta; readonly estados: EstadoPago[] = ['Aprobado', 'Pendiente', 'Rechazado'];
  readonly aprobados = computed(() => this.registros().filter(p => p.estado === 'Aprobado').reduce((s,p) => s + p.monto, 0));
  readonly pendientes = computed(() => this.registros().filter(p => p.estado === 'Pendiente').reduce((s,p) => s + p.monto, 0));
  readonly filtrados = computed(() => { const q = this.consulta().toLowerCase(); return [...this.registros()].sort((a,b) => b.fecha.localeCompare(a.fecha)).filter(p => `${p.pedido} ${p.referencia} ${p.metodo} ${p.estado}`.toLowerCase().includes(q)); });
  constructor(private readonly servicio: PagoService) { this.cargar(); }
  cargar(): void { this.cargando.set(true); this.mensaje.set(''); this.servicio.obtenerTodos().subscribe({ next: d => { this.registros.set(d); this.cargando.set(false); }, error: e => { this.mensaje.set(mensajeError(e)); this.cargando.set(false); } }); }
  cambiar(item: Pago, estado: EstadoPago): void { this.servicio.cambiarEstado(item, estado).subscribe({ next: () => this.cargar(), error: e => this.mensaje.set(mensajeError(e)) }); }
}
