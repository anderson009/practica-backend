import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { providerUserModel } from '../../models/user/index';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/config/config';

@Module({
  imports: [
    MongooseModule.forFeature([providerUserModel]),
    JwtModule.register({
      secret: AppConfig.tokenSecret,
      signOptions: {
        expiresIn:
          process.env.NODE_ENV === 'production' ? '2 days' : '100 days',
      },
    }),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
