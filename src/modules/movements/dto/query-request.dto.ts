import { QueryRequestDto } from '../../../dto/query-request.dto';
import { IsOptional } from 'class-validator';

class Filter {
  @IsOptional()
  inGmae?: boolean;

  @IsOptional()
  vendor?: boolean;

  @IsOptional()
  premium?: boolean;

  @IsOptional()
  buyWith?: string;
}

export class QueryFindAllDto extends QueryRequestDto {
  @IsOptional()
  searchText?: string;

  @IsOptional()
  filter: Filter;
}
