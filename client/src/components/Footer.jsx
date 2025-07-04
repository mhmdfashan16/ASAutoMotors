import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <img src={assets.as_logo} alt="" className="w-20"/>
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">
            AsAutoMotors
          </h3>
          <p className="text-sm text-gray-300">
            If you're looking to buy or sell used bike then AS Auto Motors is the answer. You're sure to find the perfect Motorcycles on AS Auto Motors.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-yellow-300">All Products</Link></li>
            <li><Link to="/search" className="hover:text-yellow-300">Search</Link></li>
            <li><Link to="/promotion" className="hover:text-yellow-300">Promotions</Link></li>
            <li><Link to="/inquiry" className="hover:text-yellow-300">Inquiry</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-300">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-300">Email:  ikman5147@gmail.com</p>
          <p className="text-sm text-gray-300">Phone: +94 77 039 3697</p>
          <p className="text-sm text-gray-300">Address:  AS Auto Motors, No 181, Navalar Road, Jaffna, Sri Lanka</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-8">
        © {new Date().getFullYear()} AsAutoMotors. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
