import { Injectable, VERSION_NEUTRAL } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { providerVentasModel, VentasModel } from '../../../models/ventas/index';
import { VentasDto } from '../DTO/ventas.dto';
import {
  providerPorductosModel,
  PorductosModel,
} from '../../../models/productos/index';

@Injectable()
export class VentasService {
  constructor(
    @InjectModel(providerVentasModel.name)
    private readonly ventasModel: typeof VentasModel,
    @InjectModel(providerPorductosModel.name)
    private readonly productsModel: typeof PorductosModel,
  ) {}

  async createVenta(ventasDto: VentasDto): Promise<any> {
    const newVenta = new this.ventasModel(ventasDto);

    await newVenta.save();

    return {};
  }

  async getVentas(): Promise<any> {
    const ventas = await this.ventasModel.find().lean();
    if (!ventas) return;

    return ventas;
  }

  async getVenta(id: any): Promise<any> {
    const venta = await this.ventasModel.findOne({ _id: id }).lean();
    return venta;
  }

  async getProducts(id: string): Promise<any> {
    const venta = await this.ventasModel.findOne({ _id: id }).lean();
    const data = venta.products;
    const ids = [];
    const cantidad = [];
    data.filter((el) => {
      ids.push(el.products), cantidad.push(el.cantidad);
    });

    const products = await this.productsModel.find({ _id: ids });

    const list = [];
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      const obj = {
        name: element.name,
        precioUnitario: element.precioUnitario,
        cantidad: cantidad[index],
        total: cantidad[index] * element.precioUnitario,
      };
      list.push({ ...obj });
    }
    return list;
  }
}
