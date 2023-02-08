import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { providerUserModel } from '../../models/user/index';
import { AuthModule } from '../auth/auth.module';
import { RegisterController } from '../register/controllers/register.controller';
import { RegisterService } from '../register/services/register.service';
import { LoginController } from './controllers/login/login.controller';
import { UsersService } from './services/user/user.service';

@Module({
  imports: [MongooseModule.forFeature([providerUserModel]), AuthModule],
  controllers: [LoginController, RegisterController],
  providers: [RegisterService, UsersService],
})
export class UserModule {}
