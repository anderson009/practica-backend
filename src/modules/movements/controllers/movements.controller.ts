import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SalesDto } from '../dto/sales.dto';
import { MovementsService } from '../services/movements.service';

@Controller('api/sales')
export class MovementsController {
  constructor(private readonly appService: MovementsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(200)
  async createVentas(@Body() movements: SalesDto): Promise<any> {
    await this.appService.createSales(movements);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/')
  // async getVentas(): Promise<VentasEntity[]> {
  //   const ventas = await this.appService.getVentas();
  //   return ventas.map(
  //     (el) =>
  //       new VentasEntity({
  //         id: el._id,
  //         categoria: el.categoria,
  //         concepto: el.concepto,
  //         fecha: el.fecha,
  //         metodoDePago: el.metodoDePago,
  //         products: el.products,
  //         totalGastos: el.totalGastos,
  //         totalVentas: el.totalVentas,
  //         type: el.type,
  //       }),
  //   );
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('/yo/:id')
  // async getV(@Param('id') id: any): Promise<any> {
  //   const ventas = await this.appService.getProducts(id);
  //   return ventas;
  // }

  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get('/:id')
  // async getVenta(@Param('id') id: any): Promise<VentasEntity> {
  //   const [venta, productos] = await Promise.all([
  //     this.appService.getVenta(id),
  //     this.appService.getProducts(id),
  //   ]);
  //   return new VentasEntity({
  //     ...venta,
  //     productos: productos,
  //   });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete('/delete/:id')
  // async deleteMovimiento(@Param('id') id: any) {
  //   return await this.appService.deleteMoviento(id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('/put/:id')
  // async putAlumno(@Param('id') id: any, @Body() DTO: VentasDto): Promise<any> {
  //   await this.appService.updateMovimiento(DTO, id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('/get/:fecha')
  // async getVe(@Param('fecha') fecha: any): Promise<any> {
  //   const ventas = await this.appService.getVentasDate(fecha);
  //   return ventas;
  // }
}
