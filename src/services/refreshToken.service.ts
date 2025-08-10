import prisma from '../prisma-client.js';
import { generateRefreshToken, longerExp } from '../utils/authJwt.js';

const createRefreshToken = async (user: { userId: string, role: number }) => {
  const refreshToken = generateRefreshToken(user);
  const token = await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.userId,
      expiresAt: new Date(Date.now() + longerExp),
    },
    select: {
      id: true,
      userId: true,
      token: true,
      expiresAt: true,
    }
  });

  return token;
};

const findRefreshToken = async ({ token, userId }: { token: string, userId: string }) => {
  const refreshToken = await prisma.refreshToken.findUnique({
    where: {
      token,
      userId
    },
    select: {
      id: true,
      userId: true,
      token: true,
      expiresAt: true,
    }
  });

  return refreshToken;
};

const deleteRefreshToken = async ({ token, userId }: { token: string, userId: string }) => {
  await prisma.refreshToken.delete({
    where: {
      token,
      userId
    }
  });
};

export {
  createRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
};