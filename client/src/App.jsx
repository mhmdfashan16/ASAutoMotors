import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllProducts from "./components/AllProducts";
import SearchProducts from "./components/SearchProducts";

import ChatbotPage from "./pages/ChatbotPage";
import InquiryPage from "./pages/InquiryPage";
import PromotionPage from "./pages/PromotionPage";
import ContactUs from "./components/ContuctUs";
import LoginPage from "./pages/Login";
import Hero from "./components/Hero";
import ProductView from "./pages/ProductView";
import { useGlobalContext } from "./context/GlobalProvider";
import { Toaster } from "react-hot-toast";
import assets from "./assets/assets";

function App() {

  const location = useLocation();
  const {loginState, setLoginState, chatState, setChatState}=useGlobalContext();

 
  const hideNavbar = location.pathname.startsWith("/product/");
  return (
    <div className="bg-gray-300">
       {chatState && <ChatbotPage/>}
       {loginState && <LoginPage/>}
      {!hideNavbar && <Navbar />}
      
     
    <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <PromotionPage/>
              <AllProducts />
              <ContactUs />
            </>
          }
        />
        <Route path="/" element={<Hero/>}/>
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/search" element={<SearchProducts />} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/product/:id" element={<ProductView/>} />
      </Routes>
      <div
  className="fixed right-5 bottom-10 z-50 chatbot-trigger group"
  onClick={() => setChatState(true)}
>
  <img
    src={assets.chatbot}
    alt="Chatbot"
    className="w-20  relative z-10"
  />
</div>

      <Footer />
    </div>
  );
}

export default App;

