export interface Producto {
  idProducto: number;
  codigoSAP: string;
  nombre: string;
  categoria: string;
  precioCompra: string;
  estado: string;
  fecha_registro: string;
}

export interface Inventario {
  idInventario: number;
  idProducto: number;
  cantidadDisponible: number;
  nivelMinimo: number;
  fecha_actualizacion: string;
  producto: Producto; // Relación con el producto
}
