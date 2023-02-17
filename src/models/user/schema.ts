import { OPTIONS_SCHEMA } from '../options';
import { Schema } from 'mongoose';
import { User } from './type';

export const schema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    img: String,

    role: {
      type: String,
      require: true,
      default: 'USER_ROLE',
    },
  },
  OPTIONS_SCHEMA,
);

schema.index({ email: 1 });
