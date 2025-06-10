// controllers/productController.js
import Product from '../models/Product.js';
import {cloudinary} from '../config/cloudinary.js';

//this is to add product to the front end where the controlls the post req
export const AddProduct = async (req, res) => {
  try {
    
    const productData = JSON.parse(req.body.productData);
    const images = req.files?.images;

    if (!images) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const imageArray = Array.isArray(images) ? images : [images];
    const imageUrls = await Promise.all(
      imageArray.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imageUrls });
    res.status(201).json({ success: true, message: "Product Added" });

  } catch (error) {
    console.error("Backend error:", error); // This line helps debug the error pops up when needed
    res.status(500).json({ success: false, message: error.message });
  }
};

export const AddProductt = async (req, res) => {
  try {

    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const imageUrls = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imageUrls });
    res.status(201).json({ success: true, message: "Product Added" });

  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Addproduct : /api/product/add this api endpoint to add product to the database
export const addProduct = async(req, res)=>{

    try{
        let productData = JSON.parse(req.body.productData);
        const images = req.files;
        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,
                    {resource_type:'image'})
                return result.secure_url;
            })
        )
        await Product.create({...productData, image:imagesUrl})
        res.json({success:true, message:"Product added"});

    }catch(error){
        console.log(error.message);
        return res.json({success:false, message:error.message});
    }
}


//this is to get all the products from the databse 
export const getProducts = async (req, res) => {
  try{
      const products = await Product.find();
      if(!products){
        return res.json({
          success:true,
          message:"There is no products exists"
        })
      }
     res.status(200).json({ success: true, message:"Display products", products });
  }catch(error){
    res.json({success:false, message:error.message});
  }

};

//search the products from the databse
export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.body;
    if(!keyword){
      return res.json({
        success:false,
        message:"type anything about products"
      })
    }
    const products = await Product.find({
      name: { $regex: keyword, $options: 'i' },
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//for delete the product from the database 
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};