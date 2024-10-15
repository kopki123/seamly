import prisma from '../prisma/prisma-client.js';
import { BadRequestError } from '../errors/index.js';
import Joi from 'joi';

const categorySchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).required(),
});

const getAllCategories = async () => {
  const categories = await prisma.category.findMany();

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
    }
  });

  return category;
};

const deleteCategory = async (id: string) => {
  const category = await prisma.category.delete({
    where: {
      id
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