import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: { sub: string }): Promise<any> {
    const result = await this.authService.getDataUser(payload.sub);

    if (!result) throw new UnauthorizedException();

    request.dataUser = result;

    const responJwt = { sub: payload.sub };

    return responJwt;
  }
}
