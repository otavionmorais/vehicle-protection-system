export interface IPaginatedList<T> {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  items: T[];
}

export interface IRequestData<PayloadType, ParamsType, QueryType> {
  query?: QueryType;
  params?: ParamsType;
  payload?: PayloadType;
}
