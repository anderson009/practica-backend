import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosService } from './services/productos.service';
import { ProductosController } from './controllers/productos.controller';
import { providerPorductosModel } from '../../models/productos/index';
import { UtilsService } from '../utils/utils.service';

@Module({
  imports: [MongooseModule.forFeature([providerPorductosModel])],
  controllers: [ProductosController],
  providers: [ProductosService, UtilsService],
})
export class ProductosModule {}
