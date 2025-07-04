// routes/authRoutes.js
import express from 'express';
import { login, logout, register, verify } from '../controller/authController.js';


//URL: api/auth/
const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login', login); 
authRouter.get('/logout', logout);
authRouter.get('/verify', verify); 

export default authRouter;