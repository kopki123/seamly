import express from 'express';
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { Role } from '../utils/role';

const router = express.Router();

router
  .route('/')
  .get(getAllCategories)
  .post([authenticateUser, authorizePermissions(Role.Admin)], createCategory);

router
  .route('/:id')
  .delete([authenticateUser, authorizePermissions(Role.Admin)], deleteCategory)
  .patch([authenticateUser, authorizePermissions(Role.Admin)], updateCategory);

export default router;