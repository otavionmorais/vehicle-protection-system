import { Client } from './clients.model';
import {
  IClientsRepository,
  ICreateClientDTO,
  IFindClientDTO,
} from './structures';
import { dataSource } from '../database';
import { CustomError, ErrorIdentifier } from '../errors';

export class ClientsRepository implements IClientsRepository {
  private repository = dataSource.getRepository(Client);

  async create(data: ICreateClientDTO): Promise<Client> {
    try {
      const entity = this.repository.create(data);
      const savedRegister = await this.repository.save(entity);

      return savedRegister;
    } catch (error) {
      console.error('Database error: ', error);
      throw new CustomError(
        'An unexpected error occurred. Try again later.',
        ErrorIdentifier.INTERNAL_SERVER_ERROR,
        500,
      );
    }
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
