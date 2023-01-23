import { Client } from './clients.model';
import { ClientsService } from './clients.service';
import {
  IClientsController,
  IClientsService,
  ICreateClientDTO,
  IFindManyClientsDTO,
  IUpdateClientDTO,
} from './structures';
import { inject, injectable } from 'tsyringe';
import { IPaginatedList } from 'src/structures';

@injectable()
export class ClientsController implements IClientsController {
  constructor(
    @inject(ClientsService)
    private clientsService: IClientsService,
  ) {}

  findMany(filters: IFindManyClientsDTO): Promise<IPaginatedList<Client>> {
    return this.clientsService.findMany(filters);
  }

  findOne(id: string): Promise<Client> {
    return this.clientsService.findById(id);
  }

  create(data: ICreateClientDTO): Promise<Client> {
    return this.clientsService.create(data);
  }

  update(id: string, data: IUpdateClientDTO): Promise<Client> {
    return this.clientsService.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.clientsService.delete(id);
  }
}
