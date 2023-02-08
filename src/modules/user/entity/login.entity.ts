import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginEntity {
  @Expose()
  empresa: string;

  @Expose()
  role: string;

  @Expose()
  img: string;

  constructor(partial: Partial<LoginEntity>) {
    Object.assign(this, partial);
  }
}
