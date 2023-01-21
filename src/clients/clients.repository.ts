import { Client } from './clients.model';
import {
  IClientsRepository,
  ICreateClientDTO,
  IFindClientDTO,
} from './structures';
import { injectable } from 'tsyringe';

@injectable()
export class ClientsRepository implements IClientsRepository {
  async create(data: ICreateClientDTO): Promise<Client> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, data: Partial<ICreateClientDTO>): Promise<Client> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async find(id: IFindClientDTO): Promise<Client> {
    throw new Error('Method not implemented.');
  }
}
