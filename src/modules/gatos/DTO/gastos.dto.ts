import { IsEmail, IsNotEmpty } from 'class-validator';

export class gastosDto {
  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  montoTotal: number;

  @IsNotEmpty()
  concepto: string;

  @IsNotEmpty()
  metodoDePago: string;
}
