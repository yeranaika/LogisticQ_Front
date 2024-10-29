// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Asegúrate de ajustar la ruta según tu estructura

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Intentando iniciar sesión con:', this.email);

    if (this.email && this.password) {
      // Llamar al método login del AuthService
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          const token = response.token; // Asegúrate de que el backend devuelve el token en 'response.token'
          if (token) {
            // Guardar el token
            this.authService.setToken(token);
            console.log('Inicio de sesión exitoso para el usuario:', this.email);

            // Redirigir al panel de administración
            this.router.navigate(['/admin']);
          } else {
            console.error('No se recibió un token en la respuesta.');
            // Manejar el caso donde no se recibe token
          }
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      );
    } else {
      console.error('Error en el inicio de sesión: Credenciales incompletas.');
      // Mostrar mensaje de error al usuario si lo deseas
    }
  }
}
