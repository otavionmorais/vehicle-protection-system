import { IPaginatedList } from 'src/structures';
import { ThirdPartyPerson } from '../third_party_people.model';
import { ICreateThirdPartyPersonDTO } from '../structures';

export const thirdPartyPersonMock = new ThirdPartyPerson().build({
  id: '111b263e-88ed-49e5-88a8-c159f663de05',
  document: '01234567891',
  name: 'Mocked Third Party Name',
  email: 'mockedthirdpartymail@mailprovider.com',
  phone: '+5511999999999',
  birthDate: '1980-01-01',
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
  deletedAt: null,
});

export const thirdPartyPersonPaginatedListMock: IPaginatedList<ThirdPartyPerson> =
  {
    page: 0,
    itemsPerPage: 20,
    totalItems: 1,
    items: [thirdPartyPersonMock],
  };

export const updatedThirdPartyPersonMock = new ThirdPartyPerson().build({
  ...thirdPartyPersonMock,
  name: 'Mocked Third Party Name Updated',
});

export const createThirdPartyPersonDTOMock: ICreateThirdPartyPersonDTO = {
  document: '01234567891',
  name: 'Mocked Third Party Name',
  email: 'mockedthirdpartymail@mailprovider.com',
  phone: '+5511999999999',
  birthDate: '1980-01-01',
};
