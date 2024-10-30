import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  private apiUrl = 'http://localhost:3500/api/bitacora';

  constructor(private http: HttpClient) {}

  obtenerBitacora(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Asegúrate de que el token esté almacenado
    const headers = new HttpHeaders({
      'x-access-token': token || ''
    });

    return this.http.get(`${this.apiUrl}/getAll`, { headers });
  }
}
