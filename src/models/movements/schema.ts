import { OPTIONS_SCHEMA } from '../options';
import { Schema, Types } from 'mongoose';
import { Tipos, Movements } from './type';

export const schema = new Schema<Movements>(
  {
    products: {
      type: [{ products: Types.ObjectId, cantidad: Number }],
      required: false,
    },

    type: {
      type: String,
      required: true,
      enum: Object.values(Tipos),
    },

    categoria: {
      type: String,
    },

    ganancia: {
      type: Number,
    },

    totals: {
      type: Number,
    },

    concepto: {
      type: String,
    },

    metodoDePago: {
      type: String,
    },

    fecha: {
      type: String,
    },
  },
  OPTIONS_SCHEMA,
);

schema.index({ email: 1 });
