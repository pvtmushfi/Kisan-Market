import express from 'express';
import { getNearbyFarmers, saveLocation } from '../controllers/farmerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route - get nearby farmers (no login needed)
router.get('/nearby', getNearbyFarmers);

// Protected route - save farmer location (requires login)
router.put('/location', protect, saveLocation);

export default router;