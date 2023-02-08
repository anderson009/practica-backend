import { OPTIONS_SCHEMA } from '../options';
import { Schema, Types } from 'mongoose';
import { Productos } from './type';

export const schema = new Schema<Productos>(
  {
    name: {
      type: String,
      required: true,
    },

    precioUnitario: {
      type: Number,
    },

    costoUnitario: {
      type: Number,
    },

    ganacia: {
      type: Number,
    },

    descripcion: {
      type: String,
    },

    cantidadDisp: {
      type: Number,
    },

    img: String,
  },
  OPTIONS_SCHEMA,
);

schema.index({ email: 1 });
