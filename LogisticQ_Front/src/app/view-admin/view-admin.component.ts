import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ProductoComponent } from '../producto/producto.component';
import { InventarioComponent } from '../inventario/inventario.component'; // Importa InventarioComponent

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
    ProductoComponent,
    InventarioComponent // Asegúrate de incluir InventarioComponent aquí
  ]
})
export class ViewAdminComponent {
  @ViewChild(UsuariosComponent) usuariosComponent!: UsuariosComponent;
  @ViewChild(ProductoComponent) productoComponent!: ProductoComponent;
  @ViewChild(InventarioComponent) inventarioComponent!: InventarioComponent;

  mostrarInventario: boolean = false;
  mostrarUsuarios: boolean = false;
  mostrarProductos: boolean = false;

  constructor() {}

  verInventario() {
    this.mostrarInventario = true;
    this.mostrarUsuarios = false;
    this.mostrarProductos = false;

    // Llama a obtener inventario si es necesario
    if (this.inventarioComponent) {
      this.inventarioComponent.cargarInventario();
    }
  }

  verUsuarios() {
    this.mostrarUsuarios = true;
    this.mostrarInventario = false;
    this.mostrarProductos = false;

    if (this.usuariosComponent) {
      this.usuariosComponent.obtenerUsuarios();
    }
  }

  verProductos() {
    this.mostrarProductos = true;
    this.mostrarInventario = false;
    this.mostrarUsuarios = false;

    if (this.productoComponent) {
      this.productoComponent.obtenerProductos();
    }
  }
}
