import prisma from '../prisma/prisma-client';
import { NotFoundError } from '../errors';

const findUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      role: true,
    }
  });

  if (!user) {
    throw new NotFoundError('未找到用戶');
  }

  return user;
};

export {
  findUserById,
};