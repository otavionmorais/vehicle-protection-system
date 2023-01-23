import { Accident } from './accidents.model';
import { AccidentsRepository } from './accidents.repository';
import { AccidentsService } from './accidents.service';
import {
  createAccidentDTOMock,
  accidentMock,
  accidentPaginatedListMock,
} from './mocks';

describe('accidentsService', () => {
  const accidentsRepository = new AccidentsRepository();
  const accidentsService = new AccidentsService(accidentsRepository);

  it('should create an accident', async () => {
    expect(accidentsService.create).toBeDefined();

    jest.spyOn(accidentsRepository, 'create').mockResolvedValue(accidentMock);

    const accident = await accidentsService.create(createAccidentDTOMock);

    expect(accident).toBeDefined();
    expect(accident).toHaveProperty('deletedAt', null);
  });

  it('should update an accident', async () => {
    expect(accidentsService.update).toBeDefined();

    const updatedDescription = 'Bateu no poste';

    jest
      .spyOn(accidentsRepository, 'update')
      .mockResolvedValue(
        Object.assign(accidentMock, { description: updatedDescription }),
      );

    const accident = await accidentsService.update(accidentMock.id, {
      description: updatedDescription,
    });

    expect(accident).toBeDefined();
    expect(accident).toHaveProperty('deletedAt', null);
  });

  it('should delete an accident', async () => {
    expect(accidentsService.delete).toBeDefined();

    jest.spyOn(accidentsRepository, 'delete').mockResolvedValue(undefined);

    const deleteResult = await accidentsService.delete(accidentMock.id);

    expect(deleteResult).toBeUndefined();
  });

  it('should find an accident', async () => {
    expect(accidentsService.findById).toBeDefined();

    jest.spyOn(accidentsRepository, 'findById').mockResolvedValue(accidentMock);

    const accident = await accidentsService.findById(accidentMock.id);

    expect(accident).toBeDefined();
    expect(accident).toHaveProperty('deletedAt', null);
  });

  it('should find multiple accidents', async () => {
    expect(accidentsService.findById).toBeDefined();

    jest
      .spyOn(accidentsRepository, 'findMany')
      .mockResolvedValue(accidentPaginatedListMock);

    const paginatedResponse = await accidentsService.findMany({});

    expect(paginatedResponse).toBeDefined();
    expect(paginatedResponse.items[0]).toBeInstanceOf(Accident);
  });
});
