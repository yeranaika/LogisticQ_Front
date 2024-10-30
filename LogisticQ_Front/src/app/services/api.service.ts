import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3500/api'; // URL de tu API

  constructor(private http: HttpClient) { } // HttpClient inyectado aquí

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/login`, { email, password });
  }

  getAllUsers(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(`${this.apiUrl}/usuarios/getAll`, httpOptions);
  }

  registerUser(usuario: any, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(`${this.apiUrl}/usuarios/register`, usuario, httpOptions);
  }

  getAllRoles(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(`${this.apiUrl}/roles/getAll`, httpOptions);
  }

  deleteUser(id: number, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.delete(`${this.apiUrl}/usuarios/deleteUser`, {
      headers: httpOptions.headers,
      body: { id }
    });
  }
  activateUser(id: number, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(`${this.apiUrl}/usuarios/activate`, { id }, httpOptions);
  }

  deactivateUser(id: number, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(`${this.apiUrl}/usuarios/deactivate`, { id }, httpOptions);
  }
  //---------------------Productos----------------------------
  getAllProductos(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    console.log('Enviando solicitud para obtener productos con headers:', headers);
    return this.http.get(`${this.apiUrl}/getAll`, httpOptions);
  }

}
