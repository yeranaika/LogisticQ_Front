export interface Usuario {
    idUsuario?: number;
    dni: string;
    nombre: string;
    email: string;
    password: string;
    idRol: number;
    estado?: 'activo' | 'inactivo';
    fecha_registro?: Date;
  }
