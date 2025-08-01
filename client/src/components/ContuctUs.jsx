import React, { useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending data
    console.log("Contact form submitted:", formData);

    // Reset form and show message
    setFormData({ name: "", email: "", message: "" });
    setSubmitted(true);
    toast.success("Message sent successfully");

    // Hide success message after 4 seconds
    setTimeout(() => setSubmitted(false), 2000);
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post("/api/contuct/", formData); // Axios call
//     if (response.data.success) {
//       setFormData({ name: "", email: "", message: "" });
//       setSubmitted(true);
//       setTimeout(() => setSubmitted(false), 4000);
//     }
//   } catch (error) {
//     console.error("Error sending message:", error);
//     alert("Failed to send message. Please try again later.");
//   }
// };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Contact Us
      </h2>

      {submitted && (
        <div className="bg-green-100 text-green-800 text-sm p-4 mb-6 rounded">
          Thank you! Your message has been sent.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-400 p-6 shadow-lg rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-800">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-700  rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-700 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-800">
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border-2 border-gray-700  rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-4 rounded-md hover:bg-gray-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
