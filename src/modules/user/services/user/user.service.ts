import { DataUserAuth } from '../../../../interfaces/userAuth';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  UserModel,
  providerUserModel,
  User,
} from '../../../../models/user/index';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(providerUserModel.name)
    private readonly userModel: typeof UserModel,
  ) {}

  async getDataAuthUser(userId: string): Promise<DataUserAuth> {
    const prom: any = [this.userModel.findOne({ _id: userId }).lean()];

    const [user] = await Promise.all<[User]>(prom);

    if (!user) return null;

    const response: DataUserAuth = {
      id: user._id.toString(),
      company: user.company,
      email: user.email,
      img: user.img,
    };

    return response;
  }

  async findByUserName(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean();
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).lean();
  }
}
