import { IPaginatedList } from '../structures';
import { ThirdPartyPerson } from './third_party_people.model';

export interface ICreateThirdPartyPersonDTO {
  document: string;
  name: string;
  email?: string;
  phone?: string;
  birthDate?: string;
}

export interface IUpdateThirdPartyPersonDTO {
  document?: string;
  name?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  deletedAt?: string | null;
}

export interface IFindManyThirdPartyPeopleDTO {
  page?: number;
  itemsPerPage?: number;
  deleted?: boolean;
}

export interface IThirdPartyPeopleService {
  create(data: ICreateThirdPartyPersonDTO): Promise<ThirdPartyPerson>;
  update(
    id: string,
    data: Partial<ICreateThirdPartyPersonDTO>,
  ): Promise<ThirdPartyPerson>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ThirdPartyPerson>;
  findMany(
    filters: IFindManyThirdPartyPeopleDTO,
  ): Promise<IPaginatedList<ThirdPartyPerson>>;
}

export interface IThirdPartyPeopleRepository {
  create(data: ICreateThirdPartyPersonDTO): Promise<ThirdPartyPerson>;
  update(
    id: string,
    data: Partial<ICreateThirdPartyPersonDTO>,
  ): Promise<ThirdPartyPerson>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ThirdPartyPerson>;
  findMany(
    filters: IFindManyThirdPartyPeopleDTO,
  ): Promise<IPaginatedList<ThirdPartyPerson>>;
}
