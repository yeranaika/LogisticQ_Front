import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inventario } from '../model/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:3500/api/inventario';

  constructor(private http: HttpClient) {}

  obtenerInventario(headers: any = {}): Observable<Inventario[]> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };

    return this.http.get<{ message: string; inventario: Inventario[] }>(
      `${this.apiUrl}/getAll`, httpOptions
    ).pipe(
      map(response => response.inventario)
    );
  }

  actualizarInventario(inventario: Inventario, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };

    return this.http.put(`${this.apiUrl}/update`, inventario, httpOptions);
  }
}
