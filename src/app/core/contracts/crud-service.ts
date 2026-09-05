import { Observable } from 'rxjs';
import { Entity } from '../models/entities';

export type Nuevo<T extends Entity> = Omit<T, 'id'>;
export interface CrudService<T extends Entity> {
  obtenerTodos(): Observable<T[]>;
  obtenerPorId(id: number): Observable<T>;
  crear(registro: Nuevo<T>): Observable<T>;
  actualizar(registro: T): Observable<void>;
  eliminar(id: number): Observable<void>;
}
