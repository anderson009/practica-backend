import { ConflictException, Injectable } from '@nestjs/common';
import { ProductosDto } from '../DTO/productos.dto';
import {
  providerPorductosModel,
  PorductosModel,
} from '../../../models/productos/index';
import { InjectModel } from '@nestjs/mongoose';
import { DataUserAuth } from '../../../interfaces/userAuth';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(providerPorductosModel.name)
    private readonly productsModel: typeof PorductosModel,
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

  async getProducts(user: DataUserAuth): Promise<any> {
    const products = await this.productsModel.find().lean();
    console.log(user.id);

    if (!products) return;

    return products;
  }

  async getProduct(id: any): Promise<any> {
    const products = await this.productsModel.findOne({ _id: id }).lean();
    if (!products) return;

    return products;
  }
}
