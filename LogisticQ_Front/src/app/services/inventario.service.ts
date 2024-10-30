import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa map
import { Inventario } from '../model/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:3500/api/inventario';

  constructor(private http: HttpClient) {}

  obtenerInventario(): Observable<Inventario[]> {
    return this.http.get<{ message: string; inventario: Inventario[] }>(`${this.apiUrl}/getAll`)
      .pipe(map(response => response.inventario)); // Extrae solo el array de inventario
  }
  
  actualizarInventario(inventario: Inventario): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, inventario);
  }
}
