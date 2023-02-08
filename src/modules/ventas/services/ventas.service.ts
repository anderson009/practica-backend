import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  movimientosProvider,
  MovimientosModel,
} from '../../../models/ventas/index';
import { VentasDto } from '../DTO/ventas.dto';
import { Tipos } from '../../../models/ventas/type';
import {
  providerPorductosModel,
  PorductosModel,
} from '../../../models/productos/index';

@Injectable()
export class VentasService {
  constructor(
    @InjectModel(movimientosProvider.name)
    private readonly ventasModel: typeof MovimientosModel,
    @InjectModel(providerPorductosModel.name)
    private readonly productsModel: typeof PorductosModel,
  ) {}

  async createVenta(ventasDto: VentasDto): Promise<any> {
    const newVenta = new this.ventasModel({
      products: ventasDto.products,
      totalVentas: ventasDto.totalVentas,
      concepto: ventasDto.concepto,
      metodoDePago: ventasDto.metodoDePago,
      fecha: new Date().toDateString(),
      type: Tipos.VENTAS,
    });

    await newVenta.save();

    return newVenta;
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

  async getProducts(id: any): Promise<any> {
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
        ganancia: element.precioUnitario - element.costoUnitario,
        total: cantidad[index] * element.precioUnitario,
      };
      list.push({ ...obj });
    }
    return list;
  }

  async deleteMoviento(id: string): Promise<any> {
    const movomiento = await this.ventasModel.findById({ _id: id });
    if (!movomiento) throw new NotFoundException('kkkk');

    await this.ventasModel.findByIdAndDelete({ _id: id });
  }

  async updateMovimiento(DTO: VentasDto, id: any): Promise<any> {
    const movimiento = await this.ventasModel.findOne({ _id: id });
    if (!movimiento) throw new NotFoundException();

    const updateMovimiento = {
      products: DTO.products,
      concepto: DTO.concepto,
      totalVentas: DTO.totalVentas,
      metodoDePago: DTO.metodoDePago,
    };

    await this.ventasModel.findByIdAndUpdate(id, updateMovimiento, {
      new: true,
    });
  }

  async getVentasDate(fecha: Date): Promise<any> {
    const ventas = await this.ventasModel.find({ fecha }).lean();
    if (!ventas) return;

    return ventas;
  }
}
