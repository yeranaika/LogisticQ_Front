import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Importaciones de Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Definición de rutas con componentes standalone importados
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'usuarios', loadComponent: () => import('./usuarios/usuarios.component').then(m => m.UsuariosComponent) },
  { path: 'admin', loadComponent: () => import('./view-admin/view-admin.component').then(m => m.ViewAdminComponent) }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [] // Quita el AppComponent de aquí
})
export class AppModule { }
