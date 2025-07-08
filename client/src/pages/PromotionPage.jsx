import React, { useEffect, useState } from "react";
import axios from "axios";
import assets from "../assets/assets";

const PromotionPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch promotions
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await axios.get("/api/promo/");
        if (res.data.success) {
          setPromotions(res.data.promos || []);
        } else {
          setError("Failed to load promotions");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching promotions");
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Auto-slide every 2 seconds
  useEffect(() => {
    if (promotions.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [promotions]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? promotions.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading promotions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (promotions.length === 0) {
    return <div className="text-center text-gray-600 mt-10">No promotions available right now.</div>;
  }

  const promo = promotions[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 transition-all duration-500">
  <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
    Current Promotions
  </h2>

  <div className="relative w-full bg-white shadow-lg rounded-xl overflow-hidden">
    <div className="flex flex-col lg:flex-row items-center bg-gray-700">
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src={promo.image}
          alt={promo.title}
          className="w-full h-64 sm:h-80 lg:h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 py-6 px-6 sm:px-10 text-white text-left space-y-3">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{promo.title}</h3>
        <p className="text-base sm:text-lg">{promo.description}</p>
        <p className="text-sm sm:text-base text-red-400 font-medium">
          Valid Until: {new Date(promo.expiredDate).toLocaleDateString()}
        </p>
      </div>
    </div>

    {/* Slide Controls */}
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
      <button
        onClick={handlePrev}
        className="bg-black bg-opacity-20 p-1 rounded-r hover:bg-opacity-40 transition"
      >
        <img src={assets.back_icon} alt="Prev" className="w-8 sm:w-10 opacity-40 hover:opacity-80" />
      </button>
    </div>
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
      <button
        onClick={handleNext}
        className="bg-black bg-opacity-20 p-1 rounded-l hover:bg-opacity-40 transition"
      >
        <img src={assets.next_icon} alt="Next" className="w-8 sm:w-10 opacity-40 hover:opacity-80" />
      </button>
    </div>
  </div>
</div>

  );
};

export default PromotionPage;
