import { ThirdPartyPerson } from './third_party_people.model';
import {
  IThirdPartyPeopleRepository,
  ICreateThirdPartyPersonDTO,
  IFindManyThirdPartyPeopleDTO,
  IUpdateThirdPartyPersonDTO,
} from './structures';
import { dataSource } from '../database';
import { CustomError, ErrorIdentifier } from '../errors';
import { handleDatabaseError } from '../utils';
import { IPaginatedList } from 'src/structures';

export class ThirdPartyPeopleRepository implements IThirdPartyPeopleRepository {
  private repository = dataSource.getRepository(ThirdPartyPerson);

  async create(data: ICreateThirdPartyPersonDTO): Promise<ThirdPartyPerson> {
    try {
      const entity = this.repository.create(data);
      const savedRegister = await this.repository.save(entity);

      return savedRegister;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(
    id: string,
    data: IUpdateThirdPartyPersonDTO,
  ): Promise<ThirdPartyPerson> {
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
          'ThirdPartyPerson not found.',
          ErrorIdentifier.THIRD_PARTY_PERSON_NOT_FOUND,
          404,
        );
      }

      return new ThirdPartyPerson().build(savedRegister.raw[0]);
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
          'ThirdPartyPerson not found.',
          ErrorIdentifier.THIRD_PARTY_PERSON_NOT_FOUND,
          404,
        );
      }
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findById(id: string): Promise<ThirdPartyPerson> {
    try {
      const register = await this.repository.findOne({
        where: { id },
      });

      if (!register) {
        throw new CustomError(
          'ThirdPartyPerson not found.',
          ErrorIdentifier.THIRD_PARTY_PERSON_NOT_FOUND,
          404,
        );
      }

      return register;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findMany({
    page = 0,
    itemsPerPage = 20,
    deleted,
  }: IFindManyThirdPartyPeopleDTO): Promise<IPaginatedList<ThirdPartyPerson>> {
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
