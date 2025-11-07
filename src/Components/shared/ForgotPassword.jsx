import React, { useState, useRef, useEffect } from "react";
import { baseUrl } from "../../utils/constant";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}client/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.status) {
        // Show popup with message
        setPopupMessage(data.message || data.data?.message || "Password reset code has been sent to your email.");
        setShowPopup(true);
      } else {
        toast.error(data.message || "Failed to send reset code. Please try again.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    setShowResetForm(true);
  };

  // Focus first input when reset form is shown
  useEffect(() => {
    if (showResetForm && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [showResetForm]);

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    const numValue = value.replace(/\D/g, "");
    
    if (numValue.length > 1) {
      // If pasting multiple digits, distribute them
      const digits = numValue.slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(index + digits.length, 5);
      if (otpRefs.current[nextIndex]) {
        otpRefs.current[nextIndex].focus();
      }
    } else {
      // Single digit input
      const newOtp = [...otp];
      newOtp[index] = numValue;
      setOtp(newOtp);
      
      // Auto-focus next input if digit entered
      if (numValue && index < 5 && otpRefs.current[index + 1]) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
    
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const digits = pastedData.split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < 6) {
          newOtp[i] = digit;
        }
      });
      setOtp(newOtp);
      // Focus the next empty input or the last one
      const nextIndex = Math.min(digits.length, 5);
      if (otpRefs.current[nextIndex]) {
        otpRefs.current[nextIndex].focus();
      }
    }
  };

  const getOtpString = () => {
    return otp.join("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const otpString = getOtpString();
    if (!otpString || otpString.length !== 6) {
      toast.error("Please enter a valid 6-digit token");
      return;
    }

    if (!password) {
      toast.error("Please enter a new password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}client/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          token: getOtpString(),
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.status) {
        // Show success popup instead of toast
        setSuccessMessage(data.message || "Your password has been reset successfully. You can now login with your new password.");
        setShowSuccessPopup(true);
      } else {
        toast.error(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
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
                src="/LoginBg.jpg"
                alt="Banner"
                className="w-[85%] h-[85%] object-cover rounded-3xl"
              />
            </div>

            {/* Right Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="mb-8">
                  <img src="/loglogo.png" alt="Logo" className="w-1/2" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {showResetForm ? "Reset Password" : "Forgot Password"}
                  </h3>
                  <p className="text-gray-600">
                    {showResetForm
                      ? "Enter OTP and new password"
                      : "Enter your email to receive reset code"}
                  </p>
                </div>

                {!showResetForm ? (
                  /* Email Form */
                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border-2 border-black rounded-lg focus:border-gray-500 focus:outline-none transition-colors bg-transparent backdrop-blur-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-amber-100 hover:bg-amber-200 text-black font-semibold py-3 px-4 rounded-full transition-colors duration-200 border border-amber-200 disabled:opacity-60"
                    >
                      {loading ? "Sending..." : "Confirm Email"}
                    </button>

                    <div className="text-center">
                      <Link
                        to="/login"
                        className="text-sm text-black hover:text-gray-800"
                      >
                        Back to Login
                      </Link>
                    </div>
                  </form>
                ) : (
                  /* Reset Password Form */
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reset Token (6 digits)
                      </label>
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-sm text-gray-600 font-semibold text-center">Enter your OTP Code</p>
                        <div className="flex gap-2 justify-center">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (otpRefs.current[index] = el)}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              onPaste={handleOtpPaste}
                              className="w-12 h-12 text-center text-xl font-semibold border-2 border-black rounded-lg focus:border-gray-500 focus:outline-none transition-all duration-300 bg-transparent backdrop-blur-sm"
                              style={{
                                backgroundColor: digit ? "#f3f4f6" : "transparent",
                                color: digit ? "#000000" : "#000000",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          required
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full px-4 py-3 border-2 border-black rounded-lg focus:border-gray-500 focus:outline-none transition-colors bg-white backdrop-blur-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                          {showPassword ? (
                            <FaEyeSlash size={18} />
                          ) : (
                            <FaEye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          required
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="w-full px-4 py-3 border-2 border-black rounded-lg focus:border-gray-500 focus:outline-none transition-colors bg-white backdrop-blur-sm"
                        />  
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                          {showConfirmPassword ? (
                            <FaEyeSlash size={18} />
                          ) : (
                            <FaEye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-amber-100 hover:bg-amber-200 text-black font-semibold py-3 px-4 rounded-full transition-colors duration-200 border border-amber-200 disabled:opacity-60"
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </button>

                    <div className="text-center">
                      <Link
                        to="/login"
                        className="text-sm text-black hover:text-gray-800"
                      >
                        Back to Login
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Sent Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Password Reset Code Sent
            </h3>
            <p className="text-gray-700 mb-6">{popupMessage}</p>
            <button
              onClick={handlePopupOk}
              className="w-full bg-amber-100 hover:bg-amber-200 text-black font-semibold py-3 px-4 rounded-full transition-colors duration-200 border border-amber-200"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Password Reset Successful
            </h3>
            <p className="text-gray-700 mb-6">{successMessage}</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-amber-100 hover:bg-amber-200 text-black font-semibold py-3 px-4 rounded-full transition-colors duration-200 border border-amber-200"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

