import { Ventas } from './type';
import { schema } from './schema';
import { model } from 'mongoose';

export const providerVentasModel = {
  name: 'VENTAS_MODEL',
  schema: schema,
  collection: 'ventas',
};

export const VentasModel = model<Ventas>('Ventas', schema);
export { Ventas } from './type';
