import Joi from 'joi';
import prisma from '../prisma-client.js';
import { BadRequestError } from '../errors/index.js';

const categorySchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).required(),
});

const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    }
  });

  return categories;
};

const createCategory = async ({ name }: { name: string }) => {
  const { error } = categorySchema.validate({name}, { abortEarly: false });

  if (error) {
    // TODO
    throw new BadRequestError(error.details[0].message);
  }

  const category = await prisma.category.create({
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
    }
  });

  return category;
};

const updateCategory = async (categoryName: string, id: string) => {
  const category = await prisma.category.update({
    where: {
      id,
    },
    data: {
      name: categoryName
    },
    select: {
      id: true,
      name: true,
    }
  });

  return category;
};

const deleteCategory = async (id: string) => {
  const category = await prisma.category.delete({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
    }
  });

  return category;
};

export {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};