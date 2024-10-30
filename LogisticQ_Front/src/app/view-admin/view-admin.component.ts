import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-view-admin',
  standalone: true,
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    UsuariosComponent,
    ProductoComponent // Asegurarse de importar el componente Producto
  ]
})
export class ViewAdminComponent {
  @ViewChild(UsuariosComponent) usuariosComponent!: UsuariosComponent;
  @ViewChild(ProductoComponent) productoComponent!: ProductoComponent;

  mostrarInventario: boolean = false;
  mostrarUsuarios: boolean = false;
  mostrarProductos: boolean = false;

  constructor() {}

  verInventario() {
    this.mostrarInventario = true;
    this.mostrarUsuarios = false;
    this.mostrarProductos = false;
  }

  verUsuarios() {
    this.mostrarUsuarios = true;
    this.mostrarInventario = false;
    this.mostrarProductos = false;

    // Llamar a la función de obtener usuarios cuando se muestra la vista de usuarios
    if (this.usuariosComponent) {
      this.usuariosComponent.obtenerUsuarios();
    }
  }

  verProductos() {
    this.mostrarProductos = true;
    this.mostrarInventario = false;
    this.mostrarUsuarios = false;

    // Llamar a la función de obtener productos cuando se muestra la vista de productos
    if (this.productoComponent) {
      this.productoComponent.obtenerProductos();
    }
  }
}
