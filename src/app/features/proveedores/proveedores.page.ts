import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Proveedor } from '../../core/models/entities';
import { ProveedorService } from '../../core/services/entity-services';
import { mensajeError } from '../../shared/utils/formatters';

const vacio = (): Omit<Proveedor, 'id'> => ({ nombre: '', ruc: '', contacto: '', telefono: '',
  email: '', categoria: 'Tecnología', estado: 'Activo' });

@Component({ selector: 'app-proveedores', imports: [FormsModule], templateUrl: './proveedores.page.html' })
export class ProveedoresPage {
  readonly registros = signal<Proveedor[]>([]); readonly consulta = signal(''); readonly cargando = signal(true);
  readonly mensaje = signal(''); readonly modal = signal(false); editandoId: number | null = null; formulario = vacio();
  readonly filtrados = computed(() => { const q = this.consulta().toLowerCase();
    return this.registros().filter(p => `${p.nombre} ${p.contacto} ${p.email} ${p.ruc}`.toLowerCase().includes(q)); });
  constructor(private readonly servicio: ProveedorService) { this.cargar(); }
  cargar(): void { this.cargando.set(true); this.mensaje.set(''); this.servicio.obtenerTodos().subscribe({
    next: d => { this.registros.set(d); this.cargando.set(false); }, error: e => { this.mensaje.set(mensajeError(e)); this.cargando.set(false); } }); }
  nuevo(): void { this.editandoId = null; this.formulario = vacio(); this.modal.set(true); }
  editar(item: Proveedor): void { this.editandoId = item.id; const { id: _, ...datos } = item; this.formulario = { ...datos }; this.modal.set(true); }
  guardar(): void { const p: Observable<unknown> = this.editandoId === null ? this.servicio.crear(this.formulario) : this.servicio.actualizar({ ...this.formulario, id: this.editandoId });
    p.subscribe({ next: () => { this.modal.set(false); this.cargar(); }, error: e => this.mensaje.set(mensajeError(e)) }); }
  eliminar(id: number): void { if (!confirm('¿Desea eliminar este proveedor?')) return; this.servicio.eliminar(id).subscribe({ next: () => this.cargar(), error: e => this.mensaje.set(mensajeError(e)) }); }
}
