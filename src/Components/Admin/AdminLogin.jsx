import React, { useState, useEffect } from "react";
import { baseUrl } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../shared/Loader";

const REMEMBER_EMAIL_KEY = "rememberedEmail";
const REMEMBER_EMAIL_EXPIRY_KEY = "rememberedEmailExpiry";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ainetToken");
    // Check if we're not already on the login page due to a redirect
    const isRedirected = new URLSearchParams(window.location.search).get('from') === 'profile';

    if (token && !isRedirected) {
      // Set loading state to true to show loading indicator
      setLoading(true);
      // Navigate immediately to prevent seeing the login page
      navigate("/profile");
    }
  }, [navigate]);

  // On mount, check for remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
    const expiry = localStorage.getItem(REMEMBER_EMAIL_EXPIRY_KEY);
    if (rememberedEmail && expiry && Date.now() < Number(expiry)) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    } else {
      localStorage.removeItem(REMEMBER_EMAIL_KEY);
      localStorage.removeItem(REMEMBER_EMAIL_EXPIRY_KEY);
    }
  }, []);

  // If user unchecks rememberMe, remove remembered email
  useEffect(() => {
    if (!rememberMe) {
      localStorage.removeItem(REMEMBER_EMAIL_KEY);
      localStorage.removeItem(REMEMBER_EMAIL_EXPIRY_KEY);
    }
  }, [rememberMe]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseUrl}client/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.data.token) {
        // Use the login function from AuthContext
        // This ensures proper state synchronization
        const token = data.data.token;
        localStorage.setItem("ainetToken",token)

       
            toast.success("Login successful!");

            // Remember email for 24 hours if checked
            if (rememberMe) {
              localStorage.setItem(REMEMBER_EMAIL_KEY, email);
              localStorage.setItem(
                REMEMBER_EMAIL_EXPIRY_KEY,
                (Date.now() + 24 * 60 * 60 * 1000).toString()
              );
            } else {
              localStorage.removeItem(REMEMBER_EMAIL_KEY);
              localStorage.removeItem(REMEMBER_EMAIL_EXPIRY_KEY);
            }

            // Navigate immediately without delay
            navigate("/profile");
         
        
      } else {
        setError(data.message || "Invalid email or password");
        toast.error(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      {loading && <Loader />}
      <div className="max-w-7xl mx-auto">
        {/* Header Logo */}
        <div>
          <img src="/loglogo.png" alt="Logo" className="w-1/6" />
        </div>

        {/* Main Content */}
        <div
          className="rounded-3xl shadow-2xl overflow-hidden bg-cover"
          style={{ backgroundImage: "url('/bg5.png')" }}
        >
          <div className="flex flex-col lg:flex-row min-h-[600px] pt-8 lg:pt-0">
            {/* Left Image */}
            <div className="lg:w-1/2 relative overflow-hidden flex items-center justify-center">
              <img
                src="Logban.jpg"
                alt="Banner"
                className="w-[85%] h-[85%] object-cover rounded-3xl"
              />
            </div>

            {/* Right Login Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="mb-8">
                  <img src="/loglogo.png" alt="Logo" className="w-1/2" />
                  <h3 className="text-3xl font-extrabold text-gray-800 mb-2">
                    Admin Login
                  </h3>
                  <p className="text-gray-600">Log in with your email</p>
                </div>

                {/* Login Inputs */}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:border-gray-500 focus:outline-none transition-colors bg-transparent backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 border-2 border-black rounded-lg focus:border-gray-500 focus:outline-none transition-colors bg-transparent backdrop-blur-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                      >
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-black">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-500"
                      />
                      <span className="ml-2">Remember me</span>
                    </label>
                    <button className="text-sm text-black hover:text-gray-800">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-amber-100 hover:bg-amber-200 text-black font-semibold py-3 px-4 rounded-full transition-colors duration-200 border border-amber-200 disabled:opacity-60"
                  >
                    {loading ? "Logging in..." : "LOG IN"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
