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
const port = process.env.PORT || 5000;

await connectDB();
// await connectCloudinary();

// CORS configuration
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, file system)
        if (!origin) {
            return callback(null, true);
        }
        
        const allowedOrigins = [
            'http://127.0.0.1:5500',
            'http://localhost:5500',
            'null'
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use(
//    fileUpload({
//         useTempFiles:true,
//         tempFileDir:'/tmp',
//     })
// )

app.get('/', (req,res)=> res.send("API is Working"));

app.use('/api/auth',authRouter);
app.use('/api/admin',adminRouter);//this route is used for admin side usages
app.use('/api/product',productRouter); //this route is used for CRUD operations of products
app.use('/api/chat', chatRouter);
app.use('/api/inquiry', inquiryRouter)
app.use('/api/promo',promoRouter) //this route is used to check the promo

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})