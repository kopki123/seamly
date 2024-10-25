import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const oneDay = 1000 * 60 * 60 * 24;
export const longerExp = 1000 * 60 * 60 * 24 * 30;

const isTokenValid = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const isRefreshTokenValid = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

const generateAccessToken = (user: { userId: string, role: number }) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = (user: { userId: string, role: number }) => {
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
};

const attachCookiesToResponse = ({ res, accessToken, refreshToken }: {
  res: Response,
  accessToken: string,
  refreshToken: string
}) => {

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + longerExp),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

export {
  generateAccessToken,
  generateRefreshToken,
  isTokenValid,
  isRefreshTokenValid,
  attachCookiesToResponse,
};