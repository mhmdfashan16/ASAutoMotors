// routes/promoRoutes.js
import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { 
    getPromos, 
    addPromo, 
    deletePromo 
} from '../controller/promoController.js';

const router = express.Router();

// Admin protected routes
router.get('/', authenticate, authorizeAdmin, getPromos);
router.post('/', authenticate, authorizeAdmin, addPromo);
router.delete('/:id', authenticate, authorizeAdmin, deletePromo);

export default router;