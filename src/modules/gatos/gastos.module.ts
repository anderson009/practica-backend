import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GastosController } from './controllers/gastos.controller';
import { GastosServices } from './services/gastos.service';
import { movimientosProvider } from '../../models/ventas/index';

@Module({
  imports: [MongooseModule.forFeature([movimientosProvider])],
  controllers: [GastosController],
  providers: [GastosServices],
})
export class GastosModule {}
