import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BitacoraService } from '../services/bitacora.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  logs: any[] = [];
  logsFiltrados: any[] = [];
  paginatedLogs: any[] = [];
  paginaActual: number = 1;
  registrosPorPagina: number = 5;
  totalPaginas: number = 1;
  cargando: boolean = false;
  filtro: string = '';

  constructor(private bitacoraService: BitacoraService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarBitacora();
  }

  cargarBitacora(): void {
    this.cargando = true;
    const token = this.authService.getToken();
    const headers = {
      'x-access-token': token ? token : ''
    };

    this.bitacoraService.obtenerBitacora(headers).subscribe(
      (response: any) => {
        this.cargando = false;
        if (response.logs && response.logs.length > 0) {
          this.logs = response.logs;
          this.logsFiltrados = [...this.logs]; // Inicializamos los logsFiltrados con todos los registros
          this.totalPaginas = Math.ceil(this.logsFiltrados.length / this.registrosPorPagina);
          this.actualizarPaginacion();
        }
      },
      (error: any) => {
        this.cargando = false;
        console.error('Error al obtener bitácora:', error);
      }
    );
  }

  actualizarPaginacion(): void {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.paginatedLogs = this.logsFiltrados.slice(inicio, fin);
  }

  nextPage(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }

  prevPage(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  filtrarBitacora(): void {
    const filtroLowerCase = this.filtro.toLowerCase();
    this.logsFiltrados = this.logs.filter(log => {
      // Verificación de que los campos existen antes de intentar acceder a ellos
      const usuarioNombre = log.usuario && log.usuario.nombre ? log.usuario.nombre.toLowerCase() : '';
      const accion = log.accion ? log.accion.toLowerCase() : '';
      const tablaAfectada = log.tabla_afectada ? log.tabla_afectada.toLowerCase() : '';
      const descripcion = log.descripcion ? log.descripcion.toLowerCase() : '';

      return (
        usuarioNombre.includes(filtroLowerCase) ||
        accion.includes(filtroLowerCase) ||
        tablaAfectada.includes(filtroLowerCase) ||
        descripcion.includes(filtroLowerCase)
      );
    });

    // Reiniciar la paginación después de filtrar
    this.paginaActual = 1;
    this.totalPaginas = Math.ceil(this.logsFiltrados.length / this.registrosPorPagina);
    this.actualizarPaginacion();
  }
}
