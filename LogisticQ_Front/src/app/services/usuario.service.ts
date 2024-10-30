import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3500/api/usuarios';

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  obtenerRoles(): Observable<any> {
    return this.http.get('http://localhost:3500/api/roles/getAll');
  }
}
