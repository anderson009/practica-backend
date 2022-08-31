import { gastosDto } from '../DTO/gastos.dto';
import { GastosServices } from '../services/gastos.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@Controller('api/gastos')
export class GastosController {
  constructor(private readonly appService: GastosServices) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createGasto(@Body() dto: gastosDto): Promise<any> {
    const user = await this.appService.createGasto(dto);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getGasto(): Promise<any> {
    const user = await this.appService.getGastos();
    return user;
  }
}
