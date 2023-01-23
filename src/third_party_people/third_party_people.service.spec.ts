import { ThirdPartyPerson } from './third_party_people.model';
import { ThirdPartyPeopleRepository } from './third_party_people.repository';
import { ThirdPartyPeopleService } from './third_party_people.service';
import {
  createThirdPartyPersonDTOMock,
  thirdPartyPersonMock,
  thirdPartyPersonPaginatedListMock,
} from './mocks';

describe('thirdPartyPeopleService', () => {
  const thirdPartyPeopleRepository = new ThirdPartyPeopleRepository();
  const thirdPartyPeopleService = new ThirdPartyPeopleService(
    thirdPartyPeopleRepository,
  );

  it('should create a thirdPartyPerson', async () => {
    expect(thirdPartyPeopleService.create).toBeDefined();

    jest
      .spyOn(thirdPartyPeopleRepository, 'create')
      .mockResolvedValue(thirdPartyPersonMock);

    const thirdPartyPerson = await thirdPartyPeopleService.create(
      createThirdPartyPersonDTOMock,
    );

    expect(thirdPartyPerson).toBeDefined();
    expect(thirdPartyPerson).toHaveProperty('id', thirdPartyPersonMock.id);
    expect(thirdPartyPerson).toHaveProperty(
      'document',
      thirdPartyPersonMock.document,
    );
    expect(thirdPartyPerson).toHaveProperty('name', thirdPartyPersonMock.name);
    expect(thirdPartyPerson).toHaveProperty(
      'email',
      thirdPartyPersonMock.email,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'phone',
      thirdPartyPersonMock.phone,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'birthDate',
      thirdPartyPersonMock.birthDate,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'createdAt',
      thirdPartyPersonMock.createdAt,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'updatedAt',
      thirdPartyPersonMock.updatedAt,
    );
    expect(thirdPartyPerson).toHaveProperty('deletedAt', null);
  });

  it('should update a thirdPartyPerson', async () => {
    expect(thirdPartyPeopleService.update).toBeDefined();

    const updatedName = 'Mocked Name Updated';

    jest
      .spyOn(thirdPartyPeopleRepository, 'update')
      .mockResolvedValue(
        Object.assign(thirdPartyPersonMock, { name: updatedName }),
      );

    const thirdPartyPerson = await thirdPartyPeopleService.update(
      thirdPartyPersonMock.id,
      {
        name: updatedName,
      },
    );

    expect(thirdPartyPerson).toBeDefined();
    expect(thirdPartyPerson).toHaveProperty('id', thirdPartyPersonMock.id);
    expect(thirdPartyPerson).toHaveProperty(
      'document',
      thirdPartyPersonMock.document,
    );
    expect(thirdPartyPerson).toHaveProperty('name', updatedName);
    expect(thirdPartyPerson).toHaveProperty(
      'email',
      thirdPartyPersonMock.email,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'phone',
      thirdPartyPersonMock.phone,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'birthDate',
      thirdPartyPersonMock.birthDate,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'createdAt',
      thirdPartyPersonMock.createdAt,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'updatedAt',
      thirdPartyPersonMock.updatedAt,
    );
    expect(thirdPartyPerson).toHaveProperty('deletedAt', null);
  });

  it('should delete a thirdPartyPerson', async () => {
    expect(thirdPartyPeopleService.delete).toBeDefined();

    jest
      .spyOn(thirdPartyPeopleRepository, 'delete')
      .mockResolvedValue(undefined);

    const deleteResult = await thirdPartyPeopleService.delete(
      thirdPartyPersonMock.id,
    );

    expect(deleteResult).toBeUndefined();
  });

  it('should find a thirdPartyPerson', async () => {
    expect(thirdPartyPeopleService.findById).toBeDefined();

    jest
      .spyOn(thirdPartyPeopleRepository, 'findById')
      .mockResolvedValue(thirdPartyPersonMock);

    const thirdPartyPerson = await thirdPartyPeopleService.findById(
      thirdPartyPersonMock.id,
    );

    expect(thirdPartyPerson).toBeDefined();
    expect(thirdPartyPerson).toHaveProperty('id', thirdPartyPersonMock.id);
    expect(thirdPartyPerson).toHaveProperty(
      'document',
      thirdPartyPersonMock.document,
    );
    expect(thirdPartyPerson).toHaveProperty('name', thirdPartyPersonMock.name);
    expect(thirdPartyPerson).toHaveProperty(
      'email',
      thirdPartyPersonMock.email,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'phone',
      thirdPartyPersonMock.phone,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'birthDate',
      thirdPartyPersonMock.birthDate,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'createdAt',
      thirdPartyPersonMock.createdAt,
    );
    expect(thirdPartyPerson).toHaveProperty(
      'updatedAt',
      thirdPartyPersonMock.updatedAt,
    );
    expect(thirdPartyPerson).toHaveProperty('deletedAt', null);
  });

  it('should find multiple thirdPartyPeople', async () => {
    expect(thirdPartyPeopleService.findById).toBeDefined();

    jest
      .spyOn(thirdPartyPeopleRepository, 'findMany')
      .mockResolvedValue(thirdPartyPersonPaginatedListMock);

    const paginatedResponse = await thirdPartyPeopleService.findMany({});

    expect(paginatedResponse).toBeDefined();
    expect(paginatedResponse).toHaveProperty('items');
    expect(paginatedResponse).toHaveProperty('totalItems');
    expect(paginatedResponse).toHaveProperty('page');
    expect(paginatedResponse).toHaveProperty('itemsPerPage');
    expect(paginatedResponse.items?.[0]).toBeDefined();
    expect(paginatedResponse.items[0]).toBeInstanceOf(ThirdPartyPerson);
  });
});
