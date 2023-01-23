import { Client } from './clients.model';
import { ClientsRepository } from './clients.repository';
import { ClientsService } from './clients.service';
import {
  createClientDTOMock,
  clientMock,
  clientPaginatedListMock,
} from './mocks/index';

describe('ClientsService', () => {
  const clientsRepository = new ClientsRepository();
  const clientsService = new ClientsService(clientsRepository);

  it('should create a client', async () => {
    expect(clientsService.create).toBeDefined();

    jest.spyOn(clientsRepository, 'create').mockResolvedValue(clientMock);

    const client = await clientsService.create(createClientDTOMock);

    expect(client).toBeDefined();
    expect(client).toHaveProperty('id', clientMock.id);
    expect(client).toHaveProperty('document', clientMock.document);
    expect(client).toHaveProperty('name', clientMock.name);
    expect(client).toHaveProperty('email', clientMock.email);
    expect(client).toHaveProperty('phone', clientMock.phone);
    expect(client).toHaveProperty('birthDate', clientMock.birthDate);
    expect(client).toHaveProperty('createdAt', clientMock.createdAt);
    expect(client).toHaveProperty('updatedAt', clientMock.updatedAt);
    expect(client).toHaveProperty('deletedAt', null);
    expect(client).toHaveProperty('password', undefined);
  });

  it('should update a client', async () => {
    expect(clientsService.update).toBeDefined();

    const updatedName = 'Mocked Name Updated';

    jest
      .spyOn(clientsRepository, 'update')
      .mockResolvedValue(Object.assign(clientMock, { name: updatedName }));

    const client = await clientsService.update(clientMock.id, {
      name: updatedName,
    });

    expect(client).toBeDefined();
    expect(client).toHaveProperty('id', clientMock.id);
    expect(client).toHaveProperty('document', clientMock.document);
    expect(client).toHaveProperty('name', updatedName);
    expect(client).toHaveProperty('email', clientMock.email);
    expect(client).toHaveProperty('phone', clientMock.phone);
    expect(client).toHaveProperty('birthDate', clientMock.birthDate);
    expect(client).toHaveProperty('createdAt', clientMock.createdAt);
    expect(client).toHaveProperty('updatedAt', clientMock.updatedAt);
    expect(client).toHaveProperty('deletedAt', null);
    expect(client).toHaveProperty('password', undefined);
  });

  it('should delete a client', async () => {
    expect(clientsService.delete).toBeDefined();

    jest.spyOn(clientsRepository, 'delete').mockResolvedValue(undefined);

    const deleteResult = await clientsService.delete(clientMock.id);

    expect(deleteResult).toBeUndefined();
  });

  it('should find a client', async () => {
    expect(clientsService.findById).toBeDefined();

    jest.spyOn(clientsRepository, 'findById').mockResolvedValue(clientMock);

    const client = await clientsService.findById(clientMock.id);

    expect(client).toBeDefined();
    expect(client).toHaveProperty('id', clientMock.id);
    expect(client).toHaveProperty('document', clientMock.document);
    expect(client).toHaveProperty('name', clientMock.name);
    expect(client).toHaveProperty('email', clientMock.email);
    expect(client).toHaveProperty('phone', clientMock.phone);
    expect(client).toHaveProperty('birthDate', clientMock.birthDate);
    expect(client).toHaveProperty('createdAt', clientMock.createdAt);
    expect(client).toHaveProperty('updatedAt', clientMock.updatedAt);
    expect(client).toHaveProperty('deletedAt', null);
    expect(client).toHaveProperty('password', undefined);
  });

  it('should find multiple clients', async () => {
    expect(clientsService.findById).toBeDefined();

    jest
      .spyOn(clientsRepository, 'findMany')
      .mockResolvedValue(clientPaginatedListMock);

    const paginatedResponse = await clientsService.findMany({});

    expect(paginatedResponse).toBeDefined();
    expect(paginatedResponse).toHaveProperty('items');
    expect(paginatedResponse).toHaveProperty('totalItems');
    expect(paginatedResponse).toHaveProperty('page');
    expect(paginatedResponse).toHaveProperty('itemsPerPage');
    expect(paginatedResponse.items?.[0]).toBeDefined();
    expect(paginatedResponse.items[0]).toBeInstanceOf(Client);
  });
});
