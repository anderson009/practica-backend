import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  movementsProvider,
  MovementsModel,
} from '../../../models/movements/index';
import { SalesDto } from '../dto/sales.dto';
import { Tipos } from '../../../models/movements/type';
import {
  providerPorductosModel,
  PorductosModel,
} from '../../../models/productos/index';
import { BillsDto } from '../dto/bills.dto';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(movementsProvider.name)
    private readonly ventasModel: typeof MovementsModel,
    @InjectModel(providerPorductosModel.name)
    private readonly productsModel: typeof PorductosModel,
  ) {}

  async createSales(salesDto: SalesDto): Promise<void> {
    if (salesDto.type === Tipos.VENTAS) {
      await this.ventasModel.create({
        products: salesDto.products,
        totals: salesDto.totals,
        concepto: salesDto.concepto,
        metodoDePago: salesDto.metodoDePago,
        fecha: new Date().toDateString(),
        type: Tipos.VENTAS,
      });
    } else if (salesDto.type === Tipos.Gastos) {
      await this.ventasModel.create({
        categoria: salesDto.categoria,
        totals: salesDto.totals,
        concepto: salesDto.concepto,
        metodoDePago: salesDto.metodoDePago,
        fecha: new Date().toDateString(),
        type: salesDto.type,
      });
    }
  }

  // async getVentas(): Promise<any> {
  //   const ventas = await this.ventasModel.find().lean();
  //   if (!ventas) return;

  //   return ventas;
  // }

  // async getVenta(id: any): Promise<any> {
  //   const venta = await this.ventasModel.findOne({ _id: id }).lean();
  //   return venta;
  // }

  // async getProducts(id: any): Promise<any> {
  //   const venta = await this.ventasModel.findOne({ _id: id }).lean();
  //   const data = venta.products;
  //   const ids = [];
  //   const cantidad = [];
  //   data.filter((el) => {
  //     ids.push(el.products), cantidad.push(el.cantidad);
  //   });

  //   const products = await this.productsModel.find({ _id: ids });

  //   const list = [];
  //   for (let index = 0; index < products.length; index++) {
  //     const element = products[index];
  //     const obj = {
  //       name: element.name,
  //       precioUnitario: element.precioUnitario,
  //       cantidad: cantidad[index],
  //       ganancia: element.precioUnitario - element.costoUnitario,
  //       total: cantidad[index] * element.precioUnitario,
  //     };
  //     list.push({ ...obj });
  //   }
  //   return list;
  // }

  // async deleteMoviento(id: string): Promise<any> {
  //   const movomiento = await this.ventasModel.findById({ _id: id });
  //   if (!movomiento) throw new NotFoundException('kkkk');

  //   await this.ventasModel.findByIdAndDelete({ _id: id });
  // }

  // async updateMovimiento(DTO: VentasDto, id: any): Promise<any> {
  //   const movimiento = await this.ventasModel.findOne({ _id: id });
  //   if (!movimiento) throw new NotFoundException();

  //   const updateMovimiento = {
  //     products: DTO.products,
  //     concepto: DTO.concepto,
  //     totalVentas: DTO.totalVentas,
  //     metodoDePago: DTO.metodoDePago,
  //   };

  //   await this.ventasModel.findByIdAndUpdate(id, updateMovimiento, {
  //     new: true,
  //   });
  // }

  // async getVentasDate(fecha: Date): Promise<any> {
  //   const ventas = await this.ventasModel.find({ fecha }).lean();
  //   if (!ventas) return;

  //   return ventas;
  // }
}
