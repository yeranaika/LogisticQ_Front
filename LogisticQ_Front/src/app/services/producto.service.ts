// producto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3500/api/productos'; // URL de tu API

  constructor(private http: HttpClient) {}

  getAllProductos(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(`${this.apiUrl}/getAll`, httpOptions);
  }

  createProducto(producto: any, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(`${this.apiUrl}/create`, producto, httpOptions);
  }

  // Método para activar un producto
  activateProducto(idProducto: number, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(`${this.apiUrl}/activate`, { idProducto }, httpOptions);
  }

  // Método para desactivar un producto
  deactivateProducto(idProducto: number, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(`${this.apiUrl}/deactivate`, { idProducto }, httpOptions);
  }

  // Método para eliminar un producto
  deleteProducto(idProducto: number, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.delete(`${this.apiUrl}/delete`, {
      headers: httpOptions.headers,
      body: { idProducto }
    });
  }

  // Método para actualizar un producto
  updateProducto(producto: any, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.put(`${this.apiUrl}/update`, producto, httpOptions);
  }
}
