import { IsNotEmpty, IsOptional } from 'class-validator';

export class SalesDto {
  @IsOptional()
  products: [];

  @IsNotEmpty()
  totals: number;

  @IsNotEmpty()
  concepto: number;

  @IsNotEmpty()
  metodoDePago: string;

  @IsNotEmpty()
  type: string;

  @IsOptional()
  categoria: string;
}
