// controllers/productController.js
import Product from '../models/Product.js';
import {cloudinary} from '../config/cloudinary.js';

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ success: false, message: 'Error getting products' });
    }
};

// Get single product
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }

        res.json({ 
            success: true, 
            product 
        });
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error getting product' 
        });
    }
};

// Add new product
export const addProduct = async (req, res) => {
    try {
        const { name, brand, model, description, price } = req.body;
        
        // Handle image upload to Cloudinary
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'as_auto_motors',
                use_filename: true
            });
            imageUrl = result.secure_url;
        }

        const product = new Product({
            name,
            brand,
            model,
            description,
            price,
            image: imageUrl
        });

        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Error adding product' 
        });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, brand, model, description, price } = req.body;
        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Handle image upload to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'as_auto_motors',
                use_filename: true
            });
            product.image = result.secure_url;
        }

        product.name = name || product.name;
        product.brand = brand || product.brand;
        product.model = model || product.model;
        product.description = description || product.description;
        product.price = price || product.price;

        await product.save();
        res.json({ success: true, product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Error updating product' });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Error deleting product' });
    }
};

// Search products
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { brand: { $regex: query, $options: 'i' } }
            ]
        });
        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};