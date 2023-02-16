import { Movements } from './type';
import { schema } from './schema';
import { model } from 'mongoose';

export const movementsProvider = {
  name: 'MOVEMENTS_MODEL',
  schema: schema,
  collection: 'movements',
};

export const MovementsModel = model<Movements>('Movements', schema);
export { Movements } from './type';
