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
  predicciones: any[] = [];
  prediccionChartOptions: Highcharts.Options = {};

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

    // Buscar el producto seleccionado correctamente usando idProducto
    const selectedProduct = this.productos.find((p: any) => p.idProducto === this.idProducto);
    this.nombreProducto = selectedProduct ? selectedProduct.nombre : 'Producto desconocido';

    this.priceHistoryService.getPriceHistoryByProduct(requestBody, headers).subscribe(
      (response: any) => {
        if (response && response.historial && Array.isArray(response.historial) && response.historial.length > 0) {
          let fechas = response.historial.map((h: any) => new Date(h.fecha_registro).toLocaleDateString());
          let precios = response.historial.map((h: any) => Math.round(parseFloat(h.precio))); // Redondear a entero

          // Mostrar los datos en su orden original (del más antiguo al más reciente)
          this.renderChart(fechas, precios);

          // Cargar predicciones después de cargar el historial de precios
          this.cargarPredicciones();
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
          text: 'Precio (CLP)',
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

  cargarPredicciones(): void {
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

    this.priceHistoryService.getPredictionsByProduct(requestBody, headers).subscribe(
      (response: any) => {
        if (response?.predicciones?.length > 0) {
          this.predicciones = response.predicciones;

          // Procesar las predicciones para el gráfico
          let fechas = response.predicciones.map((p: any) => new Date(p.fecha_prediccion).toLocaleDateString());
          let preciosBrown = response.predicciones
            .filter((p: any) => p.metodo === 'Brown')
            .map((p: any) => Math.round(parseFloat(p.precioPredicho))); // Redondear a entero
          let preciosHolt = response.predicciones
            .filter((p: any) => p.metodo === 'Holt')
            .map((p: any) => Math.round(parseFloat(p.precioPredicho))); // Redondear a entero

          // Renderizar el gráfico con los datos disponibles
          this.renderPrediccionChart(fechas, preciosBrown, preciosHolt);
        } else {
          alert('No se encontraron predicciones para el producto seleccionado.');
        }
      },
      (error: any) => {
        console.error('Error al obtener las predicciones:', error);
      }
    );
  }

  renderPrediccionChart(fechas: string[], preciosBrown: number[], preciosHolt: number[]): void {
    // Inicializar un array de series vacío
    const series: Highcharts.SeriesOptionsType[] = [];

    // Añadir el método Brown si existen datos
    if (preciosBrown.length > 0) {
      series.push({
        name: 'Método Brown',
        type: 'line',
        data: preciosBrown,
        color: '#f57c00',
      } as Highcharts.SeriesLineOptions);
    }

    // Añadir el método Holt solo si hay suficientes datos (al menos dos puntos)
    if (preciosHolt.length > 0) {
      series.push({
        name: 'Método Holt',
        type: 'line',
        data: preciosHolt,
        color: '#4caf50',
      } as Highcharts.SeriesLineOptions);
    }

    // Actualizar las opciones del gráfico con las nuevas series
    this.prediccionChartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: `Predicciones de Precios del Producto: ${this.nombreProducto}`,
      },
      xAxis: {
        categories: fechas,
        title: {
          text: 'Fechas',
        },
      },
      yAxis: {
        title: {
          text: 'Precio Predicho (CLP)',
        },
        min: 0,
      },
      series: series,
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

    // Forzar la detección de cambios para asegurarse de que el gráfico se actualiza correctamente
    this.cdr.detectChanges();
  }
}
