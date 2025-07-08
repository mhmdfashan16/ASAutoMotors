import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/product/", {
          withCredentials: true,
        });

        if (data.success && data.products) {
          setProducts(data.products);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        All Products
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex bg-gray-300 shadow-md rounded-xl overflow-hidden hover:shadow-xl  hover:border-gray-500 transition cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <div className="p-2">
                 <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-xl border-4 border-gray-500"
              />
              </div>
             
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
                <h4 className="text-md font-medium text-gray-600">{product.brand} - {product.model}</h4>
                <p className="text-gray-600 mt-1">{product.description}</p>
            
                <p className="text-gray-600 mt-1">{product.specifications}</p>
                <p className="text-green-700 font-bold mt-2">Rs: {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="mt-20 text-gray-400" />
    </div>
  );
};

export default AllProducts;
