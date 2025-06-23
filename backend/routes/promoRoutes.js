// routes/promoRoutes.js
import express from 'express';
import { addPromotion, getPromotions } from '../controller/promoController.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const promoRouter = express.Router();

//this is used to get all the promotions
promoRouter.get('/', getPromotions);
promoRouter.post('/add',authenticate,authorizeAdmin ,addPromotion);


export default promoRouter;