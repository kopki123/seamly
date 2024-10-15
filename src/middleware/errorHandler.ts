/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { CustomAPIError } from '../errors';
import apiResponse from '../utils/apiResponse';

const errorHandlerMiddleware = (err: CustomAPIError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || '發生錯誤，稍後重試';

  res.status(statusCode).json(apiResponse({ status: 'error', message }));
  return null;
};

export default errorHandlerMiddleware;