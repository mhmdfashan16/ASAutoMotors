// import fileUpload from 'express-fileupload';
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv';
import 'dotenv/config';

import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import chatRouter from './routes/chatbotRoutes.js';
import productRouter from './routes/productRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import inquiryRouter from './routes/inqiuryRoutes.js';
import promoRouter from './routes/promoRoutes.js';
// import connectCloudinary from './config/cloudinary.js';




dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

await connectDB();
// await connectCloudinary();

//allow multiple origins
const allowedOrigins = ['http://localhost:5173'];


//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials:true}));


// app.use(
//    fileUpload({
//         useTempFiles:true,
//         tempFileDir:'/tmp',
//     })
// )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res)=> res.send("API is Working"));

app.use('/api/auth',authRouter);
app.use('/api/admin',adminRouter);
app.use('/api/product',productRouter);
app.use('/api/chat', chatRouter);
app.use('/api/inquiry', inquiryRouter)
app.use('/api/promo',promoRouter)





app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})