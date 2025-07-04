import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context/GlobalProvider";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const {user, setUser} = useGlobalContext();

  // Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/product/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Error fetching product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handler for booking
  const handleBooking = async () => {
    if (!product) return;

    setBookingLoading(true);

    try {
      // Replace this with actual logged-in user data or from context
      const bookingData = {
        customer: user.name,  
        productId: product._id,
        productName: product.name,
        image:product.image,
        bookingDate: new Date().toISOString(),
      };

      const res = await axios.post("http://localhost:5000/api/booking/add", bookingData, {
        withCredentials: true, // if backend uses cookies for auth
      });

      if (res.data.success) {
        toast.success("Booking successful!");
      } else {
        toast.error(res.data.message || "Booking failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error booking product.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading product...</div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          {error || "Product not found."}
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <p className="text-lg font-bold mb-10">
        Product / {product.name} / {product._id}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          {Array.isArray(product.image) ? (
            product.image.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Product ${index}`}
                className="w-full h-150 object-cover rounded-lg shadow"
              />
            ))
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover rounded-lg shadow"
            />
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name} - {product.model}
          </h1>
          <p className="text-lg text-gray-600 font-medium mb-1">
            Brand: {product.brand}
          </p>
          <p className="text-2xl text-green-700 font-bold mb-4">
            Rs. {parseInt(product.price).toLocaleString("en-LK")} LKR
          </p>

          <h2 className="text-xl font-semibold mb-2">Specifications:</h2>
          <p className="text-gray-700 mb-4">{product.specifications}</p>

          <h2 className="text-xl font-semibold mb-2">Description:</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {Array.isArray(product.description)
              ? product.description.map((line, i) => <li key={i}>{line}</li>)
              : <li>{product.description}</li>}
          </ul>

          <button
            onClick={handleBooking}
            disabled={bookingLoading}
            className={`text-lg font-bold border-0 bg-yellow-300 px-10 py-2 mt-10 cursor-pointer ${
              bookingLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {bookingLoading ? "Booking..." : "Pre Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
