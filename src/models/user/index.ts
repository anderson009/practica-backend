import { User } from './type';
import { schema } from './schema';
import { model } from 'mongoose';

export const providerUserModel = {
  name: 'USER_MODEL',
  schema: schema,
  collection: 'user',
};

export const UserModel = model<User>('User', schema);
export { User } from './type';
