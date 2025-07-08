// import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema({
//   customer: { type: String, required: true },
//   product: { type: String, required: true },
//   productName: { type: String },
//   date: { type: Date, default: Date.now },
//   image: { type: String } // Optional, if you want to display the product image
// }, { timestamps: true });

// export default mongoose.model('Booking', bookingSchema);


import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  phone:{
    type:Number,
    
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
    required: true,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

export default mongoose.model('Booking', bookingSchema);
