// routes/adminRoutes.js
import express from 'express';
import { getDashboardData, login, logout } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/dashboard', getDashboardData);
adminRouter.post('/login',login);
adminRouter.get('/logout',logout);

export default adminRouter;
