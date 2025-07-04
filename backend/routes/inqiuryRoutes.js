// routes/inquiryRoutes.js
import express from 'express';
import { addInquiry, authenticate, createInquiry, deleteInquiry, getInquiries } from '../controller/inquiryController.js';
import { authAdmin } from '../middleware/auth.js';

const inquiryRouter = express.Router();

inquiryRouter.post('/',authenticate,addInquiry);
inquiryRouter.get('/', authAdmin, getInquiries);
inquiryRouter.delete('/:id',authAdmin,deleteInquiry);
// inquiryRouter.post('/add',authenticate, createInquiry);

export default inquiryRouter;