import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductosService } from '../services/productos.service';
import { ProductosDto } from '../DTO/productos.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { QueryFindAllDto } from '../DTO/query-request.dto';
import { UpdateCantDto } from '../DTO/updateCant';

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

  // @UseGuards(JwtAuthGuard)
  @Get('/')
  @HttpCode(200)
  async getProducts(@Query() query: QueryFindAllDto): Promise<any> {
    return await this.appService.getProducts(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(200)
  async getProduct(@Param('id') id: any): Promise<any> {
    const products = await this.appService.getProduct(id);
    return products;
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/cant/:id')
  async updateCant(
    @Param('id') id: any,
    @Body() DTO: UpdateCantDto,
  ): Promise<any> {
    await this.appService.updateCant(id, DTO);
  }
}
