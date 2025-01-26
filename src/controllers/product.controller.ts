import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import * as productService from '../services/product.service.js';
import apiResponse from '../utils/apiResponse.js';

const getAllProducts = async (req: Request, res: Response) => {
  const { categoryId, keyword, minPrice, maxPrice, sort }: {
    categoryId?: string;
    keyword?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  } = req.query;

  const products = await productService.getAllProducts({ categoryId, keyword, minPrice, maxPrice, sort });

  res.status(StatusCodes.OK).json(apiResponse({ data: { products, count: products.length } }));
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getSingleProduct(id);

  res.status(StatusCodes.OK).json(apiResponse({ data: { product } }));
};

const createProduct = async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);

  res.status(StatusCodes.CREATED).json(apiResponse({ data: { product } }));
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await productService.deleteProduct(id);

  res.status(StatusCodes.OK).json(apiResponse());
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.updateProduct(id, req.body);

  res.status(StatusCodes.OK).json(apiResponse({ data: { product } }));
};

export {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct
};