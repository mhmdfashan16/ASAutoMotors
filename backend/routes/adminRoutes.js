// routes/adminRoutes.js
import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { 
    getDashboardStats, 
    getInquiries, 
    deleteInquiry,
    verifyAdmin, 
    login,
    logout
} from '../controller/adminController.js';

const router = express.Router();

// All admin routes must be protected with both authenticate and authorizeAdmin middleware
// router.use(authenticate); // Apply authentication to all routes
// router.use(authorizeAdmin); // Apply admin authorization to all routes
router.post('/login',login);
router.get('/logout',logout);

// Admin verification route
router.get('/verify', verifyAdmin);

// Admin dashboard routes
router.get('/dashboard', getDashboardStats);
router.get('/inquiries', getInquiries);
router.delete('/inquiries/:id', deleteInquiry);

export default router;
