import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/AS.png'
import user from '../assets/user.png'
import axios from 'axios'
import toast from "react-hot-toast";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";


const AdminNavbar = () => {

  const { setLogin, setAdmin} = useAdminContext();

  const navigate = useNavigate();

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
    <div>
    <nav className="bg-gray-800 text-white px-20 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-15 h-10" />
        <h1 className="text-xl font-bold">AsAutoMotors</h1>
      </div>
      <div className="flex items-center gap-10">
        <p className="text-lg text-gray-300">Hello admin!</p>
        <img src={user} alt="" className="w-10"/>
        <button  className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 text-lg font-bold cursor-pointer"
        onClick={()=>{
          logoutAdmin()
          
        }}
        >Logout</button>
      </div>
    </nav>
    
    </div>
  );
};

export default AdminNavbar;
