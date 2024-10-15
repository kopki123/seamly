import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import * as categoryService from '../services/categoryService';
import apiResponse from '../utils/apiResponse';

const getAllCategories = async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();

  res.status(StatusCodes.OK).json(apiResponse({ data: { categories } }));
};

const createCategory = async (req: Request, res: Response) => {
  const product = await categoryService.createCategory(req.body);

  res.status(StatusCodes.CREATED).json(apiResponse({ data: { product } }));
};

const deleteCategory  = async (req: Request, res: Response) => {
  const { id } = req.params;
  await categoryService.deleteCategory(id);

  res.status(StatusCodes.OK).json(apiResponse());
};

const updateCategory  = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const category  = await categoryService.updateCategory(name, id);

  res.status(StatusCodes.OK).json(apiResponse({ data: { category } }));
};

export {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};