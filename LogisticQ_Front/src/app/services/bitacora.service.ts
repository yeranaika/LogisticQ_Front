import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  private apiUrl = 'http://localhost:3500/api/bitacora'; // URL base de la API de Bitácora

  constructor(private http: HttpClient) { }

  // Método para obtener todas las entradas de la bitácora
  obtenerBitacora(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(`${this.apiUrl}/getAll`, httpOptions);
  }
  // Método para filtrar las entradas de la bitácora (ejemplo de filtrado por usuario o acción)
  filtrarBitacora(filtro: any, headers: any = {}): Observable<any> {
    const token = localStorage.getItem('authToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token || '',
        ...headers
      })
    };
    return this.http.post(`${this.apiUrl}/filter`, filtro, httpOptions);
  }
}
