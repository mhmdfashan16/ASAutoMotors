// import Booking from '../models/bookingModel.js';

import Booking from "../models/Booking.js";

// Add new booking
// export const addBooking = async (req, res) => {
//   try {
//     const { customer, product, date, image } = req.body;

//     const booking = new Booking({ customer, product, date, image });
//     await booking.save();

//     res.status(201).json({ success: true, booking });
//   } catch (error) {
//     console.error('Error adding booking:', error);
//     res.status(500).json({ success: false, message: 'Failed to add booking' });
//   }
// };

// export const addBooking = async (req, res) => {
//   try {
//     const { customer, productId, productName, bookingDate } = req.body;

//      let imageUrl = '';
//             if (req.file) {
//                 const result = await cloudinary.uploader.upload(req.file.path, {
//                     folder: 'as_auto_motors',
//                     use_filename: true
//                 });
//                 imageUrl = result.secure_url;
//             }

//     if (!customer || !productId || !bookingDate) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const newBooking = new Booking({
//       customer,
//       product: productId,
//       productName,
//       imageUrl,
//       bookingDate,
//     });

//     await newBooking.save();
//     res.status(201).json({ success: true, booking: newBooking });
//   } catch (error) {
//     console.error("Booking creation error:", error);
//     res.status(500).json({ success: false, message: "Server error while creating booking" });
//   }
// };

// POST /api/booking/add
export const addBooking = async (req, res) => {
  const { customer, productId, productName, image, bookingDate, phone } = req.body;
  console.log("Received booking data:", req.body);

  if (!customer || !productId || !productName || !bookingDate) {
    console.log("Missing required booking data");
    return res.status(400).json({ success: false, message: "Missing booking data" });
  }

  try {
    const booking = new Booking({
      customer,
      phone,
      productId,
      productName,
      image,
      bookingDate,
    });

    await booking.save();
    

    res.status(201).json({ success: true, message: "Booking successful", booking });
  } catch (err) {
    console.error("❌ Error saving booking:", err.message);
    res.status(500).json({ success: false, message: "Booking failed" });
  }
};


// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting booking' });
  }
};
