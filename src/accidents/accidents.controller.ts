import { Accident } from './accidents.model';
import { AccidentsService } from './accidents.service';
import {
  IAccidentsController,
  IAccidentsService,
  ICreateAccidentDTO,
  IFindManyAccidentsDTO,
  IUpdateAccidentDTO,
} from './structures';
import { inject, injectable } from 'tsyringe';
import { IPaginatedList } from '../structures';

@injectable()
export class AccidentsController implements IAccidentsController {
  constructor(
    @inject(AccidentsService)
    private accidentsService: IAccidentsService,
  ) {}

  findMany(filters: IFindManyAccidentsDTO): Promise<IPaginatedList<Accident>> {
    return this.accidentsService.findMany(filters);
  }

  findById(id: string): Promise<Accident> {
    return this.accidentsService.findById(id);
  }

  create(data: ICreateAccidentDTO): Promise<Accident> {
    return this.accidentsService.create(data);
  }

  update(id: string, data: IUpdateAccidentDTO): Promise<Accident> {
    return this.accidentsService.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.accidentsService.delete(id);
  }
}
