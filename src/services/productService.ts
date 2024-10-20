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

const getAllProducts = async ({ categoryId, keyword, minPrice, maxPrice, sort }: {
  categoryId?: string;
  keyword?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
} = {}) => {

  let orderBy = {};
  switch (sort) {
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'oldest':
      orderBy = { createdAt: 'asc' };
      break;
    case 'bestselling':
      orderBy = { sold: 'desc' };
      break;
    case 'price-high-to-low':
      orderBy = { price: 'desc' };
      break;
    case 'price-low-to-high':
      orderBy = { price: 'asc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
      break;
  }

  const products = await prisma.product.findMany({
    where: {
      ...(categoryId && {
        categoryId: {
          equals: categoryId
        },
      }),
      ...(keyword && {
        OR: [
          {
            title: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
        ],
      }),
      ...(minPrice && {
        price: {
          gte: parseFloat(minPrice),
        },
      }),
      ...(maxPrice && {
        price: {
          lte: parseFloat(maxPrice),
        },
      }),
    },
    orderBy
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