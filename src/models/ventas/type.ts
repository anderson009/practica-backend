export type Ventas = {
  id?: string;
  _id?: string;
  products: { products: string; cantidad: number }[];
  total: number;
  metodoDePago: string;
  concepto: string;
  fecha: Date;
};
