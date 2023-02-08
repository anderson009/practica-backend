import { DataUserAuth } from '../../interfaces/userAuth';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../models/user/index';
import { compare } from 'bcrypt';
import { UsersService } from '../user/services/user/user.service';

@Injectable()
export class AuthService {
  private usersServices: UsersService;
  constructor(
    private readonly jwtService: JwtService,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit(): void {
    this.usersServices = this.moduleRef.get(UsersService, { strict: false });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user: User = await this.usersServices.findByUserName(email);

    if (!user) return null;

    const checkPassword = await compare(pass, user.password);
    if (!checkPassword) return null;

    const _user: User = user;
    delete _user.password;
    _user._id = user._id;
    return _user;
  }

  login(user: User): string {
    const payload = {
      sub: user._id,
    };

    return this.jwtService.sign(payload);
  }

  async getDataUser(userId: string): Promise<DataUserAuth> {
    return this.usersServices.getDataAuthUser(userId);
  }
}
