import { OPTIONS_SCHEMA } from '../options';
import { Schema, Types } from 'mongoose';
import { Gastos } from './type';

export const schema = new Schema<Gastos>(
  {
    categoria: {
      type: String,
      required: true,
    },

    montoTotal: {
      type: Number,
      required: true
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
