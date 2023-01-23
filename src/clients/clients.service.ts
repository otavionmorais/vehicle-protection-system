import { instanceToInstance } from 'class-transformer';
import { injectable, inject } from 'tsyringe';
import { hash } from 'bcrypt';
import { Client } from './clients.model';
import { ClientsRepository } from './clients.repository';
import {
  IClientsRepository,
  IClientsService,
  ICreateClientDTO,
  IFindManyClientsDTO,
  IUpdateClientDTO,
} from './structures';
import { IPaginatedList } from 'src/structures';

@injectable()
export class ClientsService implements IClientsService {
  constructor(
    @inject(ClientsRepository)
    private clientsRepository: IClientsRepository,
  ) {}

  async create(data: ICreateClientDTO): Promise<Client> {
    const hashedPassword = await hash(data.password, 12);

    const result = await this.clientsRepository.create({
      ...data,
      password: hashedPassword,
    });
    return instanceToInstance(result);
  }

  async update(id: string, data: IUpdateClientDTO): Promise<Client> {
    let hashedPassword: string | undefined;

    if (data.password) {
      hashedPassword = await hash(data.password, 12);
    }

    const result = await this.clientsRepository.update(id, {
      ...data,
      ...(hashedPassword && { password: hashedPassword }),
    });
    return instanceToInstance(result);
  }

  delete(id: string): Promise<void> {
    return this.clientsRepository.delete(id);
  }

  findById(id: string): Promise<Client> {
    return instanceToInstance(this.clientsRepository.findById(id));
  }

  findMany(filters: IFindManyClientsDTO): Promise<IPaginatedList<Client>> {
    return instanceToInstance(this.clientsRepository.findMany(filters));
  }
}
