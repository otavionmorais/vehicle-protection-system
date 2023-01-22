import { Client } from './clients.model';
import { ClientsService } from './clients.service';
import { IClientsController, ICreateClientDTO } from './structures';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ClientsController implements IClientsController {
  constructor(
    @inject(ClientsService)
    private clientsService: ClientsService,
  ) {}

  async create(data: ICreateClientDTO): Promise<Client> {
    return this.clientsService.create(data);
  }
}
