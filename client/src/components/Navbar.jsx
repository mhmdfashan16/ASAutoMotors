import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";
import assets from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser, setLoginState } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-yellow-400"
        >
          <img src={assets.as_logo} alt="logo" className="w-10 h-10" />
          <span>AsAutoMotors</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li className="cursor-pointer hover:text-yellow-300" onClick={() => navigate("/all-products")}>
            All Products
          </li>
          <li>
            <Link to="/search" className="hover:text-yellow-300">Search</Link>
          </li>
          <li>
            <Link to="/promotion" className="hover:text-yellow-300">Promotions</Link>
          </li>
          <li>
            <Link to="/inquiry" className="hover:text-yellow-300">Inquiry</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300">Contact Us</Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-lg font-semibold">
                User: <strong>{user.name || user.email}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-yellow-400 px-6 py-2 rounded hover:bg-yellow-500 text-lg font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setLoginState(true)}
              className="bg-yellow-200 px-6 py-2 rounded hover:bg-yellow-300 text-black text-lg font-bold"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
