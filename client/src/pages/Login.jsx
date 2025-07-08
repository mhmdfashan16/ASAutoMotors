import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";
import assets from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [state, setState] = useState("login"); // "login" or "register"
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, setLoginState, setIsAdmin } = useGlobalContext();

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
      const endpoint = state === "login" ? "/api/auth/login" : "/api/auth/register";
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

      const res = await axios.post(endpoint, payload, { withCredentials: true });

      if (res.data.success) {
        const loggedUser = res.data.user;
        setUser(loggedUser);
        setLoginState(false);
        toast.success(`${state === "login" ? "Login" : "Registration"} Successful`);
        setFormData({ name: "", email: "", password: "", phone: "" });
        } else {
        const msg = res.data.message || "Something went wrong";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Server error";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1001] bg-black/60">
      <div className="relative top-30 rounded-2xl justify-center max-w-full w-2xl mx-auto px-10 py-10 bg-gray-800 h-fit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-200">
            {state === "register" ? "Register" : "Login"}
          </h2>
          <img
            src={assets.close_icon}
            alt="close"
            className="w-5 h-5 cursor-pointer"
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
                  className="w-full px-4 py-3 border-none rounded bg-gray-800 text-gray-300"
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
                  className="w-full px-4 py-3 border-none rounded bg-gray-800 text-gray-300"
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
              className="w-full px-4 py-3 border-none rounded bg-gray-800 text-gray-300"
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
              className="w-full px-4 py-3 border-none rounded bg-gray-800 text-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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
