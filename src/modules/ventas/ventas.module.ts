import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VentasService } from './services/ventas.service';
import { VentasController } from './controllers/ventas.controller';
import { movimientosProvider } from '../../models/ventas/index';
import { providerPorductosModel } from '../../models/productos/index';

@Module({
  imports: [
    MongooseModule.forFeature([movimientosProvider, providerPorductosModel]),
  ],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
