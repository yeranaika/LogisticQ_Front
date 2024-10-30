import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { PriceHistoryService } from '../services/price-history.service';
import { AuthService } from '../services/auth.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-precios',
  standalone: true,
  templateUrl: './historial-precios.component.html',
  styleUrls: ['./historial-precios.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    HighchartsChartModule
  ]
})
export class HistorialPreciosComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  productos: any[] = [];
  idProducto: number | null = null;
  nombreProducto: string = ''; // New property for product name

  constructor(
    private priceHistoryService: PriceHistoryService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Forzar la detección de cambios
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    this.priceHistoryService.getAllProducts(headers).subscribe(
      (response: any) => {
        if (response && response.productos) {
          this.productos = response.productos;
        }
      },
      (error: any) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  cargarHistorialPrecios(): void {
    if (!this.idProducto) {
      alert('Por favor, selecciona un producto.');
      return;
    }

    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    const requestBody = {
      idProducto: this.idProducto,
    };
    console.log("🚀 ~ HistorialPreciosComponent ~ cargarHistorialPrecios ~ requestBody.idProducto:", requestBody.idProducto)
    const selectedProduct = this.productos.find((p: any) => p.id === this.idProducto);
    this.nombreProducto = selectedProduct ? selectedProduct.nombre : 'Producto desconocido';

    this.priceHistoryService.getPriceHistoryByProduct(requestBody, headers).subscribe(
      (response: any) => {
        if (response && response.historial && Array.isArray(response.historial) && response.historial.length > 0) {
          // Accediendo correctamente al historial
          let fechas = response.historial.map((h: any) => new Date(h.fecha_registro).toLocaleDateString());
          console.log("🚀 ~ HistorialPreciosComponent ~ cargarHistorialPrecios ~ fechas:", fechas);
          let precios = response.historial.map((h: any) => parseFloat(h.precio));
          console.log("🚀 ~ HistorialPreciosComponent ~ cargarHistorialPrecios ~ precios:", precios);

          // Invertir el orden de los datos para mostrar del más antiguo al más reciente
          fechas = fechas.reverse();
          precios = precios.reverse();

          this.renderChart(fechas, precios);
        } else {
          alert('No se encontró historial de precios para el producto seleccionado.');
        }
      },
      (error: any) => {
        console.error('Error al obtener el historial de precios:', error);
      }
    );
  }


  renderChart(fechas: string[], precios: number[]): void {
    this.chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: `Historial de Precios del Producto: ${this.nombreProducto}`,
      },
      xAxis: {
        categories: fechas,
        title: {
          text: 'Fechas',
        },
      },
      yAxis: {
        title: {
          text: 'Precio',
        },
        min: 0,
      },
      series: [
        {
          name: 'Precio',
          type: 'line',
          data: precios,
          color: '#3f51b5',
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }
}
