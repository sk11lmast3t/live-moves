import express from 'express';
import {
  getAllContent,
  getContentById,
  getTrending,
  getFeatured,
  getRecommendations,
  createContent,
  updateContent,
  deleteContent,
  rateContent,
} from '../controllers/contentController.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Specific routes (must come before /:id)
router.get('/trending', getTrending);
router.get('/featured', getFeatured);

// Public routes
router.get('/', getAllContent);
router.get('/:id', getContentById);

// Protected routes
router.get('/:id/recommendations', auth, getRecommendations);
router.post('/:id/rate', auth, rateContent);

// Admin routes
router.post('/', adminAuth, createContent);
router.put('/:id', adminAuth, updateContent);
router.delete('/:id', adminAuth, deleteContent);

export default router;
