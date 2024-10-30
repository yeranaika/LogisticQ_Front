import { Component, OnInit } from '@angular/core';
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
export class ProductoComponent implements OnInit {
  vistaActual: string = 'verProductos';
  productos: any[] = [];
  productosFiltrados: any[] = [];
  cargando: boolean = false;
  filtro: string = '';

  nuevoProducto = {
    codigoSAP: '',
    nombre: '',
    categoria: '',
    precioCompra: 0,
    estado: 'activo',
    cantidadDisponible: 0,
    nivelMinimo: 0
  };

  productoSeleccionado: any = null;

  constructor(
    private productoService: ProductoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos(); // Cargar productos al inicializar el componente
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
    if (vista === 'verProductos') {
      this.obtenerProductos(); // Refrescar productos cuando se cambia a la vista de "Ver Productos"
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
          this.productos = response.productos.map((producto: any) => ({
            ...producto,
            precioCompra: Math.round(producto.precioCompra) // Redondear el precio de compra a un entero
          }));
          this.productosFiltrados = [...this.productos]; // Inicializa los productosFiltrados con todos los registros
        }
      },
      (error: any) => {
        this.cargando = false;
        console.error('Error al obtener productos:', error);
      }
    );
  }

  agregarProducto(productoForm: any) {
    if (productoForm.invalid) {
      alert('Por favor, completa todos los campos obligatorios antes de continuar.');
      return;
    }

    this.nuevoProducto.precioCompra = Math.round(this.nuevoProducto.precioCompra); // Redondear el precio antes de agregar

    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    this.productoService.createProducto(this.nuevoProducto, headers).subscribe(
      (response: any) => {
        if (response?.estado) {
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
        } else {
          alert('Ocurrió un error al agregar el producto: ' + (response.message || 'Respuesta no esperada'));
        }
      },
      (error: any) => {
        console.error('Error al agregar producto:', error);
        alert('Ocurrió un error al agregar el producto');
      }
    );
  }

  prepararProductoModificar(producto: any) {
    this.productoSeleccionado = { ...producto };
    this.cambiarVista('modificarProducto');
  }

  modificarProducto(productoModificarForm: any) {
    if (productoModificarForm.invalid) {
      alert('Por favor, completa todos los campos obligatorios antes de continuar.');
      return;
    }

    this.productoSeleccionado.precioCompra = Math.round(this.productoSeleccionado.precioCompra); // Redondear el precio antes de modificar

    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    this.productoService.updateProducto(this.productoSeleccionado, headers).subscribe(
      (response: any) => {
        if (response?.estado) {
          alert('Producto modificado exitosamente');
          this.cambiarVista('verProductos');
          this.obtenerProductos();
        } else {
          alert('Error al modificar el producto: ' + (response.message || 'Respuesta no esperada'));
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
        if (response?.estado) {
          alert('Producto eliminado exitosamente');
          this.obtenerProductos();
        } else {
          alert('Error al eliminar el producto: ' + (response.message || 'Respuesta no esperada'));
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
          if (response?.estado) {
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
          if (response?.estado) {
            producto.estado = 'activo';
          }
        },
        (error: any) => {
          console.error('Error al activar el producto:', error);
        }
      );
    }
  }

  filtrarProductos(): void {
    const filtroLowerCase = this.filtro.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto => {
      const codigoSAP = producto.codigoSAP ? producto.codigoSAP.toLowerCase() : '';
      const nombre = producto.nombre ? producto.nombre.toLowerCase() : '';
      const categoria = producto.categoria ? producto.categoria.toLowerCase() : '';
      const estado = producto.estado ? producto.estado.toLowerCase() : '';

      return (
        codigoSAP.includes(filtroLowerCase) ||
        nombre.includes(filtroLowerCase) ||
        categoria.includes(filtroLowerCase) ||
        estado.includes(filtroLowerCase)
      );
    });
  }

  trackByProductoId(index: number, producto: any): number {
    return producto.idProducto;
  }
}
