import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import upload_area from "../assets/upload_area.png";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    model: "",
    brand: "",
    description: "",
    specifications: "",
    price: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });

      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const res = await axios.post("http://localhost:5000/api/product/add", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Product added successfully");
        setForm({
          name: "",
          model: "",
          brand: "",
          description: "",
          specifications: "",
          price: "",
          image: null,
        });
        setImagePreview(null);
      } else {
        toast.error(res.data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Add product error:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded shadow-sm" required />
        <input type="text" name="model" placeholder="Model" value={form.model} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded shadow-sm" required />
        <input type="text" name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded shadow-sm" required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded shadow-sm" required />
        <input type="text" name="specifications" placeholder="Specifications" value={form.specifications} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded shadow-sm" required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded shadow-sm" required />

        {/* ✅ Upload area using label & image */}
        <div>
          <label htmlFor="productImage" className="block font-semibold mb-1">
            Product Image
          </label>

          <label htmlFor="productImage" className="inline-block cursor-pointer">
            <input
              type="file"
              id="productImage"
              name="image"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
            <img
              src={imagePreview || upload_area}
              alt="Product Upload"
              className="h-40 w-full border-none rounded object-contain"
            />
          </label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
