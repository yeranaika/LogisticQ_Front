import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceHistoryService {
  private apiUrl = 'http://localhost:3500/api/HistorialPrecios'; // URL base para el historial de precios

  constructor(private http: HttpClient) { }

  // Obtener todo el historial de precios
  getAllPriceHistory(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(`${this.apiUrl}/priceHistory`, httpOptions);
  }

  // Obtener el historial de precios por producto
  getPriceHistoryByProduct(data: any, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(`${this.apiUrl}/priceHistoryByProduct`, data, httpOptions);
  }
  getAllProducts(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(`http://localhost:3500/api/productos/getall`, httpOptions);
  }
  getAllPredictions(headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(`http://localhost:3500/api/prediccion/getAllPredictions`, httpOptions);
  }

  public getPredictionsByProduct(data: any, headers: any = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(`http://localhost:3500/api/prediccion/getPredictionsByProduct`, data, httpOptions);
  }

}
