import { Request, Response, NextFunction } from 'express';
import { responseWrapper } from './responseWrapper';
import { httpCode } from '../constants';

interface ErrorT extends Error {
  status?: number;
}

export default (
  error: ErrorT,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status ?? httpCode.INTERNAL_SERVER_ERROR;
  return responseWrapper({
    res,
    status,
    message:
      status > httpCode.INTERNAL_SERVER_ERROR
        ? 'Something Went Wrong'
        : error.message || 'Internal Server Error'
  });
};
