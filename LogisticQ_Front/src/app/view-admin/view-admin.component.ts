import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';  // Importa MatSidenavModule
import { MatListModule } from '@angular/material/list';  // Importa MatListModule para el nav list
import { MatIconModule } from '@angular/material/icon';  // Importa MatIconModule para el icono
import { UsuariosComponent } from '../usuarios/usuarios.component'; // Importar el componente de usuarios

@Component({
  selector: 'app-view-admin',
  standalone: true,
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,  // Añadir MatSidenavModule aquí
    MatListModule,     // Añadir MatListModule aquí
    MatIconModule,
    UsuariosComponent      // Añadir UsuariosComponent aquí
  ]
})
export class ViewAdminComponent {
  @ViewChild(UsuariosComponent) usuariosComponent!: UsuariosComponent;

  mostrarInventario: boolean = false;
  mostrarUsuarios: boolean = false;

  constructor() {}

  verInventario() {
    this.mostrarInventario = true;
    this.mostrarUsuarios = false;
  }

  verUsuarios() {
    this.mostrarUsuarios = true;
    this.mostrarInventario = false;

    // Llamar a la función de obtener usuarios cuando se muestra la vista de usuarios
    if (this.usuariosComponent) {
      this.usuariosComponent.obtenerUsuarios();
    }
  }
}
