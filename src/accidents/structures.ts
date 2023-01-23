import { ICreateThirdPartyPersonDTO } from '../third_party_people/structures';
import { ThirdPartyPerson } from '../third_party_people/third_party_people.model';
import { IPaginatedList } from '../structures';
import { Accident } from './accidents.model';

export interface ICreateAccidentDTO {
  clientId: string;
  vehiclePlate: string;
  vehicleModel: string;
  vehicleColor: string;
  description: string;
  thirdPartyPeople?: ICreateThirdPartyPersonDTO[];
}

export interface IUpdateAccidentDTO {
  clientId?: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  description?: string;
  thirdPartyPeople?: ThirdPartyPerson[];
  deletedAt?: string | null;
}

export interface IFindManyAccidentsDTO {
  page?: number;
  itemsPerPage?: number;
  deleted?: boolean;
}

export interface IAccidentsController {
  create(data: ICreateAccidentDTO): Promise<Accident>;
  update(id: string, data: Partial<ICreateAccidentDTO>): Promise<Accident>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Accident>;
  findMany(filters: IFindManyAccidentsDTO): Promise<IPaginatedList<Accident>>;
}

export interface IAccidentsService {
  create(data: ICreateAccidentDTO): Promise<Accident>;
  update(id: string, data: Partial<ICreateAccidentDTO>): Promise<Accident>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Accident>;
  findMany(filters: IFindManyAccidentsDTO): Promise<IPaginatedList<Accident>>;
}

export interface IAccidentsRepository {
  create(data: ICreateAccidentDTO): Promise<Accident>;
  update(id: string, data: Partial<ICreateAccidentDTO>): Promise<Accident>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Accident>;
  findMany(filters: IFindManyAccidentsDTO): Promise<IPaginatedList<Accident>>;
}
