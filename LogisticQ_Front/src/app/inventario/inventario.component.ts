import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../services/inventario.service';
import { Inventario } from '../model/inventario.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  inventario: Inventario[] = [];
  inventarioFiltrado: Inventario[] = [];
  inventarioSeleccionado?: Inventario;
  filtro: string = '';

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.inventarioService.obtenerInventario().subscribe(data => {
      this.inventario = data;
      this.inventarioFiltrado = data; // Inicializa el inventario filtrado
    });
  }

  filtrarInventario(): void {
    const filtroLowerCase = this.filtro.toLowerCase();
    this.inventarioFiltrado = this.inventario.filter(item =>
      item.producto.codigoSAP.toLowerCase().includes(filtroLowerCase) ||
      item.producto.nombre.toLowerCase().includes(filtroLowerCase)
    );
  }

  editarInventario(item: Inventario): void {
    this.inventarioSeleccionado = { ...item };
  }

  guardarCambios(): void {
    if (this.inventarioSeleccionado) {
      this.inventarioService.actualizarInventario(this.inventarioSeleccionado).subscribe(() => {
        this.cargarInventario();
        this.inventarioSeleccionado = undefined;
      });
    }
  }
}
