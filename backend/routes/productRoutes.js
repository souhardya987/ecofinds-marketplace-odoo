import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  getMyProducts,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, createProduct);
router.get('/myproducts', protect, getMyProducts);
router.route('/:id').get(getProductById).delete(protect, deleteProduct);

export default router;