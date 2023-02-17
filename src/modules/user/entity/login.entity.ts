import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginEntity {
  @Expose()
  company: string;

  @Expose()
  role: string;

  @Expose()
  img: string;

  @Expose()
  token: any;

  constructor(partial: Partial<LoginEntity>) {
    Object.assign(this, partial);
  }
}
