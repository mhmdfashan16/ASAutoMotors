// routes/productRoutes.js
import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { addProduct, AddProduct, AddProductt, deleteProduct, getProducts, searchProducts } from '../controller/productController.js';
import upload from '../config/multer.js';


const productRouter = express.Router();

//this is used to add product and list all the product and search then can also remove it as well

productRouter.post('/add', upload.array("images",5),authorizeAdmin ,addProduct);
productRouter.get('/list', getProducts);
productRouter.get('/search', searchProducts);
productRouter.delete('/remove/:id', authorizeAdmin, deleteProduct);


export default productRouter;
