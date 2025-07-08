// routes/promoRoutes.js
import express from 'express';
import { authAdmin, authenticate, authorizeAdmin } from '../middleware/auth.js';
import { 
    getPromos, 
    addPromo, 
    deletePromo 
} from '../controller/promoController.js';
import upload from '../config/multer.js';

const router = express.Router();

// Admin protected routes
router.get('/', getPromos);
router.post('/add', authAdmin,upload.single('file'), addPromo);
router.delete('/:id', authAdmin, deletePromo);

export default router;