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

  @Expose()
  costoUnitario: number;

  @Expose()
  ganancia: number;

  @Expose()
  total: number;

  @Expose()
  cantidad: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class VentasEntity {
  @Expose()
  @Transform(({ value, obj }) => {
    if (obj['_id']) return obj['_id'].toString();
    return value;
  })
  id: string;

  @Expose()
  metodoDePago: string;

  @Expose()
  type: 'ventas' | 'gastos';

  @Expose()
  fecha: Date;

  @Expose()
  concepto: string;

  @Expose()
  totalVentas: number;

  @Expose()
  categoria: string;

  @Expose()
  totalGastos: number;

  @Expose()
  ganancia: number;

  @Expose()
  @Type(() => ProductsEntity)
  productos: [];

  @Expose()
  productosTotales: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
