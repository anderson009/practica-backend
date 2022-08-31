import { AppConfig } from './../../config/config';
import { providerUserModel } from './../../models/user';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LoginController } from './controllers/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([providerUserModel]),
    PassportModule,
    JwtModule.register({
      secret: AppConfig.tokenSecret,
      signOptions: {
        expiresIn:
          process.env.NODE_ENV === 'production' ? '2 days' : '100 days',
      },
    }),
  ],
  controllers: [LoginController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule, JwtStrategy],
})
export class AuthModule {}
