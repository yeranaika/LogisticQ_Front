import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ViewAdminComponent } from './view-admin/view-admin.component'; // Importar el nuevo componente

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'admin', component: ViewAdminComponent } // Añadir la ruta para el componente de administración
];
