import { IsNotEmpty } from 'class-validator';

export class ProductosDto {
  @IsNotEmpty()
  name: string;

  precioUnitario: string;

  costoUnitario: string;

  categoria: string;

  descripcion: string;

  @IsNotEmpty()
  cantidadDisp: string;

  img: string;
}
