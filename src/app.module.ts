import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from './config/config';
import { RegisterModule } from './modules/register/register.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductosModule } from './modules/productos/productos.module';
import { VentasModule } from './modules/ventas/ventas.module';
import { GastosModule } from './modules/gatos/gastos.module';

@Module({
  imports: [
    MongooseModule.forRoot(AppConfig.dataBaseUrl),
    RegisterModule,
    AuthModule,
    ProductosModule,
    VentasModule,
    GastosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
