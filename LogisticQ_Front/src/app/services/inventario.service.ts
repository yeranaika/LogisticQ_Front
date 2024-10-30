import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inventario } from '../model/inventario.model';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar AuthService

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:3500/api/inventario';

  constructor(private http: HttpClient, private authService: AuthService) {} // Inyecta AuthService

  obtenerInventario(): Observable<Inventario[]> {
    const token = this.authService.getToken(); // Obtén el token desde AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ message: string; inventario: Inventario[] }>(
      `${this.apiUrl}/getAll`, { headers }
    ).pipe(
      map(response => response.inventario)
    );
  }

  actualizarInventario(inventario: Inventario): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/update`, inventario, { headers });
  }
}
