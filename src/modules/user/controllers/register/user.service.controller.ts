import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterDto } from '../../dto/register.dto';
import { RegisterService } from '../../services/register/register.service';

@Controller('user')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    await this.registerService.register(registerDto);

    return {};
  }
}
