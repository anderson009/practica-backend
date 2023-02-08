import { OPTIONS_SCHEMA } from '../options';
import { Schema, Types } from 'mongoose';
import { Tipos, Movimientos } from './type';

export const schema = new Schema<Movimientos>(
  {
    products: {
      type: [{ products: Types.ObjectId, cantidad: Number }],
    },

    type: {
      type: String,
      required: true,
      enum: Object.values(Tipos),
    },

    categoria: {
      type: String,
    },

    totalVentas: {
      type: Number,
    },

    ganancia: {
      type: Number,
    },

    totalGastos: {
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
