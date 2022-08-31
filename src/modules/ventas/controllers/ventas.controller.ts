import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VentasService } from '../services/ventas.service';
import { VentasDto } from '../DTO/ventas.dto';
import { VentasEntity } from '../entity/ventas.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/ventas')
export class VentasController {
  constructor(private readonly appService: VentasService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(200)
  async createVentas(@Body() ventasDto: VentasDto): Promise<any> {
    const createVenta = await this.appService.createVenta(ventasDto);
    return createVenta;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getVentas(): Promise<VentasEntity[]> {
    const ventas = await this.appService.getVentas();
    return ventas.map((el) => new VentasEntity(el));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getVenta(@Param('id') id: any): Promise<VentasEntity> {
    const [venta, productos] = await Promise.all([
      this.appService.getVenta(id),
      this.appService.getProducts(id),
    ]);
    return new VentasEntity({
      ...venta,
      productos: productos,
    });
  }
}
