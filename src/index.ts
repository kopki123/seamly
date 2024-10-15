import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';
import errorHandlerMiddleware from './middleware/errorHandler.js';
import notFoundMiddleware from './middleware/notFound.js';

import authRouter from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import categoryRoute from './routes/categoryRoute.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const app = express();
app.use(history());

// Client
const __dirname = fileURLToPath(new URL('.', import.meta.url));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public'));
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/uploads', imageRoutes);
console.log('!!!!!!');
// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();