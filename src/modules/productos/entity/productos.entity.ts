import { Exclude, Expose, Transform, Type } from 'class-transformer';

@Exclude()
export class ProductsEntity {
  @Expose()
  @Transform(({ value, obj }) => {
    if (obj['_id']) return obj['_id'].toString();
    return value;
  })
  id: string;

  @Expose()
  name: string;

  @Expose()
  precioUnitario: number;

  costoUnitario: number;

  @Expose()
  total: number;

  @Expose()
  cantidad: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ProductosEntity {
  @Expose()
  @Transform(({ value, obj }) => {
    if (obj['_id']) return obj['_id'].toString();
    return value;
  })
  id: string;

  @Expose()
  name: string;

  @Expose()
  precioUnitario: number;

  @Expose()
  costoUnitario: number;

  @Expose()
  costoTotal: number;

  precioTotal: number;

  @Expose()
  categoria: string;

  @Expose()
  descripcion: string;

  @Expose()
  cantidadDisp: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
