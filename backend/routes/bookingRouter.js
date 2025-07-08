import express from 'express';
// import { addBooking, getBookings, deleteBooking } from '../controllers/bookingController.js';
import { authAdmin } from '../middleware/auth.js';
import { addBooking, deleteBooking, getBookings } from '../controller/bookingController.js';
import upload from '../config/multer.js';
import { authenticate } from '../controller/inquiryController.js';

const bookingRouter = express.Router();

bookingRouter.post('/add',authenticate,upload.single('image'), addBooking);           // Add a booking
bookingRouter.get('/',authAdmin ,getBookings);           // Get all bookings
bookingRouter.delete('/:id',authAdmin ,deleteBooking);   // Delete a booking

export default bookingRouter;
