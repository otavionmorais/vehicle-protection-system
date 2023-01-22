import { Client } from '../clients.model';
import { ICreateClientDTO } from '../structures';

export const clientMock = new Client().build({
  id: '411b263e-88ed-49e5-88a8-c159f663de05',
  document: '12345678910',
  name: 'Mocked Name',
  email: 'mockedmail@mailprovider.com',
  phone: '+5511999999999',
  birth_date: new Date('1990-01-01'),
  password: 'thisIsAHashedPassword',
  created_at: new Date('2020-01-01'),
  updated_at: new Date('2020-01-01'),
});

export const updatedClientMock = new Client().build({
  ...clientMock,
  name: 'Mocked Name Updated',
});

export const createClientDTOMock: ICreateClientDTO = {
  document: '12345678910',
  name: 'Mocked Name',
  email: 'mockedmail@mailprovider.com',
  phone: '+5511999999999',
  birth_date: new Date('1990-01-01'),
  password: 'batata',
};
