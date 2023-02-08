import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../../../../models/user/index';
import { AuthService } from '../../../auth/auth.service';
import { LoginDto } from '../../dto/login.dto';
import { LoginEntity } from '../../entity/login.entity';
import { UsersService } from '../../services/user/user.service';

@Controller('user/login')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/')
  async login(@Body() body: LoginDto): Promise<LoginEntity> {
    const userData: User = await this.authService.validateUser(
      body.email,
      body.password,
    );

    if (!userData) throw new UnauthorizedException('invalid_credentials');

    return new LoginEntity({
      img: userData.img,
      role: userData.role,
      empresa: userData.empresa,
    });
  }
}
