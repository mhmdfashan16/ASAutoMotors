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
  const handleDelete = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/promo/${id}`, {
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success("Promotion deleted");
      setPromotions((prev) => prev.filter((p) => p._id !== id));
    } else {
      toast.error(res.data.message || "Failed to delete promotion");
    }
  } catch (err) {
    toast.error("Error deleting promotion");
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
              <div className="flex gap-10">
                <img src={promo.image} alt="" className="max-w-25"/>
                <div>
              
                  <strong className="text-lg">{promo.title}</strong>
                  <p>Desciption: {promo.description}</p>
                  <p className="text-green-500">Discount : {promo.discountAmount}%</p>
                  <p className="text-red-600">Valid Until : {promo.expiredDate}</p>
                </div>

              </div>
              {!promo.isValid && (
                <button
                  onClick={() => handleDelete(promo._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
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
