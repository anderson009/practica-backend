import { IsNotEmpty } from 'class-validator';

export class BillsDto {
  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  totalGastos: number;

  @IsNotEmpty()
  concepto: string;

  @IsNotEmpty()
  metodoDePago: string;
}
