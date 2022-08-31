import { AppConfig } from './../../config/config';
import { AuthService } from './services/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel, providerUserModel } from '../../models/user/index';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(providerUserModel.name)
    private readonly userModel: typeof UserModel,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AppConfig.tokenSecret,
    });
  }

  async validate(payload: any): Promise<any> {
    const { email } = payload;
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
