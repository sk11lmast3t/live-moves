import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/watchlist', auth, getWatchlist);
router.post('/watchlist/:contentId', auth, addToWatchlist);
router.delete('/watchlist/:contentId', auth, removeFromWatchlist);

export default router;
