import { Gastos } from './type';
import { schema } from './schema';
import { model } from 'mongoose';

export const providerGastosModel = {
  name: 'GASTOS_MODEL',
  schema: schema,
  collection: 'gastos',
};

export const GastosModel = model<Gastos>('Gastos', schema);
export { Gastos } from './type';
