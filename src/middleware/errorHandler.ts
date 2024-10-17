/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { CustomAPIError } from '../errors/index.js';
import apiResponse from '../utils/apiResponse.js';

export default function errorHandlerMiddleware (err: CustomAPIError, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || '發生錯誤，稍後重試';

  res.status(statusCode).json(apiResponse({ status: 'error', message }));
  return null;
};
