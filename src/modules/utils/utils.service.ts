import { QueryRequestDto } from './../../dto/query-request.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  public getPageData(params: QueryRequestDto): {
    limit: number;
    offset: number;
  } {
    const { limit, page } = params;

    const offset = (page - 1) * limit;

    return { limit, offset };
  }

  public searchText(text: string, fields: string[]): Record<string, any> {
    const regex = new RegExp(text);
    const list = fields.map((field) => ({ [field]: regex }));

    return list;
  }
}
