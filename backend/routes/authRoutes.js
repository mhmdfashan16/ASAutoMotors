// routes/authRoutes.js
import express from 'express';
import { login, logout, register } from '../controller/authController.js';


//URL: api/auth/
const authRouter = express.Router();

authRouter.post('/register',register );
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;