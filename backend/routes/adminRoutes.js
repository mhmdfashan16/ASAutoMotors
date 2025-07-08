// routes/adminRoutes.js
import express from 'express';
import { authAdmin, authenticate, authorizeAdmin } from '../middleware/auth.js';
import { 
    getDashboardStats, 
    getInquiries, 
    deleteInquiry,
    verifyAdmin, 
    login,
    logout
} from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login',login);
adminRouter.get('/logout',logout);

// Admin verification route
adminRouter.get('/verify', authenticate);

// Admin dashboard routes
adminRouter.get('/dashboard', getDashboardStats);
adminRouter.get('/inquiries', getInquiries);
adminRouter.delete('/inquiries/:id', deleteInquiry);

export default adminRouter;
