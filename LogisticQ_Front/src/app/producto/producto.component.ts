import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductoService } from '../services/producto.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
  ],
})
export class ProductoComponent {
  vistaActual: string = 'verProductos';
  productos: any[] = [];
  cargando: boolean = false;

  nuevoProducto = {
    codigoSAP: '',
    nombre: '',
    categoria: '',
    precioCompra: 0,
    estado: 'activo',
    cantidadDisponible: 0,
    nivelMinimo: 0
  };

  productoSeleccionado: any = null;  // Producto seleccionado para modificar

  constructor(
    private productoService: ProductoService,
    private authService: AuthService
  ) {}

  cambiarVista(vista: string) {
    this.vistaActual = vista;
    if (vista === 'verProductos') {
      this.obtenerProductos();
    }
  }

  obtenerProductos() {
    this.cargando = true;
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    this.productoService.getAllProductos(headers).subscribe(
      (response: any) => {
        this.cargando = false;
        if (response.productos && response.productos.length > 0) {
          this.productos = response.productos;
        }
      },
      (error: any) => {
        this.cargando = false;
        console.error('Error al obtener productos:', error);
      }
    );
  }

  agregarProducto() {
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    this.productoService.createProducto(this.nuevoProducto, headers).subscribe(
      (response: any) => {
        console.log('Respuesta de la API al agregar producto:', response);
        if (response.message && response.message.toLowerCase().includes('creado exitosamente')) {
          alert('Producto agregado exitosamente');
          this.nuevoProducto = {
            codigoSAP: '',
            nombre: '',
            categoria: '',
            precioCompra: 0,
            estado: 'activo',
            cantidadDisponible: 0,
            nivelMinimo: 0
          };
          this.cambiarVista('verProductos');
          this.obtenerProductos();
        }
      },
      (error: any) => {
        console.error('Error al agregar producto:', error);
        alert('Ocurrió un error al agregar el producto');
      }
    );
  }

  prepararProductoModificar(producto: any) {
    this.productoSeleccionado = { ...producto };  // Copia el producto para modificarlo
    this.cambiarVista('modificarProducto');       // Cambia a la vista de modificación
  }

  modificarProducto() {
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    this.productoService.updateProducto(this.productoSeleccionado, headers).subscribe(
      (response: any) => {
        if (response.estado) {
          alert('Producto modificado exitosamente');
          this.cambiarVista('verProductos');
          this.obtenerProductos();
        } else {
          alert('Error al modificar el producto: ' + response.message);
        }
      },
      (error: any) => {
        console.error('Error al modificar el producto:', error);
        alert('Ocurrió un error al modificar el producto');
      }
    );
  }

  eliminarProducto(idProducto: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    this.productoService.deleteProducto(idProducto, headers).subscribe(
      (response: any) => {
        if (response.estado) {
          alert('Producto eliminado exitosamente');
          this.productos = this.productos.filter(producto => producto.idProducto !== idProducto);
        } else {
          alert('Error al eliminar el producto: ' + response.message);
        }
      },
      (error: any) => {
        console.error('Error al eliminar el producto:', error);
        alert('Ocurrió un error al eliminar el producto');
      }
    );
  }

  toggleProductoEstado(producto: any) {
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    if (producto.estado === 'activo') {
      this.productoService.deactivateProducto(producto.idProducto, headers).subscribe(
        (response: any) => {
          if (response.estado) {
            producto.estado = 'inactivo';
          }
        },
        (error: any) => {
          console.error('Error al desactivar el producto:', error);
        }
      );
    } else {
      this.productoService.activateProducto(producto.idProducto, headers).subscribe(
        (response: any) => {
          if (response.estado) {
            producto.estado = 'activo';
          }
        },
        (error: any) => {
          console.error('Error al activar el producto:', error);
        }
      );
    }
  }

  trackByProductoId(index: number, producto: any): number {
    return producto.idProducto;
  }
}
