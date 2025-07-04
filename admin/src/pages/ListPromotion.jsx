import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch promotions on mount
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/promo", {
          withCredentials: true
        });
        setPromotions(res.data.promos || []);
      } catch (error) {
        toast.error("Failed to load promotions");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Handle validate
  const handleValidate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/promo/validate/${id}`, {}, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Promotion validated");
        // Update the UI
        setPromotions((prev) =>
          prev.map((promo) =>
            promo._id === id ? { ...promo, isValid: true } : promo
          )
        );
      } else {
        toast.error(res.data.message || "Failed to validate promotion");
      }
    } catch (err) {
      toast.error("Error validating promotion");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Promotions</h2>

      {loading ? (
        <p className="text-gray-500">Loading promotions...</p>
      ) : promotions.length === 0 ? (
        <p className="text-gray-500">No promotions available.</p>
      ) : (
        <ul className="space-y-2">
          {promotions.map((promo) => (
            <li
              key={promo._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <strong>{promo.title}</strong>
                <p>Status: {promo.isValid ? "✅ Valid" : "⌛ Pending"}</p>
              </div>
              {!promo.isValid && (
                <button
                  onClick={() => handleValidate(promo._id)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Validate
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PromotionList;
