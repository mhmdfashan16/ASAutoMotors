// routes/authRoutes.js
import express from 'express';
import { login, logout, register, verify } from '../controller/authController.js';


//URL: api/auth/
const authRouter = express.Router();

authRouter.post('/register',register); //this api is to register the user for the admin
authRouter.post('/login', login); // this api is to login 
authRouter.post('/logout', logout);// this api is to logout
authRouter.get('/verify', verify); // this api is to verify user token

export default authRouter;