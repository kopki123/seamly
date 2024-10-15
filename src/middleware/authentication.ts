import { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError, UnauthorizedError } from '../errors';
import { isTokenValid, attachCookiesToResponse, generateAccessToken} from '../utils/authJwt';
import { findRefreshToken } from '../services/refreshTokenService';
import { Role } from '../utils/role';

interface JwtPayload {
  user: {
    userId: string,
    role: number,
  }
}

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if(accessToken) {
      const payload = isTokenValid(accessToken) as JwtPayload;
      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken) as JwtPayload;
    const existingToken = await findRefreshToken({ token: refreshToken, userId: payload.user.userId });

    if(!existingToken || existingToken?.expiresAt.getTime() < Date.now()) {
      throw new UnauthenticatedError('認證無效');
    }

    const { role, userId } = payload.user;

    const newAccessToken = generateAccessToken({ userId, role });
    attachCookiesToResponse({ res, accessToken: newAccessToken, refreshToken: existingToken.token });
    req.user = payload.user;
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError('認證無效');
  }
};

const authorizePermissions = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('未經授權存取');
    }

    next();
  };
};

export {
  authenticateUser,
  authorizePermissions,
};
