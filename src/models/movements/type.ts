import { Types } from 'mongoose';
export enum Tipos {
  VENTAS = 'ventas',
  Gastos = 'gastos',
}

export type Movements = {
  id?: string;
  _id?: string;
  type: Tipos;
  products: { products: Types.ObjectId; cantidad: number }[];
  totals: number;
  metodoDePago: string;
  concepto: string;
  categoria: string;
  ganancia: number;
  fecha: any;
};
