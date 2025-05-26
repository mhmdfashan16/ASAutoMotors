// routes/productRoutes.js
import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { addProduct, AddProduct, AddProductt, deleteProduct, getProducts, searchProducts } from '../controller/productController.js';
import upload from '../config/multer.js';

// import fileUpload from 'express-fileupload';



const productRouter = express.Router();

//Middleware to handle fileupload
// productRouter.use(fileUpload({useTempFiles:true}));

productRouter.post('/add', upload.array("images",5),authorizeAdmin ,addProduct);
productRouter.get('/list', getProducts);
productRouter.get('/search', searchProducts);
productRouter.delete('/remove/:id', authorizeAdmin, deleteProduct);


export default productRouter;
