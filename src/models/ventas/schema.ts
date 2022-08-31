import { OPTIONS_SCHEMA } from '../options';
import { Schema, Types } from 'mongoose';
import { Ventas } from './type';

export const schema = new Schema<Ventas>(
  {
    products: {
      type: [{ products: Types.ObjectId, cantidad: Number }],
      required: true,
    },

    total: {
      type: Number,
    },

    concepto: {
      type: String,
    },

    metodoDePago: {
      type: String,
    },

    fecha: {
      type: Date,
      default: new Date(),
    },
  },
  OPTIONS_SCHEMA,
);

schema.index({ email: 1 });
