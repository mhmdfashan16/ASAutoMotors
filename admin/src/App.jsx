import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Admin Components & Pages
import AdminNavbar from "./components/AdminNavbar";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ListProduct";
import InquiryList from "./pages/ListInquiry";
import PromotionList from "./pages/ListPromotion";
import BookingList from "./pages/ListBooking";
import Hero from "./components/Hero";
import AdminLogin from "./components/Login";
import { Toaster } from "react-hot-toast";
import Admin from "./components/Admin";
import { useState } from "react";
import { useAdminContext } from "./context/AdminContext";


const AdminApp = () => {

  const {login, admin} = useAdminContext();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        
        <Toaster position="top-center" reverseOrder={false} />
        {admin && <AdminNavbar/>}
        
        <Routes>
          <Route path="/admin" element={<Admin/>}/>
          {/* <Route path="/admin" element={<Hero/>}/> */}
          
          <Route path="/" element={<AdminLogin/>} />
          <Route path="/admin/add-product" element={<Hero><AddProduct /></Hero>} />
          <Route path="/admin/products" element={<Hero><ProductList /></Hero>} />
          <Route path="/admin/inquiries" element={<Hero><InquiryList /></Hero>} />
          <Route path="/admin/promotions" element={<Hero><PromotionList /></Hero>} />
          <Route path="/admin/bookings" element={<Hero><BookingList /></Hero>} />
       
        </Routes>
      </div>
    </Router>
  );
};

export default AdminApp;
