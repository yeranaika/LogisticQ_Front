import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../services/inventario.service';
import { Inventario } from '../model/inventario.model';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Importar CommonModule y FormsModule
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']  // Asegúrate de que tu archivo CSS esté enlazado aquí
})
export class InventarioComponent implements OnInit {
  inventario: Inventario[] = [];
  inventarioSeleccionado?: Inventario;

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.inventarioService.obtenerInventario().subscribe(data => {
      console.log('Datos de inventario:', data);  // Verifica que los datos están siendo cargados
      this.inventario = data;
    });
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
