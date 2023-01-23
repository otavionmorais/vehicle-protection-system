import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';
import { ThirdPartyPerson } from './third_party_people.model';
import { ThirdPartyPeopleRepository } from './third_party_people.repository';
import {
  IThirdPartyPeopleRepository,
  IThirdPartyPeopleService,
  ICreateThirdPartyPersonDTO,
  IFindManyThirdPartyPeopleDTO,
  IUpdateThirdPartyPersonDTO,
} from './structures';
import { IPaginatedList } from '../structures';

@injectable()
export class ThirdPartyPeopleService implements IThirdPartyPeopleService {
  constructor(
    @inject(ThirdPartyPeopleRepository)
    private thirdPartyPeopleRepository: IThirdPartyPeopleRepository,
  ) {}

  async create(data: ICreateThirdPartyPersonDTO): Promise<ThirdPartyPerson> {
    return instanceToInstance(this.thirdPartyPeopleRepository.create(data));
  }

  async update(
    id: string,
    data: IUpdateThirdPartyPersonDTO,
  ): Promise<ThirdPartyPerson> {
    return instanceToInstance(this.thirdPartyPeopleRepository.update(id, data));
  }

  delete(id: string): Promise<void> {
    return this.thirdPartyPeopleRepository.delete(id);
  }

  findById(id: string): Promise<ThirdPartyPerson> {
    return instanceToInstance(this.thirdPartyPeopleRepository.findById(id));
  }

  findMany(
    filters: IFindManyThirdPartyPeopleDTO,
  ): Promise<IPaginatedList<ThirdPartyPerson>> {
    return instanceToInstance(
      this.thirdPartyPeopleRepository.findMany(filters),
    );
  }
}
