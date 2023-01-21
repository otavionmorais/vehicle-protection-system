import { instanceToInstance } from 'class-transformer';
import { injectable } from 'tsyringe';
import { Client } from './clients.model';
import { ClientsRepository } from './clients.repository';
import {
  IClientsService,
  ICreateClientDTO,
  IFindClientDTO,
} from './structures';

@injectable()
export class ClientsService implements IClientsService {
  constructor(private clientsRepository: ClientsRepository) {}

  async create(data: ICreateClientDTO): Promise<Client> {
    return instanceToInstance(this.clientsRepository.create(data));
  }

  update(id: string, data: Partial<ICreateClientDTO>): Promise<Client> {
    return instanceToInstance(this.clientsRepository.update(id, data));
  }

  delete(id: string): Promise<void> {
    return instanceToInstance(this.clientsRepository.delete(id));
  }

  find(filters: IFindClientDTO): Promise<Client> {
    return instanceToInstance(this.clientsRepository.find(filters));
  }

  async authenticate(email: string, password: string): Promise<Client> {
    throw new Error('Method not implemented.');
  }
}
