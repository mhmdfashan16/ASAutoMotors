// models/Promotion.js
import mongoose from 'mongoose';


const promotionSchema = new mongoose.Schema({
  title: {type: String, required:true},
  description: {type: String, required:true},
  discountAmount: {type: Number, required:true},
  image: {type:Array, required:true},
  expiredDate: {
    type:Date,
    default:()=> new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }
});

export default mongoose.model('Promotion', promotionSchema);