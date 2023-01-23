import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';
import { Accident } from './accidents.model';
import { AccidentsRepository } from './accidents.repository';
import {
  IAccidentsRepository,
  IAccidentsService,
  ICreateAccidentDTO,
  IFindManyAccidentsDTO,
  IUpdateAccidentDTO,
} from './structures';
import { IPaginatedList } from '../structures';

@injectable()
export class AccidentsService implements IAccidentsService {
  constructor(
    @inject(AccidentsRepository)
    private accidentsRepository: IAccidentsRepository,
  ) {}

  async create(data: ICreateAccidentDTO): Promise<Accident> {
    return instanceToInstance(this.accidentsRepository.create(data));
  }

  async update(id: string, data: IUpdateAccidentDTO): Promise<Accident> {
    return instanceToInstance(this.accidentsRepository.update(id, data));
  }

  delete(id: string): Promise<void> {
    return this.accidentsRepository.delete(id);
  }

  findById(id: string): Promise<Accident> {
    return instanceToInstance(this.accidentsRepository.findById(id));
  }

  findMany(filters: IFindManyAccidentsDTO): Promise<IPaginatedList<Accident>> {
    return instanceToInstance(this.accidentsRepository.findMany(filters));
  }
}
