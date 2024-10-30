import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { BitacoraService } from '../services/bitacora.service';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  bitacora: any[] = [];

  constructor(private bitacoraService: BitacoraService) {}

  ngOnInit(): void {
    this.cargarBitacora();
  }

  cargarBitacora(): void {
    this.bitacoraService.obtenerBitacora().subscribe(
      (data) => {
        this.bitacora = data;
        console.log('Datos de bitácora:', this.bitacora);
      },
      (error) => {
        console.error('Error al obtener la bitácora:', error);
      }
    );
  }
}
