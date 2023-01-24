import { Client } from './clients.model';
import {
  IClientsRepository,
  ICreateClientDTO,
  IFindManyClientsDTO,
  IUpdateClientDTO,
} from './structures';
import { dataSource } from '../database';
import { CustomError, ErrorIdentifier } from '../errors';
import { handleDatabaseError } from '../utils';
import { IPaginatedList } from 'src/structures';

export class ClientsRepository implements IClientsRepository {
  private repository = dataSource.getRepository(Client);

  async create(data: ICreateClientDTO): Promise<Client> {
    try {
      const entity = this.repository.create(data);
      const savedRegister = await this.repository.save(entity);

      return savedRegister;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(id: string, data: IUpdateClientDTO): Promise<Client> {
    try {
      const savedRegister = await this.repository
        .createQueryBuilder()
        .update()
        .set(data)
        .where('id = :id', { id })
        .returning('*')
        .execute();

      if (!savedRegister.raw[0]) {
        throw new CustomError(
          'Client not found.',
          ErrorIdentifier.CLIENT_NOT_FOUND,
          404,
        );
      }

      return new Client().build(savedRegister.raw[0]);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedRegister = await this.repository
        .createQueryBuilder()
        .softDelete()
        .where('id = :id', { id })
        .execute();

      if (!deletedRegister.affected) {
        throw new CustomError(
          'Client not found.',
          ErrorIdentifier.CLIENT_NOT_FOUND,
          404,
        );
      }
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findById(id: string): Promise<Client> {
    try {
      const register = await this.repository.findOne({
        where: { id },
      });

      if (!register) {
        throw new CustomError(
          'Client not found.',
          ErrorIdentifier.CLIENT_NOT_FOUND,
          404,
        );
      }

      return register;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findByDocument(document: string): Promise<Client> {
    try {
      const register = await this.repository.findOne({
        where: { document },
      });

      return register;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findMany({
    page = 0,
    itemsPerPage = 20,
    deleted,
  }: IFindManyClientsDTO): Promise<IPaginatedList<Client>> {
    try {
      const totalCount = await this.repository.count({
        withDeleted: !!deleted,
      });

      const registers = await this.repository.find({
        skip: page * itemsPerPage,
        take: itemsPerPage,
        withDeleted: !!deleted,
      });

      return {
        page: page,
        itemsPerPage: itemsPerPage,
        totalItems: totalCount,
        items: registers,
      };
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}
