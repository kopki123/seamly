/* eslint-disable no-unused-vars */
import { CorsOptions } from 'cors';
import { Request } from 'express';

const whitelist = [
  'https://seamly-h5sc.onrender.com',
];

export const corsOptionsDelegate = (
  req: Request,
  callback: ((err: Error | null, options?: CorsOptions) => void)
) =>{
  let corsOptions = {};

  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  callback(null, corsOptions);
};