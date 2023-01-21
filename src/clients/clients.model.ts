import { Exclude } from 'class-transformer';

export class Client {
  id: string;

  document: string;

  name: string;

  email: string;

  phone: string;

  birth_date: Date;

  @Exclude()
  password: string;

  created_at: Date;

  updated_at: Date;
}
