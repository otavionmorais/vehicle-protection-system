import { IPaginatedList } from '../../structures';
import { thirdPartyPersonMock } from '../../third_party_people/mocks';
import { Accident } from '../accidents.model';
import { ICreateAccidentDTO } from '../structures';

export const accidentMock = new Accident().build({
  id: '111b263e-88ed-49e5-88a8-c159f663de05',
  clientId: '111b263e-88ed-49e5-88a8-c159f663de05',
  vehiclePlate: 'WWW-1234',
  vehicleModel: 'Gol 1.6 2016',
  vehicleColor: 'Prata',
  description: 'Bateu no muro',
  thirdPartyPeople: [thirdPartyPersonMock],
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
  deletedAt: null,
});

export const accidentPaginatedListMock: IPaginatedList<Accident> = {
  page: 0,
  itemsPerPage: 20,
  totalItems: 1,
  items: [accidentMock],
};

export const updatedAccidentMock = new Accident().build({
  ...accidentMock,
  description: 'Bateu no poste',
});

export const createAccidentDTOMock: ICreateAccidentDTO = {
  clientId: '111b263e-88ed-49e5-88a8-c159f663de05',
  vehiclePlate: 'WWW-1234',
  vehicleModel: 'Gol 1.6 2016',
  vehicleColor: 'Prata',
  description: 'Bateu no muro',
  thirdPartyPeople: [
    {
      document: '01234567891',
      name: 'Mocked Third Party Name',
      email: 'mailtest@test.com',
      phone: '+5511999999999',
      birthDate: '1980-01-01',
    },
  ],
};
