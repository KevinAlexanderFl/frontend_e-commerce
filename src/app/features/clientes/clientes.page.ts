import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cliente } from '../../core/models/entities';
import { ClienteService } from '../../core/services/entity-services';
import { mensajeError } from '../../shared/utils/formatters';

const vacio = (): Omit<Cliente, 'id'> => ({ nombres: '', apellidos: '', direccion: '', telefono: '',
  email: '', ruc: '', estado: 'Activo' });

@Component({ selector: 'app-clientes', imports: [FormsModule], templateUrl: './clientes.page.html' })
export class ClientesPage {
  readonly registros = signal<Cliente[]>([]);
  readonly consulta = signal('');
  readonly cargando = signal(true);
  readonly mensaje = signal('');
  readonly modal = signal(false);
  editandoId: number | null = null;
  formulario = vacio();
  readonly filtrados = computed(() => {
    const q = this.consulta().toLowerCase();
    return this.registros().filter(c => `${c.nombres} ${c.apellidos} ${c.email} ${c.ruc}`.toLowerCase().includes(q));
  });

  constructor(private readonly servicio: ClienteService) { this.cargar(); }
  cargar(): void {
    this.cargando.set(true); this.mensaje.set('');
    this.servicio.obtenerTodos().subscribe({ next: datos => { this.registros.set(datos); this.cargando.set(false); },
      error: e => { this.mensaje.set(mensajeError(e)); this.cargando.set(false); } });
  }
  nuevo(): void { this.editandoId = null; this.formulario = vacio(); this.modal.set(true); }
  editar(cliente: Cliente): void {
    this.editandoId = cliente.id; const { id: _, ...datos } = cliente; this.formulario = { ...datos }; this.modal.set(true);
  }
  guardar(): void {
    const peticion: Observable<unknown> = this.editandoId === null ? this.servicio.crear(this.formulario)
      : this.servicio.actualizar({ ...this.formulario, id: this.editandoId });
    peticion.subscribe({ next: () => { this.modal.set(false); this.cargar(); }, error: e => this.mensaje.set(mensajeError(e)) });
  }
  eliminar(id: number): void {
    if (!confirm('¿Desea eliminar este cliente?')) return;
    this.servicio.eliminar(id).subscribe({ next: () => this.cargar(), error: e => this.mensaje.set(mensajeError(e)) });
  }
}
