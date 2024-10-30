import { Component } from '@angular/core';
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
    UsuariosComponent      // Añadir MatIconModule aquí
  ]
})
export class ViewAdminComponent {
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
  }

  mostrarSeccion(seccion: string) {
    if (seccion === 'usuarios') {
      this.mostrarUsuarios = true;
      this.mostrarInventario = false;
    } else if (seccion === 'inventario') {
      this.mostrarInventario = true;
      this.mostrarUsuarios = false;
    }
  }
}
