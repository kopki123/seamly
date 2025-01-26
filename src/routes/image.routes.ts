import express from 'express';
import multer from 'multer';
import { authenticateUser, authorizePermissions } from '../middleware/authentication.js';
import {
  deleteImage,
  uploadImage
} from '../controllers/image.controller.js';
import { Role } from '../utils/role.js';

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
