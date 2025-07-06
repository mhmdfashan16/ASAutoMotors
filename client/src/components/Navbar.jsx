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
          <img src={assets.as_logo} alt="logo" className="w-15 h-12" />
          <span>AsAutoMotors</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li className="cursor-pointer hover:text-yellow-300 hover:underline" onClick={() => navigate("/all-products")}>
            All Products
          </li>
          
          <li>
            <Link to="/promotion" className="hover:text-yellow-300 hover:underline">Promotions</Link>
          </li>
          <li>
            <Link to="/inquiry" className="hover:text-yellow-300 hover:underline">Inquiry</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300 hover:underline">Contact Us</Link>
          </li>
          <li className="flex items-center ">
            <Link to="/search" className="flex items-center bg-gray-600 px-5 py-2 rounded-xl">
            <input type="text" placeholder="search" className="border-0"/>
            <img src={assets.searchIcon} alt="" className="w-5"/>
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="flex justify-center items-center text-xl font-bold border-3 rounded-full p-2 w-10 h-10">
                 {(user?.name?.[0] || user?.email?.[0] || '').toUpperCase()}
              </span>
              <button
                onClick={handleLogout}
                className="bg-amber-300 px-6 py-2 rounded hover:shadow-amber-600 text-lg text-gray-800 font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setLoginState(true)}
              className="bg-amber-300 px-6 py-2 rounded hover:shadow-amber-600  text-gray-800 text-lg font-bold cursor-pointer"
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
