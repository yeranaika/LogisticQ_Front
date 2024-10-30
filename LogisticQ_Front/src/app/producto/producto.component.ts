import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductoService } from '../services/producto.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  standalone: true,
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
    nombre: '',
    categoria: '',
    precioCompra: 0,
    estado: 'activo',
    codigoSAP: ''
  };

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
        if (response.estado) {
          this.productos = response.productos;
          console.log('Productos obtenidos:', this.productos);
        }
      },
      (error: any) => {
        this.cargando = false;
        console.error('Error al obtener productos:', error);
      }
    );
  }

/*   registrarProducto() {
    console.log('Registrar Producto:', this.nuevoProducto);

    // Validar si el producto ya existe en la lista
    const productoExistente = this.productos.find(producto => producto.nombre === this.nuevoProducto.nombre);
    if (productoExistente) {
      alert('El producto ya existe. Por favor, elige otro nombre.');
      return;
    }

    // Obtener el token de autenticación
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    // Registrar el producto mediante la API
    this.productoService.registerProducto(this.nuevoProducto, headers).subscribe(
      (response: any) => {
        if (response.estado) {
          alert('Producto registrado exitosamente');
          this.nuevoProducto = { nombre: '', categoria: '', precioCompra: 0, estado: 'activo', codigoSAP: '' };
          this.cambiarVista('verProductos'); // Volver a la vista de productos
        } else {
          alert('Error al registrar el producto: ' + response.message);
        }
      },
      (error: any) => {
        console.error('Error al registrar producto:', error);
        alert('Ocurrió un error al registrar el producto');
      }
    );
  } */

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
          this.obtenerProductos(); // Actualizar la lista de productos después de eliminar
        } else {
          alert('Error al eliminar el producto: ' + response.message);
        }
      },
      (error: any) => {
        console.error('Error al eliminar producto:', error);
        alert('Ocurrió un error al eliminar el producto');
      }
    );
  }

  // Método para activar o desactivar el producto
  toggleProductoEstado(producto: any) {
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    if (producto.estado === 'activo') {
      // Si el producto está activo, desactivarlo
      this.productoService.deactivateProducto(producto.idProducto, headers).subscribe(
        (response: any) => {
          if (response.estado) {
            producto.estado = 'inactivo';
            console.log('Producto desactivado:', producto);
          } else {
            console.error('Error al desactivar el producto:', response.message);
          }
        },
        (error: any) => {
          console.error('Error al desactivar el producto:', error);
        }
      );
    } else {
      // Si el producto está inactivo, activarlo
      this.productoService.activateProducto(producto.idProducto, headers).subscribe(
        (response: any) => {
          if (response.estado) {
            producto.estado = 'activo';
            console.log('Producto activado:', producto);
          } else {
            console.error('Error al activar el producto:', response.message);
          }
        },
        (error: any) => {
          console.error('Error al activar el producto:', error);
        }
      );
    }
  }
}
