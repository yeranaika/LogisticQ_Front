import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-admin',
  standalone: true,
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ViewAdminComponent {
  mostrarInventario: boolean = false;  // Definir propiedad para controlar la visualización del inventario
  mostrarUsuarios: boolean = false;    // Definir propiedad para controlar la visualización de usuarios

  constructor() {}

  verInventario() {
    this.mostrarInventario = true;
    this.mostrarUsuarios = false;  // Asegurarse de ocultar los usuarios si se selecciona inventario
    console.log('Ver Inventario clicked');
  }

  verUsuarios() {
    this.mostrarUsuarios = true;
    this.mostrarInventario = false;  // Asegurarse de ocultar el inventario si se seleccionan los usuarios
    console.log('Ver Usuarios clicked');
  }
}
