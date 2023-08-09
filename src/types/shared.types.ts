import { Response } from 'express';
import { WhereOptions, FindOptions } from 'sequelize';

export interface IMeta {
  total?: number;
  pages?: number;
}

export interface ResponseWrapper<Data> {
  res: Response;
  status: number;
  message?: string;
  data?: Data;
  meta?: IMeta;
  errors?: any;
  [key: string]: any;
}

export interface PaginationArgs {
  limit?: number;
  page: number;
}

export interface GetPaginationResponse extends IMeta, PaginationArgs {
  offset: number;
}

export interface FindModelOptions<Model> extends FindOptions {
  where?: WhereOptions<Model>;
}
