// routes/adminRoutes.js
import express from 'express';
import { getDashboardData, login, logout } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/dashboard', getDashboardData); //this is the api route for get all users
adminRouter.post('/login',login); //this api route is used to login the admin into the dashboard
adminRouter.get('/logout',logout); //this api route is used to logout the admin from the dashboard

export default adminRouter;
