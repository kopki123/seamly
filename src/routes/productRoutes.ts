import express from 'express';
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct
} from '../controllers/productController';
import { Role } from '../utils/role';

const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post([authenticateUser, authorizePermissions(Role.Admin)], createProduct);

router
  .route('/:id')
  .get(getSingleProduct)
  .delete([authenticateUser, authorizePermissions(Role.Admin)], deleteProduct)
  .patch([authenticateUser, authorizePermissions(Role.Admin)], updateProduct);

export default router;