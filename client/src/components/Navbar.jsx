import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";
import assets from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const Navbar = () => {
  const { user, setUser, setLoginState } = useGlobalContext();
    const [menuOpen, setMenuOpen] = useState(false);
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
    <nav className="bg-gray-900 text-white px-4 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-yellow-400"
        >
          <img src={assets.as_logo} alt="logo" className="w-12 h-12" />
          <span>AsAutoMotors</span>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 items-center">
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
          <li>
            <Link to="/search" className="flex items-center bg-gray-700 px-3 py-1 rounded-xl">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-0 outline-none text-white placeholder-gray-300 w-24 sm:w-32"
              />
              <img src={assets.searchIcon} alt="search" className="w-4 ml-2" />
            </Link>
          </li>
        </ul>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-xl font-bold border rounded-full p-2 w-10 h-10 flex items-center justify-center">
                {(user?.name?.[0] || user?.email?.[0] || '').toUpperCase()}
              </span>
              <button
                onClick={handleLogout}
                className="bg-amber-300 px-5 py-2 rounded hover:shadow-lg text-gray-900 font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setLoginState(true)}
              className="bg-amber-300 px-5 py-2 rounded hover:shadow-lg text-gray-900 font-bold"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 px-4 space-y-3">
          <Link to="/all-products" className="block" onClick={() => setMenuOpen(false)}>
            All Products
          </Link>
          <Link to="/promotion" className="block" onClick={() => setMenuOpen(false)}>
            Promotions
          </Link>
          <Link to="/inquiry" className="block" onClick={() => setMenuOpen(false)}>
            Inquiry
          </Link>
          <Link to="/contact" className="block" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>
          <Link to="/search" className="block" onClick={() => setMenuOpen(false)}>
            <div className="flex items-center bg-gray-700 px-3 py-2 rounded-xl mt-2">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-0 outline-none text-white placeholder-gray-300 w-full"
              />
              <img src={assets.searchIcon} alt="search" className="w-4 ml-2" />
            </div>
          </Link>

          {/* Auth (Mobile) */}
          <div className="mt-4">
            {user ? (
              <>
                <div className="mb-2 font-bold">
                  {(user?.name || user?.email)}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-amber-300 px-4 py-2 w-full rounded text-gray-900 font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setLoginState(true);
                  setMenuOpen(false);
                }}
                className="bg-amber-300 px-4 py-2 w-full rounded text-gray-900 font-bold"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
