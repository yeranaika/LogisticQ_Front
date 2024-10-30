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

// Componentes
import { InventarioComponent } from './inventario/inventario.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'usuarios', loadComponent: () => import('./usuarios/usuarios.component').then(m => m.UsuariosComponent) },
  { path: 'admin', loadComponent: () => import('./view-admin/view-admin.component').then(m => m.ViewAdminComponent) },
  { path: 'inventario', component: InventarioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InventarioComponent
  ],
  imports: [
    BrowserModule,  // Asegúrate de tener BrowserModule aquí
    FormsModule,    // FormsModule para el uso de ngModel
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: []  // Asegúrate de tener el componente raíz aquí si tienes uno, por ejemplo AppComponent
})
export class AppModule { }
