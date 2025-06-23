// routes/productRoutes.js
import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { 
    getProducts, 
    getProduct,
    addProduct, 
    updateProduct, 
    deleteProduct 
} from '../controller/productController.js';
import upload from '../config/multer.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin protected routes
router.post('/add', authenticate, authorizeAdmin, upload.single('image'), addProduct);
router.put('/:id', authenticate, authorizeAdmin, upload.single('image'), updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

export default router;
