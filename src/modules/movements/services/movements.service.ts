/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  movementsProvider,
  MovementsModel,
} from '../../../models/movements/index';
import { SalesDto } from '../dto/sales.dto';
import { Movements, Tipos } from '../../../models/movements/type';
import {
  providerPorductosModel,
  PorductosModel,
} from '../../../models/productos/index';
import { ResultPaginate } from '../../../interfaces/result-paginate';
import { UtilsService } from '../../utils/utils.service';
import { QueryFindAllDto } from '../dto/query-request.dto';
import { FilterQuery, SortOrder } from 'mongoose';
import { UpdateCantDto } from '../../productos/DTO/updateCant';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(movementsProvider.name)
    private readonly ventasModel: typeof MovementsModel,
    @InjectModel(providerPorductosModel.name)
    private readonly productsModel: typeof PorductosModel,
    private utils: UtilsService,
  ) {}

  async createMovements(salesDto: SalesDto): Promise<void> {
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

  async getSales(query: QueryFindAllDto): Promise<ResultPaginate<any>> {
    const { limit, offset } = this.utils.getPageData(query);
    let sort: Record<string, SortOrder>;

    const filter: FilterQuery<any> = this.filterSales(query);

    if (query.orderField) {
      sort = { [query.orderField]: query.orderType == 'asc' ? 1 : -1 };
    }
    const [movements, total] = await Promise.all([
      this.ventasModel.find(filter).limit(limit).skip(offset).sort(sort).lean(),
      this.ventasModel.countDocuments(filter),
    ]);

    const data = movements.map((movement) => {
      if (movement.type === 'gastos') {
        return {
          _id: movement._id,
          type: movement.type,
          totals: movement.totals,
          metodoDePago: movement.metodoDePago,
          concepto: movement.concepto,
          categoria: movement.categoria,
          fecha: movement.fecha,
        };
      }

      if (movement.type === 'ventas') {
        return movement;
      }
    });

    return {
      data: data,
      total,
      page: query.page,
      limit,
    };
  }

  async getMovement(id: any): Promise<Movements> {
    const movement = await this.ventasModel.findOne({ _id: id }).lean();

    if (!movement) throw new NotFoundException();
    let o;

    if (movement.type === 'gastos') {
      o = {
        id: movement._id,
        type: movement.type,
        total: movement.totals,
        metodoDePago: movement.metodoDePago,
        concepto: movement.concepto,
        categoria: movement.categoria,
        ganancias: movement.ganancia,
        fecha: movement.fecha,
      };

      return o;
    }

    return movement;
  }

  async getProducts(id: any): Promise<any> {
    const Movement = await this.ventasModel.findOne({ _id: id }).lean();

    const data = Movement.products;
    const ids = [];
    const cantidad = [];
    data.filter((el) => {
      ids.push(el.products), cantidad.push(el.cantidad);
    });

    const products = await this.productsModel.find({ _id: ids });

    const list = products.map((el: any, i) => {
      const obj = {
        name: el.name,
        precioUnitario: el.precioUnitario,
        cantidad: cantidad[i],
        ganancia: el.precioUnitario - el.costoUnitario,
        total: cantidad[i] * el.precioUnitario,
      };

      return obj;
    });

    return console.log(list);
  }

  async deleteMovement(id: string): Promise<any> {
    const movement = await this.ventasModel.findById({ _id: id });
    if (!movement) throw new NotFoundException();

    await this.ventasModel.findByIdAndDelete({ _id: id });
  }

  async updateMovement(DTO: SalesDto, id: any): Promise<any> {
    const movement = await this.ventasModel.findOne({ _id: id });
    if (!movement) throw new NotFoundException();

    const updateMovement = {
      products: DTO.products,
      concepto: DTO.concepto,
      totalVentas: DTO.totals,
      metodoDePago: DTO.metodoDePago,
    };

    await this.ventasModel.findByIdAndUpdate(id, updateMovement, {
      new: true,
    });
  }

  // async getVentasDate(fecha: Date): Promise<any> {
  //   const ventas = await this.ventasModel.find({ fecha }).lean();
  //   if (!ventas) return;

  //   return ventas;
  // }

  private filterSales(query: QueryFindAllDto): Record<string, any> {
    const filter: FilterQuery<any> = {};

    if (query.searchText) {
      filter.$or = this.utils.searchText(query.searchText, ['concepto']) as any;
    }

    if (query.filter) {
      for (const key in query.filter) {
        if (query.filter[key]) {
          if (key === 'campo') {
            // aplicar especial busqueda
            continue;
          }

          filter[key] = query.filter[key];
        }
      }
    }

    return filter;
  }
}
