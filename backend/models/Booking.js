import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  product: { type: String, required: true },
  productName: { type: String },
  date: { type: Date, default: Date.now },
  image: { type: String } // Optional, if you want to display the product image
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
