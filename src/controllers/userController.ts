import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import * as userService from '../services/userService.js';
import checkPermissions from '../utils/checkPermissions.js';
import apiResponse from '../utils/apiResponse.js';

const getUserInfo = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const user = await userService.findUserById(userId);

  checkPermissions({ userId: user.id, role: user.role }, userId);

  res.status(StatusCodes.CREATED).json(apiResponse({ data: { user }}));
};

export {
  getUserInfo,
};