import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../DTO/auth.dto';

@Controller('api/login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/')
  async login(@Body() loginUserDto: LoginDto): Promise<any> {
    const user = await this.authService.login(loginUserDto);
    return user
  }
}
