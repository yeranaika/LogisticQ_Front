import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../model/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:3500/api/inventario'; // URL de la API del inventario

  constructor(private http: HttpClient) {}

  obtenerInventario(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(`${this.apiUrl}/getAll`, httpOptions);
  }

  actualizarInventario(inventario: any, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.put(`${this.apiUrl}/update`, inventario, httpOptions);
  }
}
