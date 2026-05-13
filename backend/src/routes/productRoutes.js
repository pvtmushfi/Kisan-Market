import express from 'express';
import { getProducts, addProduct, deleteProduct } from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route – anyone can see products
router.get('/', getProducts);

// Protected routes – only logged‑in farmers can add/delete
router.post('/', protect, addProduct);
router.delete('/:id', protect, deleteProduct);

export default router;