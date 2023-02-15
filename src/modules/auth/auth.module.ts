import { AppConfig } from './../../config/config';
import { providerUserModel } from './../../models/user';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([providerUserModel]),
    JwtModule.register({
      secret: AppConfig.tokenSecret,
      signOptions: {
        expiresIn:
          process.env.NODE_ENV === 'production' ? '2 days' : '100 days',
      },
    }),
  ],

  providers: [AuthService, JwtStrategy, PassportModule],
  exports: [AuthService],
})
export class AuthModule {}
