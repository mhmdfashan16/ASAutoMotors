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
    <div className="max-w-6xl mx-auto px-4 py-10 text-center items-center transition-all duration-500">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Current Promotions</h2>

      <div className="relative w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          src={promo.image}
          alt={promo.title}
          className="w-f100 h-100 object-cover"
        />
        <div className="p-4 bg-gray-700 text-left">
          <h3 className="text-xl font-semibold text-white mb-1">{promo.title}</h3>
          <p className="text-gray-300 text-sm mb-2">{promo.description}</p>
          <p className="text-sm text-red-400 font-medium">
            Valid Until: {new Date(promo.expiredDate).toLocaleDateString()}
          </p>
        </div>

        {/* Slide Controls */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={handlePrev}
            className=" bg-opacity-30 text-white  rounded-r hover:bg-opacity-60"
          >
            <img src={assets.back_icon} alt="" className="w-10 opacity-10 hover:opacity-40"/>
          
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={handleNext}
            className="bg-opacity-30 text-white px-3 py-2 rounded-l hover:bg-opacity-60"
          >
            <img src={assets.next_icon} alt="" className="w-10 opacity-10 hover:opacity-40"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionPage;
