import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";
import assets from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [state, setState] = useState("login"); // "login" or "register"
  const [error, setError] = useState("");
  const { setUser, setLoginState } = useGlobalContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint =
        state === "login"
          ? "/api/auth/login"
          : "/api/auth/register";

      const payload =
        state === "login"
          ? { email: formData.email, password: formData.password }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              phone: formData.phone,
              role: "user",
            };

      const response = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      if (response.data.success) {
        setUser(response.data.user);
        setLoginState(false);
        toast.success("Login Successful");
        navigate("/");
      } else {
        setError(response.data.message || "Something went wrong.");
        toast.error("Login failed");
      }
    } catch (err) {
      console.error("Auth error:", err);
      const errorMsg = err.response?.data?.message || "Error occurred";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="z-10 absolute top-0 bg-black/60 w-full h-full flex justify-center">
      <div className="absolute rounded-2xl top-20 max-w-full w-2xl mx-auto px-10 py-10 bg-gray-800 h-fit">
      <div className="flex justify-center">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">
          User {state === "register" ? "Register" : "Login"}
        </h2>
        <img
          src={assets.close_icon}
          alt="close"
          className="relative w-5 h-5 left-55 cursor-pointer"
          onClick={() => setLoginState(false)}
        />
      </div>
      

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 shadow-md rounded-lg">
          {state === "register" && (
            <>
              <div className="mb-4">
                <label className="block text-md font-medium text-gray-400">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-gray-400">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-400">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-md font-medium text-gray-400">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            {state === "register" ? "Register" : "Login"}
          </button>

          <div className="py-4 text-white text-center">
            {state === "login" ? (
              <p>
                Don't have an account?{" "}
                <span
                  className="text-blue-400 cursor-pointer underline"
                  onClick={() => setState("register")}
                >
                  Register here
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  className="text-blue-400 cursor-pointer underline"
                  onClick={() => setState("login")}
                >
                  Login here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
