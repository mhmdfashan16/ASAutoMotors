import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import upload_area from "../assets/upload_area.png";

const AddPromotion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [files, setFiles] = useState([null]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !discount || !validUntil) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("discount", discount);
      formData.append("validUntil", validUntil);

      if (files[0]) {
        formData.append("file", files[0]);
      }

      const res = await axios.post("http://localhost:5000/api/promo/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Promotion added successfully!");
        setTitle("");
        setDescription("");
        setDiscount("");
        setValidUntil("");
        setFiles([null]);
      } else {
        toast.error(res.data.message || "Failed to add promotion");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding promotion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Promotion</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title *</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description *</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Discount Amount (%) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="w-full border px-3 py-2 rounded"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Valid Until *</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
            required
          />
        </div>

        {/* ✅ Upload area with preview */}
        <div>
          <label htmlFor="image0" className="block font-semibold mb-1">
            Promotion Image
          </label>
          <label htmlFor="image0" className="inline-block cursor-pointer">
            <input
              type="file"
              accept="image/*"
              id="image0"
              hidden
              onChange={(e) => {
                const updatedFiles = [...files];
                updatedFiles[0] = e.target.files[0];
                setFiles(updatedFiles);
              }}
            />
            <img
              src={
                files[0]
                  ? URL.createObjectURL(files[0])
                  : upload_area 
              }
              alt="Upload Preview"
              className="max-w-24 max-h-24 border rounded object-contain"
              width={100}
              height={100}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Promotion"}
        </button>
      </form>
    </div>
  );
};

export default AddPromotion;
