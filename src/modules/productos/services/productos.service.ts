import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductosDto } from '../DTO/productos.dto';
import {
  providerPorductosModel,
  PorductosModel,
} from '../../../models/productos/index';
import { InjectModel } from '@nestjs/mongoose';
import { DataUserAuth } from '../../../interfaces/userAuth';
import { QueryFindAllDto } from '../DTO/query-request.dto';
import { ResultPaginate } from '../../../interfaces/result-paginate';
import { UtilsService } from '../../utils/utils.service';
import { FilterQuery, SortOrder } from 'mongoose';
import { UpdateCantDto } from '../DTO/updateCant';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(providerPorductosModel.name)
    private readonly productsModel: typeof PorductosModel,
    private utils: UtilsService,
  ) {}

  async createProduct(registerDto: ProductosDto): Promise<any> {
    const { name } = registerDto;

    const product = await this.productsModel.findOne({ name: name });

    if (product) {
      throw new ConflictException('el producto ya existe');
    }

    const newProduct = new this.productsModel(registerDto);

    await newProduct.save();

    return {};
  }

  async getProducts(query: QueryFindAllDto): Promise<ResultPaginate<any>> {
    const { limit, offset } = this.utils.getPageData(query);
    let sort: Record<string, SortOrder>;

    const filter: FilterQuery<any> = this.filterProducts(query);

    if (query.orderField) {
      sort = { [query.orderField]: query.orderType == 'asc' ? 1 : -1 };
    }
    const [products, total] = await Promise.all([
      this.productsModel
        .find(filter)
        .limit(limit)
        .skip(offset)
        .sort(sort)
        .lean(),
      this.productsModel.countDocuments(filter),
    ]);

    return {
      data: products,
      total,
      page: query.page,
      limit,
    };
  }

  async getProduct(id: any): Promise<any> {
    const products = await this.productsModel.findOne({ _id: id }).lean();
    if (!products) return;

    return products;
  }

  async updateCant(id: any, cantidad: UpdateCantDto): Promise<any> {
    const product = await this.productsModel.findOne({ _id: id });
    if (!product) throw new NotFoundException();
    await this.productsModel.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          cantidadDisp: -cantidad.cantidad,
        },
      },
    );
  }

  private filterProducts(query: QueryFindAllDto): Record<string, any> {
    const filter: FilterQuery<any> = {};

    if (query.searchText) {
      filter.$or = this.utils.searchText(query.searchText, [
        'name',
        'descripcion',
      ]) as any;
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
