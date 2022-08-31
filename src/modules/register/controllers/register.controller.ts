import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../DTO/register.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/register')
export class RegisterController {
  constructor(private readonly appService: RegisterService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('/')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const registerUser = await this.appService.registerUser(registerDto);
    return registerUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUsers(): Promise<any[]> {
    const alumnos = await this.appService.getUsers();
    return alumnos;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my_profile')
  async login(@Param('id') id: any): Promise<any> {
    const user = await this.appService.getMyProfile(id);
    return user;
  }
}
