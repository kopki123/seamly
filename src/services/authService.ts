import prisma from '../prisma/prisma-client.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Joi from 'joi';
import { RegisterInput } from '../models/RegisterInputModel';
import { RegisteredUser } from '../models/RegisteredUser';

const userSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/).required(),
});

const checkUserUniqueness = async (email: string) => {
  const existingUserByEmail = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUserByEmail) {
    throw new BadRequestError('電子郵件已存在');
  }
};

const createUser = async (input: RegisterInput): Promise<RegisteredUser> => {
  const { error } = userSchema.validate(input, { abortEarly: false });

  if (error) {
    // TODO
    throw new BadRequestError(error.details[0].message);
  }

  const { email, password } = input;

  await checkUserUniqueness(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      verificationToken: crypto.randomBytes(40).toString('hex'),
    },
    select: {
      email: true,
      verificationToken: true,
    },
  });

  return user;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUser = async (userPayload: any, email: string) => {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      ...userPayload,
    },
    select: {
      email: true,
    },
  });

  return user;
};

const findUserIdByEmail= async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if (!user) {
    throw new NotFoundError('電子郵件尚未註冊');
  }

  return user;
};

export {
  checkUserUniqueness,
  createUser,
  updateUser,
  findUserIdByEmail
};