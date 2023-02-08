import { IsNotEmpty } from 'class-validator';

export class VentasDto {
  @IsNotEmpty()
  products: [];

  @IsNotEmpty()
  totalVentas: number;

  @IsNotEmpty()
  concepto: number;

  @IsNotEmpty()
  metodoDePago: string;
}
