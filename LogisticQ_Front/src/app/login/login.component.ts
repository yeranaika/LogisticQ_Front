import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit(): void {
    console.log('Intentando iniciar sesión con:', this.email);

    // Simulación de inicio de sesión exitoso
    if (this.email && this.password) {
      console.log('Inicio de sesión exitoso para el usuario:', this.email);
      
      // Redirigir al panel de administración
      this.router.navigate(['/admin']);
    } else {
      console.error('Error en el inicio de sesión: Credenciales incompletas.');
    }
  }
}
