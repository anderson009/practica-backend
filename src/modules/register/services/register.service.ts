import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from '../DTO/register.dto';
import { providerUserModel, UserModel, User } from '../../../models/user/index';
import { hash } from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(providerUserModel.name)
    private readonly userModel: typeof UserModel,
  ) {}
  async registerUser(registerDto: RegisterDto): Promise<any> {
    const { email, password } = registerDto;
    const existEmail = await this.userModel.findOne({ email: email });

    if (existEmail) throw new ConflictException();

    const user = new this.userModel(registerDto);

    user.password = await hash(password, 10);

    await user.save();

    return {};
  }

  async getUsers(): Promise<any> {
    const [users, total] = await Promise.all([
      this.userModel.find({}).limit(5),
      this.userModel.countDocuments(),
    ]);

    if (users.length === 0) throw new NotFoundException('la lista esta vacia');

    return { users, total };
  }

  async getMyProfile(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ id: userId }).lean();

    return user;
  }
}
