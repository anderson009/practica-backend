import { IsNotEmpty } from 'class-validator';

export class ProductosDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  precioUnitario: number;

  @IsNotEmpty()
  costoUnitario: number;

 

  descripcion: string;

  @IsNotEmpty()
  cantidadDisp: number;

  img: string;
}
