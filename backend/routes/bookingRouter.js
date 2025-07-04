import express from 'express';
// import { addBooking, getBookings, deleteBooking } from '../controllers/bookingController.js';
import { authAdmin, authenticate } from '../middleware/auth.js';
import { addBooking, deleteBooking, getBookings } from '../controller/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/add',authenticate, addBooking);           // Add a booking
bookingRouter.get('/',authAdmin ,getBookings);           // Get all bookings
bookingRouter.delete('/:id',authAdmin ,deleteBooking);   // Delete a booking

export default bookingRouter;
