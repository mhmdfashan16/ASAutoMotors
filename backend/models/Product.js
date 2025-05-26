import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {type:String, required:true},
  model:{type:String, required:true},
  brand:{type:String, required:true},
  description: {type:[String], required:true},
  specifications: {type:String},
  price: {type:Number, required:true},
  image: {type:Array, required:true},
},{timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;