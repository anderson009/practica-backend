import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryRequestDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  public page = 1;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  public limit = 25;

  @IsOptional()
  public orderField: string;

  @IsOptional()
  public orderType: 'asc' | 'desc';
}
