import { IsNotEmpty } from 'class-validator';

export class UpdateCantDto {
  @IsNotEmpty()
  cantidad: number;
}
