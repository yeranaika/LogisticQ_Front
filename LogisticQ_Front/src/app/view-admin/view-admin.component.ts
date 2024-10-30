import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ProductoComponent } from '../producto/producto.component';
import { InventarioComponent } from '../inventario/inventario.component';
import { BitacoraComponent } from '../bitacora/bitacora.component';

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
    InventarioComponent,
    BitacoraComponent
  ]
})
export class ViewAdminComponent {
  @ViewChild(UsuariosComponent) usuariosComponent!: UsuariosComponent;
  @ViewChild(ProductoComponent) productoComponent!: ProductoComponent;
  @ViewChild(InventarioComponent) inventarioComponent!: InventarioComponent;
  @ViewChild(BitacoraComponent) bitacoraComponent!: BitacoraComponent;

  mostrarInventario: boolean = false;
  mostrarUsuarios: boolean = false;
  mostrarProductos: boolean = false;
  mostrarBitacora: boolean = false;

  constructor() {}

  verInventario() {
    this.mostrarInventario = true;
    this.mostrarUsuarios = false;
    this.mostrarProductos = false;
    this.mostrarBitacora = false;
  }

  verUsuarios() {
    this.mostrarUsuarios = true;
    this.mostrarInventario = false;
    this.mostrarProductos = false;
    this.mostrarBitacora = false;
  }

  verProductos() {
    this.mostrarProductos = true;
    this.mostrarInventario = false;
    this.mostrarUsuarios = false;
    this.mostrarBitacora = false;
  }

  verBitacora() {
    this.mostrarBitacora = true;
    this.mostrarInventario = false;
    this.mostrarUsuarios = false;
    this.mostrarProductos = false;
  }
}
