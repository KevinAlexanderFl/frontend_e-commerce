import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CrudService, Nuevo } from '../contracts/crud-service';
import { Entity } from '../models/entities';

export abstract class ApiCrudService<T extends Entity> implements CrudService<T> {
  protected readonly url: string;
  protected constructor(protected readonly http: HttpClient, recurso: string) {
    this.url = `${environment.apiUrl}/${recurso}`;
  }
  obtenerTodos(): Observable<T[]> { return this.http.get<T[]>(this.url); }
  obtenerPorId(id: number): Observable<T> { return this.http.get<T>(`${this.url}/${id}`); }
  crear(registro: Nuevo<T>): Observable<T> { return this.http.post<T>(this.url, registro); }
  actualizar(registro: T): Observable<void> { return this.http.put<void>(`${this.url}/${registro.id}`, registro); }
  eliminar(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
