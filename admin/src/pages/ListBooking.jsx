import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from backend
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/booking/", {
        withCredentials: true,
      });

      if (res.data.success) {
        setBookings(res.data.bookings);
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      toast.error("Error loading bookings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/booking/${id}`, {
        withCredentials: true,
      });
      toast.success("Booking deleted");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error("Failed to delete booking");
    }
  };

  if (loading)
    return <div className="p-6 text-gray-600">Loading bookings...</div>;

  if (bookings.length === 0)
    return <div className="p-6 text-gray-500">No bookings found.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>

      {/* Header Row */}
      <div className="hidden md:flex font-semibold text-gray-700 bg-gray-100 px-4 py-2 rounded">
        <div className="w-1/4">Image</div>
        <div className="w-1/4">Customer</div>
        <div className="w-1/4">Product</div>
        <div className="w-1/4">Date</div>
        <div className="w-1/4">Action</div>
      </div>

      {/* Data Rows */}
      <div className="space-y-3 mt-2">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="flex flex-col md:flex-row bg-white p-4 rounded shadow-sm border border-gray-200"
          >
            <div className="w-full md:w-1/4">
              {b.image ? (
                <img
                  src={Array.isArray(b.image) ? b.image[0] : b.image}
                  alt="bike"
                  className="h-20 w-auto object-contain"
                />
              ) : (
                <span className="text-sm text-gray-400">No Image</span>
              )}
            </div>
            <div className="w-full md:w-1/4 mt-2 md:mt-0">
            <p className="font-bold">{b.customer}</p>
            <p>+94{b.phone}</p>
            <p></p>

            </div>
            <div className="w-full md:w-1/4 mt-2 md:mt-0">{b.productName}</div>
            <div className="w-full md:w-1/4 mt-2 md:mt-0">
              {new Date(b.bookingDate).toLocaleDateString()}
            </div>
            <div className="w-full md:w-1/4 mt-2 md:mt-0">
              <button
                onClick={() => handleDelete(b._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
