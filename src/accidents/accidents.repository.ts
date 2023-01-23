import { Accident } from './accidents.model';
import {
  IAccidentsRepository,
  ICreateAccidentDTO,
  IFindManyAccidentsDTO,
  IUpdateAccidentDTO,
} from './structures';
import { dataSource } from '../database';
import { CustomError, ErrorIdentifier } from '../errors';
import { handleDatabaseError } from '../utils';
import { IPaginatedList } from '../structures';
import { ThirdPartyPerson } from '../third_party_people/third_party_people.model';
import { ICreateThirdPartyPersonDTO } from '../third_party_people/structures';

export class AccidentsRepository implements IAccidentsRepository {
  private repository = dataSource.getRepository(Accident);

  async create(data: ICreateAccidentDTO): Promise<Accident> {
    try {
      const { thirdPartyPeople } = data;
      const thirdPartyPeopleToInsert = await this.getThirdPartyPeopleToInsert(
        thirdPartyPeople,
      );

      const entity = this.repository.create({
        ...data,
        thirdPartyPeople: thirdPartyPeopleToInsert,
      });
      const savedRegister = await this.repository.save(entity);

      return savedRegister;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async update(id: string, data: IUpdateAccidentDTO): Promise<Accident> {
    try {
      const { thirdPartyPeople } = data;
      const thirdPartyPeopleToInsert = await this.getThirdPartyPeopleToInsert(
        thirdPartyPeople,
      );

      const savedRegister = await this.repository.save({
        ...data,
        thirdPartyPeople: thirdPartyPeopleToInsert,
        id,
      });

      if (!savedRegister) {
        throw new CustomError(
          'Accident not found.',
          ErrorIdentifier.THIRD_PARTY_PERSON_NOT_FOUND,
          404,
        );
      }

      return savedRegister;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedRegister = await this.repository.save({
        id,
        deletedAt: new Date(),
      });

      if (!deletedRegister) {
        throw new CustomError(
          'Accident not found.',
          ErrorIdentifier.THIRD_PARTY_PERSON_NOT_FOUND,
          404,
        );
      }
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  async findById(id: string): Promise<Accident> {
    try {
      const register = await this.repository.findOne({
        where: { id },
        relations: ['thirdPartyPeople'],
      });

      if (!register) {
        throw new CustomError(
          'Accident not found.',
          ErrorIdentifier.ACCIDENT_NOT_FOUND,
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
  }: IFindManyAccidentsDTO): Promise<IPaginatedList<Accident>> {
    try {
      const totalCount = await this.repository.count({
        withDeleted: !!deleted,
      });

      const registers = await this.repository.find({
        skip: page * itemsPerPage,
        take: itemsPerPage,
        withDeleted: !!deleted,
        relations: ['thirdPartyPeople'],
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

  private async getThirdPartyPeopleToInsert(
    thirdPartyPeople: ICreateThirdPartyPersonDTO[],
  ): Promise<ICreateThirdPartyPersonDTO[]> {
    if (!thirdPartyPeople?.length) return [];

    const thirdPartiesDocuments = thirdPartyPeople.map(
      (thirdParty) => thirdParty.document,
    );

    const existingThirdPartyDocuments = await dataSource
      .createQueryBuilder(ThirdPartyPerson, 'third_party_people')
      .select()
      .where('third_party_people.document IN (:...thirdPartiesDocuments)', {
        thirdPartiesDocuments,
      })
      .getMany();

    const peopleThatDoesNotExist = thirdPartyPeople.filter(
      (person) =>
        !existingThirdPartyDocuments.find(
          (existingPerson) => existingPerson.document === person.document,
        ),
    );

    return [...existingThirdPartyDocuments, ...peopleThatDoesNotExist];
  }
}
