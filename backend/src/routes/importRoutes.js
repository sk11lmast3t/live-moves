import express from 'express';
import {
  importTrendingMovies,
  importPopularMovies,
  importTopRatedMovies,
  importTrendingTV,
  importAllContent,
} from '../controllers/importController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// All import routes are admin only
router.post('/all', adminAuth, importAllContent);
router.post('/trending-movies', adminAuth, importTrendingMovies);
router.post('/popular-movies', adminAuth, importPopularMovies);
router.post('/top-rated-movies', adminAuth, importTopRatedMovies);
router.post('/trending-tv', adminAuth, importTrendingTV);

export default router;
