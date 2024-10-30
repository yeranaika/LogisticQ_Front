import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
    MatSlideToggleModule,
  ],
})
export class UsuariosComponent {
  vistaActual: string = 'verUsuarios';
  usuarios: any[] = [];
  roles: any[] = [];
  cargando: boolean = false;

  nuevoUsuario = {
    nombre: '',
    email: '',
    password: '',
    dni: '',
    idRol: 1
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  cambiarVista(vista: string) {
    this.vistaActual = vista;

    if (vista === 'verUsuarios') {
      this.obtenerUsuarios();
    } else if (vista === 'registrarUsuario') {
      this.obtenerRoles(); // Obtener roles al cambiar a la vista de registrar usuario
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

  obtenerRoles() {
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };
    this.apiService.getAllRoles(headers).subscribe(
      (response: any) => {
        if (response.estado) {
          this.roles = response.roles;
          console.log('Roles obtenidos:', this.roles);
        }
      },
      (error: any) => {
        console.error('Error al obtener roles:', error);
      }
    );
  }

  registrarUsuario() {
    console.log('Registrar Usuario:', this.nuevoUsuario);

    // Validar si el nombre ya existe en la lista de usuarios
    const usuarioExistente = this.usuarios.find(usuario => usuario.nombre === this.nuevoUsuario.nombre);
    if (usuarioExistente) {
      alert('El nombre del usuario ya existe. Por favor, elige otro nombre.');
      return;
    }

    // Obtener el token de autenticación
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    // Registrar el usuario mediante la API
    this.apiService.registerUser(this.nuevoUsuario, headers).subscribe(
      (response: any) => {
        if (response.estado) {
          alert('Usuario registrado exitosamente');
          this.nuevoUsuario = { nombre: '', email: '', password: '', dni: '', idRol: 1 };
          this.cambiarVista('verUsuarios'); // Volver a la vista de usuarios
          this.obtenerUsuarios();
        } else {
          alert('Error al registrar el usuario: ' + response.message);
        }
      },
      (error: any) => {
        console.error('Error al registrar usuario:', error);
        alert('Ocurrió un error al registrar el usuario');
      }
    );
  }

  eliminarUsuario(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    this.apiService.deleteUser(id, headers).subscribe(
      (response: any) => {
        if (response.estado) {
          alert('Usuario eliminado exitosamente');
          this.obtenerUsuarios(); // Actualizar la lista de usuarios después de eliminar
        } else {
          alert('Error al eliminar el usuario: ' + response.message);
        }
      },
      (error: any) => {
        console.error('Error al eliminar usuario:', error);
        alert('Ocurrió un error al eliminar el usuario');
      }
    );
  }
  // Método para activar o desactivar el usuario
  toggleUsuarioEstado(usuario: any) {
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : '',
    };

    if (usuario.estado === 'activo') {
      // Si el usuario está activo, desactivarlo
      this.apiService.deactivateUser(usuario.idUsuario, headers).subscribe(
        (response: any) => {
          if (response.estado) {
            usuario.estado = 'inactivo';
            console.log('Usuario desactivado:', usuario);
          } else {
            console.error('Error al desactivar el usuario:', response.message);
          }
        },
        (error: any) => {
          console.error('Error al desactivar el usuario:', error);
        }
      );
    } else {
      // Si el usuario está inactivo, activarlo
      this.apiService.activateUser(usuario.idUsuario, headers).subscribe(
        (response: any) => {
          if (response.estado) {
            usuario.estado = 'activo';
            console.log('Usuario activado:', usuario);
          } else {
            console.error('Error al activar el usuario:', response.message);
          }
        },
        (error: any) => {
          console.error('Error al activar el usuario:', error);
        }
      );
    }
  }
}
