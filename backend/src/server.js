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

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
});
app.use('/api/', limiter);

// Connect to database
connectDB();

// API Routes
app.use('/api/auth', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/import', importRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║    🎬 StreamBox Backend Server 🎬   ║
║         v1.0.0 - Running              ║
╠═══════════════════════════════════════╣
║ Server: http://localhost:${PORT}         ║
║ API: http://localhost:${PORT}/api        ║
║ Health: http://localhost:${PORT}/health  ║
╚═══════════════════════════════════════╝
  `);
});

export default app;
