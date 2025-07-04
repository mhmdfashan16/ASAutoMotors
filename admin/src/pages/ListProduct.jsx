import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/", {
        withCredentials: true,
      });
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Remove a product
  const handleRemove = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this product?");
      if (!confirm) return;

      await axios.delete(`http://localhost:5000/api/product/${id}`, {
        withCredentials: true,
      });

      toast.success("Product removed successfully");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Image</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Model</th>
              <th className="text-left p-2">Brand</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-gray-500">
                <td className="py-4">
                  <img src={p.image[0]} alt="" className="w-15 h-20"/>
                </td>
                <td className="py-4">{p.name}</td>
                <td className="py-4">{p.model}</td>
                <td className="py-4">{p.brand}</td>
                <td className="py-4">Rs. {p.price}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleRemove(p._id)}
                    className=" hover:bg-red-600 bg-red-500 text-white px-2 py-1 rounded-xl cursor-pointer font-bold"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
