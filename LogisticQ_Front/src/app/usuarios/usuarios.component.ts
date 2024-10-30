import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule para ngModel
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class UsuariosComponent {
  vistaActual: string = 'verUsuarios';
  usuarios: any[] = [];
  cargando: boolean = false;

  nuevoUsuario = {
    nombre: '',
    email: '',
    password: ''
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  cambiarVista(vista: string) {
    this.vistaActual = vista;

    if (vista === 'verUsuarios') {
      this.obtenerUsuarios();
    }
  }

  obtenerUsuarios() {
    this.cargando = true;
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };
    this.apiService.getAllUsers(headers).subscribe(
      (response: any) => {
        this.cargando = false;
        if (response.estado) {
          this.usuarios = response.usuarios;
          console.log('Usuarios obtenidos:', this.usuarios);
        }
      },
      (error: any) => {
        this.cargando = false;
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  registrarUsuario() {
    console.log('Registrar Usuario:', this.nuevoUsuario);
    // Lógica para registrar el usuario (puedes añadir una llamada al API aquí)
  }
}
