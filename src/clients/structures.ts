import { IPaginatedList } from '../structures';
import { Client } from './clients.model';

export interface ICreateClientDTO {
  document: string;
  name: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  password: string;
}

export interface IUpdateClientDTO {
  document?: string;
  name?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  password?: string;
  deletedAt?: string | null;
}

export interface IFindManyClientsDTO {
  page?: number;
  itemsPerPage?: number;
  deleted?: boolean;
}

export interface IClientsController {
  create(data: ICreateClientDTO): Promise<Client>;
  update(id: string, data: Partial<ICreateClientDTO>): Promise<Client>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Client>;
  findMany(filters: IFindManyClientsDTO): Promise<IPaginatedList<Client>>;
}

export interface IClientsService {
  create(data: ICreateClientDTO): Promise<Client>;
  update(id: string, data: Partial<ICreateClientDTO>): Promise<Client>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Client>;
  findMany(filters: IFindManyClientsDTO): Promise<IPaginatedList<Client>>;
}

export interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  update(id: string, data: Partial<ICreateClientDTO>): Promise<Client>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Client>;
  findByDocument(document: string): Promise<Client>;
  findMany(filters: IFindManyClientsDTO): Promise<IPaginatedList<Client>>;
}
