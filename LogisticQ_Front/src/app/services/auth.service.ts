import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3500/api/usuarios/login';

  constructor(private http: HttpClient, private router: Router) {}

  // Método para iniciar sesión y obtener el token
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  // Guardar el token en el localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    console.log('Token almacenado en localStorage:', token);
  }

  // Obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Eliminar el token (para cerrar sesión)
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
