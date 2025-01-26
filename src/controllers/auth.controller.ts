import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import * as authService from '../services/auth.service.js';
import { createRefreshToken, deleteRefreshToken } from '../services/refreshToken.service.js';
import sendVerificationEmail from '../utils/sendVerificationEmail.js';
import comparePassword from '../utils/comparePassword.js';
import { attachCookiesToResponse, generateAccessToken } from '../utils/authJwt.js';
import createTokenUser from '../utils/createTokenUser.js';
import apiResponse from '../utils/apiResponse.js';

const register = async (req: Request, res: Response) => {
  const {
    email,
    password,
  } = req.body;

  const user = await authService.createUser({ email, password });

  // const origin = 'http://localhost:5173';
  const origin = req.get('origin');

  await sendVerificationEmail({
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json(apiResponse());
};

const verifyEmail = async (req: Request, res: Response) => {
  const { verificationToken, email } = req.body;
  const user = await authService.findUserIdByEmail(email);

  if(!user) {
    throw new UnauthenticatedError('驗證失敗');
  }

  if(user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError('驗證失敗');
  }

  const updatedUser = await authService.updateUser({
    isVerified: true,
    verified: new Date(),
    verificationToken: null,
  }, email);

  res.status(StatusCodes.OK).json(apiResponse({ data: { user: updatedUser } }));
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('請提供電子郵件和密碼');
  }

  const user = await authService.findUserIdByEmail(email);

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('密碼錯誤');
  }

  if(!user.isVerified) {
    throw new UnauthenticatedError('請驗證您的電子郵件');
  }

  const tokenUser = createTokenUser(user);

  const accessToken = generateAccessToken(tokenUser);
  const refreshToken = await createRefreshToken(tokenUser);

  attachCookiesToResponse({ res, accessToken, refreshToken: refreshToken.token });
  res.status(StatusCodes.OK).json(apiResponse({ data: { user: tokenUser } }));
};

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.signedCookies;

  await deleteRefreshToken({ userId: req.user.userId, token: refreshToken });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json(apiResponse());
};

const checkLoginStatus = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(apiResponse({ data: { user: req.user }}));
};

export {
  register,
  verifyEmail,
  login,
  logout,
  checkLoginStatus
};