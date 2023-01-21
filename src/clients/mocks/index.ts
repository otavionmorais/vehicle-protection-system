import { Client } from '../clients.model';

export const clientMock = new Client();
Object.assign(clientMock, {
  id: '411b263e-88ed-49e5-88a8-c159f663de05',
  document: '12345678910',
  name: 'Mocked Name',
  email: 'mockedmail@mailprovider.com',
  phone: '+5511999999999',
  birth_date: new Date('1990-01-01'),
  password: '$2a$12$yqE4NPYeFcbsyD/TW/ojEuNChHSU4h1BJzZ51NTZxSPkKejxsPR2q',
  created_at: new Date('2020-01-01'),
  updated_at: new Date('2020-01-01'),
});

export const updatedClientMock = new Client();
Object.assign(updatedClientMock, {
  id: '411b263e-88ed-49e5-88a8-c159f663de05',
  document: '12345678910',
  name: 'Mocked Name Updated',
  email: 'mockedmail@mailprovider.com',
  phone: '+5511999999999',
  birth_date: new Date('1990-01-01'),
  password: '$2a$12$yqE4NPYeFcbsyD/TW/ojEuNChHSU4h1BJzZ51NTZxSPkKejxsPR2q',
  created_at: new Date('2020-01-01'),
  updated_at: new Date('2020-01-01'),
});

export const createClientDTOMock = {
  document: '12345678910',
  name: 'Mocked Name',
  email: 'mockedmail@mailprovider.com',
  phone: '+5511999999999',
  birth_date: new Date('1990-01-01'),
  password: 'batata',
};
