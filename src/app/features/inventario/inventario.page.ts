import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto, Proveedor } from '../../core/models/entities';
import { InventarioService, ProveedorService } from '../../core/services/entity-services';
import { dinero, mensajeError } from '../../shared/utils/formatters';

const vacio = (): Omit<Producto, 'id'> => ({ codigo: '', nombre: '', categoria: 'Tecnología', stock: 0,
  stockMinimo: 5, precio: 0, proveedorId: 0, estado: 'Disponible' });

@Component({ selector: 'app-inventario', imports: [FormsModule], templateUrl: './inventario.page.html' })
export class InventarioPage {
  readonly registros = signal<Producto[]>([]); readonly proveedores = signal<Proveedor[]>([]); readonly consulta = signal('');
  readonly cargando = signal(true); readonly mensaje = signal(''); readonly modal = signal(false); readonly dinero = dinero;
  editandoId: number | null = null; formulario = vacio();
  readonly filtrados = computed(() => { const q = this.consulta().toLowerCase(); return this.registros().filter(p => `${p.codigo} ${p.nombre} ${p.categoria}`.toLowerCase().includes(q)); });
  constructor(private readonly servicio: InventarioService, private readonly proveedorService: ProveedorService) { this.cargar(); }
  cargar(): void { this.cargando.set(true); this.mensaje.set(''); this.servicio.obtenerTodos().subscribe({ next: d => { this.registros.set(d); this.cargando.set(false); }, error: e => { this.mensaje.set(mensajeError(e)); this.cargando.set(false); } }); }
  cargarProveedores(continuar: () => void): void { this.proveedorService.obtenerTodos().subscribe({ next: d => { this.proveedores.set(d); continuar(); }, error: e => this.mensaje.set(mensajeError(e)) }); }
  nuevo(): void { this.cargarProveedores(() => { this.editandoId = null; this.formulario = { ...vacio(), proveedorId: this.proveedores()[0]?.id ?? 0 }; this.modal.set(true); }); }
  editar(item: Producto): void { this.cargarProveedores(() => { this.editandoId = item.id; const { id: _, ...datos } = item; this.formulario = { ...datos }; this.modal.set(true); }); }
  guardar(): void { const datos = { ...this.formulario, estado: this.formulario.stock === 0 ? 'Agotado' as const : 'Disponible' as const };
    const p: Observable<unknown> = this.editandoId === null ? this.servicio.crear(datos) : this.servicio.actualizar({ ...datos, id: this.editandoId });
    p.subscribe({ next: () => { this.modal.set(false); this.cargar(); }, error: e => this.mensaje.set(mensajeError(e)) }); }
  eliminar(id: number): void { if (!confirm('¿Desea eliminar este producto?')) return; this.servicio.eliminar(id).subscribe({ next: () => this.cargar(), error: e => this.mensaje.set(mensajeError(e)) }); }
}
