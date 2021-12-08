export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _page: number;
  _limit: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  //những kiểu dữ liệu khac bất kỳ
  [key: string]: any;
}
