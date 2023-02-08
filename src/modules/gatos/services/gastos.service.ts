import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { gastosDto } from '../DTO/gastos.dto';
import { Tipos } from '../../../models/ventas/type';
import {
  movimientosProvider,
  MovimientosModel,
} from '../../../models/ventas/index';

@Injectable()
export class GastosServices {
  constructor(
    @InjectModel(movimientosProvider.name)
    private readonly gastosModel: typeof MovimientosModel,
  ) {}

  async createGasto(dto: gastosDto): Promise<any> {
    const newGasto = new this.gastosModel({
      categoria: dto.categoria,
      totalGastos: dto.totalGastos,
      concepto: dto.concepto,
      metodoDePago: dto.metodoDePago,
      fecha: new Date().toDateString(),
      type: Tipos.Gastos,
    });

    await newGasto.save();

    return {};
  }

  async getGastos(): Promise<any> {
    const gastos = await this.gastosModel.find().lean();
    if (!gastos) new NotFoundException('not found gastos');

    return gastos;
  }
}
