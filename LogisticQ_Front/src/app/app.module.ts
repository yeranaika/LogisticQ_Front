import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Importación necesaria
import { RouterModule, Routes } from '@angular/router';

// Importaciones de Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';  // Importación necesaria para usar mat-toolbar

// Importaciones de tus componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';  // Importar el componente de administrador

// Definición de rutas
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'admin', component: ViewAdminComponent }  // Ruta para el componente de administrador
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    ViewAdminComponent  // Declarar el componente ViewAdmin aquí si no es standalone
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,  // HttpClientModule debe estar en los imports
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule  // Agregar MatToolbarModule para <mat-toolbar>
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
