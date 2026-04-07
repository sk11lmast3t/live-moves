import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/auth.js';
import userRoutes from './routes/userRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import importRoutes from './routes/importRoutes.js';

dotenv.config();

const app = express();

app.use(helmet());

if (process.env.CORS_ORIGIN) {
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later',
});
app.use('/api/', limiter);

export const appReady = (async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('❌ Failed to initialize backend app:', error.message);
    throw error;
  }
})();

app.use('/api/auth', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/import', importRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

export default app;
