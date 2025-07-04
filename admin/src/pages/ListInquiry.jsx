import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const InquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inquiry/", {
        withCredentials: true,
      });

      if (res.data.success) {
        setInquiries(res.data.inquiries || []);
      } else {
        toast.error("Failed to load inquiries");
      }
    } catch (err) {
      toast.error("Error fetching inquiries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/inquiry/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Inquiry deleted");
        setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Error deleting inquiry");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Inquiries</h2>

      {loading ? (
        <p>Loading...</p>
      ) : inquiries.length === 0 ? (
        <p className="text-gray-600">No inquiries available.</p>
      ) : (
        <ul className="space-y-4">
          {inquiries.map((inq) => (
            <li
              key={inq._id}
              className="border p-4 rounded shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <div>
                <p><strong>Name:</strong> {inq.name}</p>
                <p><strong>Email:</strong> {inq.email}</p>
                <p><strong>Phone:</strong> {inq.phone}</p>
                <p><strong>Subject:</strong> {inq.subject}</p>
                <p><strong>Message:</strong> {inq.message}</p>
              </div>
              <button
                onClick={() => handleDelete(inq._id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 self-start"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InquiryList;
