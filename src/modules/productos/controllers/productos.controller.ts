import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductosService } from '../services/productos.service';
import { ProductosDto } from '../DTO/productos.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ProductosEntity } from '../entity/productos.entity';
import { UserAuth } from '../../../decorators/user-auth.decorator';
import { DataUserAuth } from '../../../interfaces/userAuth';

@Controller('api/products')
export class ProductosController {
  constructor(private readonly appService: ProductosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(200)
  async register(@Body() productsDto: ProductosDto): Promise<any> {
    const registerUser = await this.appService.createProduct(productsDto);
    return registerUser;
  }

  @UseGuards(JwtAuthGuard, UserAuth)
  @Get('/')
  @HttpCode(200)
  async getProducts(@UserAuth() userAuth: DataUserAuth): Promise<any> {
    const products = await this.appService.getProducts(userAuth);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(200)
  async getProduct(@Param('id') id: any): Promise<any> {
    const products = await this.appService.getProduct(id);
    return products;
  }
}
