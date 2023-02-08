import { IsEmail, IsNotEmpty } from 'class-validator';

export class gastosDto {
  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  totalGastos: number;

  @IsNotEmpty()
  concepto: string;

  @IsNotEmpty()
  metodoDePago: string;
}
