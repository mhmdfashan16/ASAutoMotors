import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/product");
        if (res.data.success) {
          setAllProducts(res.data.products);
          setFilteredProducts(res.data.products);
        } else {
          setError("Failed to load products");
        }
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = allProducts.filter((product) => {
      const nameMatch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const brandMatch = product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      const modelMatch = product.model?.toLowerCase().includes(searchTerm.toLowerCase());

      const price = parseInt(product.price);
      const meetsMin = minPrice ? price >= parseInt(minPrice) : true;
      const meetsMax = maxPrice ? price <= parseInt(maxPrice) : true;

      return (nameMatch || brandMatch || modelMatch) && meetsMin && meetsMax;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, allProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Search Products
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name, Brand or Model"
          className="px-4 py-3 bg-gray-800 rounded-lg focus:ring w-full text-white"
        />
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
          className="px-4 py-3 border border-gray-300 bg-gray-800 rounded-lg focus:ring w-full text-white"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          className="px-4 py-3 border border-gray-300 bg-gray-800 rounded-lg focus:ring w-full text-white"
        />
        <button
          onClick={() => {
            setSearchTerm("");
            setMinPrice("");
            setMaxPrice("");
            setFilteredProducts(allProducts);
          }}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name} ({product.model})
                </h3>
                <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                <p className="text-green-700 font-bold mt-2">
                  Rs. {parseInt(product.price).toLocaleString("en-LK")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
