import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser();
      if (response?.data?.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        dispatch(login(token));
        navigate("/dashboard");
      } else {
        setError("Invalid response from server. Token not received.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side - Branding */}
      <div className="hidden md:flex lg:w-2/5 bg-purple-700 text-white items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">EASTERN</h1>
          <p className="text-lg">Welcome to Eastern Techno Solutions!</p>
        </div>
        <div className="absolute bottom-4 w-full text-center">
          <p className="text-sm">© 2025 Eastern Techno Solutions</p>
        </div>
      </div>

      {/* Right Side - Login Form (Wider and More Centered) */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-lg p-8 shadow-lg bg-white rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-2">Sign In</h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your username and password
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-lg mb-1">Email*</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-lg mb-1">
                Password*
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-blue-500 text-sm">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white text-lg py-3 rounded-md hover:bg-blue-800 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
