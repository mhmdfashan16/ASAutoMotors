// models/Inquiry.js
import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  userId:String,
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Inquiry', inquirySchema);