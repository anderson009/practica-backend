import { Movimientos } from './type';
import { schema } from './schema';
import { model } from 'mongoose';

export const movimientosProvider = {
  name: 'MOVIMIENTOS_MODEL',
  schema: schema,
  collection: 'movimientos',
};

export const MovimientosModel = model<Movimientos>('Movimientos', schema);
export { Movimientos } from './type';
