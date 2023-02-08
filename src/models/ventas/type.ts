import { Types } from 'mongoose';
export enum Tipos {
  VENTAS = 'ventas',
  Gastos = 'gastos',
}

export type Movimientos = {
  id?: string;
  _id?: string;
  type: Tipos;
  products: { products: Types.ObjectId; cantidad: number }[];
  totalVentas: number;
  totalGastos: number;
  metodoDePago: string;
  concepto: string;
  categoria: string;
  ganancia: number;
  fecha: any;
};
