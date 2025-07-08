import React from "react";
import { Link, useLocation } from "react-router-dom";
import AddProduct from "../pages/AddProduct";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";

const Hero = ({ children }) => {
  const location = useLocation();
  
  const { setLogin, setAdmin} = useAdminContext();

  const navigate = useNavigate();

  const navLinks = [
    
    { name: "Add Product", path: "/admin/add-product" },
    { name: "List Products", path: "/admin/products" },
    { name: "Inquiries", path: "/admin/inquiries" },
    { name: "Promotions", path: "/admin/promotions" },
    { name: "Add Promotion", path: "/admin/add-promotion" },
    { name: "Bookings", path: "/admin/bookings" },
    
  ];

  const isActive = (path) => location.pathname === path;


    // Logout
  const logoutAdmin = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
       
      });
      setAdmin(null);
      setLogin(false);
       toast.success("Logged out");
       navigate('/');
      
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.message);
    }
  };

  return (
  <div className="flex h-screen">
    {/* Sidebar */}
    <aside className="w-64 bg-gray-700 text-white p-6 space-y-4 shadow-md overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold">AsAutoMotors Admin</h1>
      </div>

      {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`block px-4 py-2 rounded transition ${
            isActive(link.path)
              ? "bg-white text-gray-800 font-semibold"
              : "hover:bg-gray-700"
          }`}
        >
          {link.name}
        </Link>
      ))}

      <button
        onClick={logoutAdmin}
        className="mt-10 w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
    </aside>

    {/* Scrollable Main Content */}
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto max-h-screen">
      {children}
    </main>
  </div>
);
};

export default Hero;
