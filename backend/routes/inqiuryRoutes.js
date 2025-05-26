// routes/inquiryRoutes.js
import express from 'express';
import { addInquiry, authenticate, createInquiry } from '../controller/inquiryController.js';

const inquiryRouter = express.Router();

inquiryRouter.post('/',authenticate,addInquiry);
inquiryRouter.post('/add',authenticate, createInquiry);

export default inquiryRouter;