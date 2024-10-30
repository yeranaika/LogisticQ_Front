import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../services/inventario.service';
import { AuthService } from '../services/auth.service';
import { Inventario } from '../model/inventario.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  vistaActual: string = 'verInventario'; // Propiedad para controlar la vista actual
  inventario: Inventario[] = [];
  inventarioFiltrado: Inventario[] = [];
  inventarioSeleccionado?: Inventario;
  filtro: string = '';

  constructor(private inventarioService: InventarioService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cambiarVista(vista: string): void {
    this.vistaActual = vista;
    if (vista === 'verInventario') {
      this.cargarInventario();
    }
  }

  cargarInventario(): void {
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : ''
    };

    this.inventarioService.obtenerInventario(headers).subscribe(
      (response: any) => {
        if (response.inventario && response.inventario.length > 0) {
          this.inventario = response.inventario;
          this.inventarioFiltrado = response.inventario; // Inicializa el inventario filtrado
        } else {
          console.error('No se encontró inventario');
        }
      },
      (error: any) => {
        console.error('Error al obtener el inventario:', error);
      }
    );
  }

  filtrarInventario(): void {
    const filtroLowerCase = this.filtro.toLowerCase();
    this.inventarioFiltrado = this.inventario.filter(item =>
      item.producto.codigoSAP.toLowerCase().includes(filtroLowerCase) ||
      item.producto.nombre.toLowerCase().includes(filtroLowerCase)
    );
  }

  editarInventario(item: Inventario): void {
    this.inventarioSeleccionado = { ...item };
  }

  guardarCambios(): void {
    if (this.inventarioSeleccionado) {
      const token = this.authService.getToken();
      const headers = {
        'x-access-token': token ? token : ''
      };

      this.inventarioService.actualizarInventario(this.inventarioSeleccionado, headers).subscribe(
        (response: any) => {
          alert('Inventario actualizado exitosamente');
          this.cargarInventario(); // Refresca la lista después de actualizar
          this.inventarioSeleccionado = undefined; // Limpia el formulario de edición
        },
        (error: any) => {
          console.error('Error al actualizar el inventario:', error);
          alert('Error al actualizar el inventario');
        }
      );
    }
  }
}
