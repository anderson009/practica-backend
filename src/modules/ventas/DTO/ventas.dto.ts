import { IsNotEmpty } from 'class-validator';

export class VentasDto {
  @IsNotEmpty()
  products: [];

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  concepto: number;

  @IsNotEmpty()
  metodoDePago: string;
}
