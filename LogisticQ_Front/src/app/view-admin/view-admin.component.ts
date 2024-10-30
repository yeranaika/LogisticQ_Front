import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UsuariosComponent } from '../usuarios/usuarios.component';

import { InventarioComponent } from '../inventario/inventario.component'; // Importar InventarioComponent
import { ProductoComponent } from '../producto/producto.component'; // Importar el componente de productos

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
    InventarioComponent,  // Añadir InventarioComponent aquí
    ProductoComponent  // Añadir ProductoComponent aquí
  ]
})
export class ViewAdminComponent {
  @ViewChild(UsuariosComponent) usuariosComponent!: UsuariosComponent;

  mostrarInventario: boolean = false;
  mostrarUsuarios: boolean = false;
  mostrarProducto: boolean = false;

  constructor() {}

  verInventario() {
    this.mostrarInventario = true;
    this.mostrarUsuarios = false;
    this.mostrarProducto = false;
  }

  verUsuarios() {
    this.mostrarUsuarios = true;
    this.mostrarInventario = false;
    this.mostrarProducto = false;

    // Llamar a la función de obtener usuarios cuando se muestra la vista de usuarios
    if (this.usuariosComponent) {
      this.usuariosComponent.obtenerUsuarios();
    }
  }

  verProductos() {
    this.mostrarProducto = true;
    this.mostrarInventario = false;
    this.mostrarUsuarios = false;
  }
}
