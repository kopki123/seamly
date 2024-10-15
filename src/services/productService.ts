import prisma from '../prisma/prisma-client.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import Joi from 'joi';
import { Product } from '../models/ProductModel.js';

const productSchema = Joi.object({
  title: Joi.string().trim().max(100).required(),
  price: Joi.number().default(0).required(),
  description: Joi.string().trim().max(200).required(),
  image: Joi.string().required(),
  content: Joi.string().required(),
  categoryId: Joi.string().required(),
});

const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  });

  return products;
};

const getSingleProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  });

  if (!product) {
    throw new NotFoundError(`沒有ID為：${productId} 的產品`);
  }

  return product;
};

const createProduct = async (productContent: Product) => {
  const { error } = productSchema.validate(productContent, { abortEarly: false });

  if (error) {
    // TODO
    throw new BadRequestError(error.details[0].message);
  }

  const product = await prisma.product.create({
    data: productContent
  });

  return product;
};

const deleteProduct = async (productId: string) => {
  const product = await prisma.product.delete({
    where: {
      id: productId
    }
  });

  return product;
};

const updateProduct = async (productId: string, updateData: Product) => {
  const { error } = productSchema.validate(updateData, { abortEarly: false });

  if (error) {
    // TODO
    throw new BadRequestError(error.details[0].message);
  }

  const product = await prisma.product.update({
    where: { id: productId },
    data: updateData
  });

  return product;
};

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct
};