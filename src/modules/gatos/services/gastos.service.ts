import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { providerGastosModel, GastosModel } from '../../../models/gastos/index';
import { gastosDto } from '../DTO/gastos.dto';

@Injectable()
export class GastosServices {
  constructor(
    @InjectModel(providerGastosModel.name)
    private readonly gastosModel: typeof GastosModel,
  ) {}

  async createGasto(dto: gastosDto): Promise<any> {
    const newGasto = new this.gastosModel(dto);

    await newGasto.save();

    return {};
  }

  async getGastos(): Promise<any> {
    const gastos = await this.gastosModel.find().lean();
    if (!gastos) new NotFoundException('not found gastos');

    return gastos;
  }

}
