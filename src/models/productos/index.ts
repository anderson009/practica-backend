import { Productos } from './type';
import { schema } from './schema';
import { model } from 'mongoose';

export const providerPorductosModel = {
  name: 'PRODUCTOS_MODEL',
  schema: schema,
  collection: 'productos',
};

export const PorductosModel = model<Productos>('Productos', schema);
export { Productos } from './type';
