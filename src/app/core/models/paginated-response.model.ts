export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: number;
  search?: string;
  [key: string]: string | number | boolean | undefined;
}
