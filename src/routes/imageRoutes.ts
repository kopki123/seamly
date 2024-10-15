import express from 'express';
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import {
  deleteImage,
  uploadImage
} from '../controllers/imageController';
import { Role } from '../utils/role';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .route('/')
  .post(upload.single('file'), uploadImage);

router
  .route('/:imageName')
  .delete([authenticateUser, authorizePermissions(Role.Admin)], deleteImage);

export default router;
