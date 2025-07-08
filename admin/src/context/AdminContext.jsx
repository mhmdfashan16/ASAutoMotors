import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const AdminContext = createContext();

// 2. Custom Hook for Easy Access
export const useAdminContext = () => useContext(AdminContext);

// 3. Provider Component
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  

  // Auto-verify admin on mount (if token/cookie exists)
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/verify", {
          withCredentials: true,
        });

        if (data.success && data.user.role === "admin") {
          setAdmin(data.user);
        } else {
          setAdmin(null);
        }
        console.log(data.user);
      } catch (err) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);



  const value = {
    admin, setAdmin, loading,
    login, setLogin,
    
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
