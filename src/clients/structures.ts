import { Client } from './clients.model';

export interface ICreateClientDTO {
  document: string;
  name: string;
  email: string;
  phone: string;
  birth_date: Date;
  password: string;
}

export interface IFindClientDTO {
  id?: string;
  document?: string;
  email?: string;
}

export interface IClientsController {
  create(data: ICreateClientDTO): Promise<Client>;
}

export interface IClientsService {
  create(data: ICreateClientDTO): Promise<Client>;
  update(id: string, data: Partial<ICreateClientDTO>): Promise<Client>;
  delete(id: string): Promise<void>;
  find(id: IFindClientDTO): Promise<Client>;
  authenticate(email: string, password: string): Promise<Client>;
}

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  update(id: string, data: Partial<ICreateClientDTO>): Promise<Client>;
  delete(id: string): Promise<void>;
  find(id: IFindClientDTO): Promise<Client>;
}
