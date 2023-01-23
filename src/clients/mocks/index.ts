import { IPaginatedList } from 'src/structures';
import { Client } from '../clients.model';
import { ICreateClientDTO } from '../structures';

export const clientMock = new Client().build({
  id: '411b263e-88ed-49e5-88a8-c159f663de05',
  document: '12345678910',
  name: 'Mocked Name',
  email: 'mockedmail@mailprovider.com',
  phone: '+5511999999999',
  birthDate: '1990-01-01',
  password: 'thisIsAHashedPassword',
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
  deletedAt: null,
});

export const clientPaginatedListMock: IPaginatedList<Client> = {
  page: 0,
  itemsPerPage: 20,
  totalItems: 1,
  items: [clientMock],
};

export const updatedClientMock = new Client().build({
  ...clientMock,
  name: 'Mocked Name Updated',
});

export const createClientDTOMock: ICreateClientDTO = {
  document: '12345678910',
  name: 'Mocked Name',
  email: 'mockedmail@mailprovider.com',
  phone: '+5511999999999',
  birthDate: '1990-01-01',
  password: 'batata',
};
