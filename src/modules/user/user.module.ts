import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { providerUserModel } from '../../models/user/index';
import { AuthModule } from '../auth/auth.module';
import { LoginController } from './controllers/login/login.controller';
import { UsersService } from './services/user/user.service';
import { RegisterService } from './services/register/register.service';
import { RegisterController } from './controllers/register/user.service.controller';

@Module({
  imports: [MongooseModule.forFeature([providerUserModel]), AuthModule],
  controllers: [LoginController, RegisterController],
  providers: [RegisterService, UsersService],
})
export class UserModule {}
