import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { movementsProvider } from '../../models/movements/index';
import { providerPorductosModel } from '../../models/productos/index';
import { MovementsService } from './services/movements.service';
import { MovementsController } from './controllers/movements.controller';

@Module({
  imports: [
    MongooseModule.forFeature([movementsProvider, providerPorductosModel]),
  ],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementsModule {}
