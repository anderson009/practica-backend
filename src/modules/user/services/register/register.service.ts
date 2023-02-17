import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { hash } from 'bcrypt';
import { RegisterDto } from '../../dto/register.dto';
import { providerUserModel, UserModel } from '../../../../models/user/index';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(providerUserModel.name)
    private readonly userModel: typeof UserModel,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, password } = registerDto;
    const checkUserEmail = await this.userModel.findOne({ email });

    if (checkUserEmail) throw new ConflictException('email_already_exists');

    const hashedPassword = await hash(password, 10);
    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      company: registerDto.company,
      img: registerDto.img,
      role: 'user-Role',
    });

    createdUser.save();
  }

  // async confirmAccount(dto: ConfirmAccountDto): Promise<void> {
  //   const { verificationCode } = dto;
  //   const userToken = await this.userModel.findOne({
  //     verificationCode: verificationCode,
  //     status: 'inactive',
  //   });

  //   if (!userToken) throw new NotFoundException();

  //   await this.userModel.updateOne(
  //     { _id: userToken._id },
  //     {
  //       $set: {
  //         status: 'active',
  //       },
  //       $unset: {
  //         verificationCode: 1,
  //       },
  //     },
  //   );
  // }
}
