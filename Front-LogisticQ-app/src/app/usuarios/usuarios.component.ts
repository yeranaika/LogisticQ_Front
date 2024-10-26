import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.apiService.getAllUsers().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  editarUsuario(usuario: any): void {
    console.log('Editar usuario:', usuario);
    // Aquí podrías agregar lógica para redirigir a un formulario de edición
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      console.log('Eliminar usuario con ID:', id);
      // Aquí podrías usar un método del servicio ApiService para eliminar el usuario
    }
  }
}
