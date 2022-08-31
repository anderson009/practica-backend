import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { providerGastosModel } from '../../models/gastos/index';
import { GastosController } from './controllers/gastos.controller';
import { GastosServices } from './services/gastos.service';

@Module({
  imports: [MongooseModule.forFeature([providerGastosModel])],
  controllers: [GastosController],
  providers: [GastosServices],
})
export class GastosModule {}
