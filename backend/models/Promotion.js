// models/Promotion.js
import mongoose from 'mongoose';

//this is for the promotion schema which saves and calculates the expiry date of the promotion date as well
const promotionSchema = new mongoose.Schema({
  title: {type: String, required:true},
  description: {type: String, required:true},
  discountAmount: {type: Number, required:true},
  expiredDate: {
    type:Date,
    default:()=> new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 Days from Now
  }
});

export default mongoose.model('Promotion', promotionSchema);