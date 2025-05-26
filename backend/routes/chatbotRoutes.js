// routes/chatbotRoutes.js
import express from 'express';
import { chatWithDeepInfra} from '../controller/chatBotController.js';
import { authenticate } from '../middleware/auth.js';

const chatRouter = express.Router();

chatRouter.post('/deep',chatWithDeepInfra);

export default chatRouter;