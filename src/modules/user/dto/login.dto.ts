import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @MinLength(4)
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
