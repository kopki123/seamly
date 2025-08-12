import 'express-async-errors';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';

import errorHandlerMiddleware from './middleware/errorHandler.js';
import notFoundMiddleware from './middleware/notFound.js';
import { corsOptionsDelegate } from './utils/cors.js';

import authRouter from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import categoryRoute from './routes/category.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import imageRoutes from './routes/image.routes.js';
import checkoutRoute from './routes/checkout.routes.js';

dotenv.config();
const app = express();

// Client
if(process.env.NODE_ENV === 'production') {
  app.use(history());
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  app.use(express.static(path.join(__dirname, '../../public')));

  app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../public'));
  });
}

// Middlewares
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['\'self\''],
    formAction: ['\'self\'', 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5'],
  }
}));
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/uploads', imageRoutes);
app.use('/api/v1/checkout', checkoutRoute);

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