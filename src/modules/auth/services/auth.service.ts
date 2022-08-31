import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../../../models/user/type';
import { providerUserModel, UserModel } from '../../../models/user/index';
import { LoginDto } from '../DTO/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly moduleRef: ModuleRef,
    @InjectModel(providerUserModel.name)
    private readonly userModel: typeof UserModel,
  ) {}

  async login(dto: LoginDto): Promise<any> {
    const { email } = dto;

    const user: User = await this.userModel.findOne({ email: email });

    if (!user) throw new UnauthorizedException('Email incorrecto');

    const validPassword = await bcrypt.compare(dto.password, user.password);

    if (!validPassword) throw new UnauthorizedException('password incorrecto');

    const token = this.payload(user);

    return {token, user};
  }

  payload(user: User): any {
    const payload: any = {
      id: user.id,
      name: user.empresa,
      email: user.email,
    };

    const jwt = this.jwtService.sign(payload);

    return { token: jwt };
  }

}
