import React, { useState, useRef, useEffect } from "react";
import { baseUrl } from "../../utils/constant";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import AuthLayout from "./AuthLayout";
import { buttonPrimary, inputClass, labelClass } from "./sectionStyles";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const passwordToggleClass =
  "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink/50 transition-colors hover:text-ink focus:outline-none";

const Dialog = ({ title, message, actionLabel, onAction }) => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
    <div role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
      <h3 className="text-2xl font-extrabold tracking-tight text-ink">{title}</h3>
      <p className="mt-3 leading-relaxed text-ink/70">{message}</p>
      <button onClick={onAction} className={`${buttonPrimary} mt-6 w-full`}>
        {actionLabel}
      </button>
    </div>
  </div>
);

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
      const res = await fetch(`${baseUrl}/client/auth/forgot-password`, {
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
      const res = await fetch(`${baseUrl}/client/auth/reset-password`, {
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

  const backToLogin = (
    <p className="text-center">
      <Link to="/login" className="text-sm font-semibold text-sage-deep hover:text-ink">
        Back to Login
      </Link>
    </p>
  );

  return (
    <>
      {loading && <Loader />}

      <AuthLayout
        title={showResetForm ? "Reset Password" : "Forgot Password"}
        subtitle={showResetForm ? "Enter OTP and new password" : "Enter your email to receive reset code"}
      >
        {!showResetForm ? (
          /* Email Form */
          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <div>
              <label htmlFor="reset-email" className={labelClass}>
                Email
              </label>
              <input
                required
                id="reset-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>

            <button type="submit" disabled={loading} className={`${buttonPrimary} w-full py-3.5`}>
              {loading ? "Sending..." : "Confirm Email"}
            </button>

            {backToLogin}
          </form>
        ) : (
          /* Reset Password Form */
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <p className={labelClass}>Reset Token (6 digits)</p>
              <p className="text-sm text-ink/60">Enter your OTP Code</p>
              <div className="mt-3 flex justify-between gap-2 sm:justify-start">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    aria-label={`Digit ${index + 1}`}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className={`size-12 rounded-xl border text-center text-xl font-bold text-ink transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-sage/60 ${digit ? "border-ink/30 bg-sky-soft" : "border-ink/15 bg-white"}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="reset-email-locked" className={labelClass}>
                Email
              </label>
              <input
                id="reset-email-locked"
                type="email"
                value={email}
                disabled
                className={`${inputClass} cursor-not-allowed bg-sky-soft text-ink/60`}
              />
            </div>

            <div>
              <label htmlFor="new-password" className={labelClass}>
                New Password
              </label>
              <div className="relative">
                <input
                  required
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className={passwordToggleClass}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className={labelClass}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  required
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className={passwordToggleClass}
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className={`${buttonPrimary} w-full py-3.5`}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            {backToLogin}
          </form>
        )}
      </AuthLayout>

      {/* Email Sent Popup Modal */}
      {showPopup && (
        <Dialog title="Password Reset Code Sent" message={popupMessage} actionLabel="OK" onAction={handlePopupOk} />
      )}

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <Dialog
          title="Password Reset Successful"
          message={successMessage}
          actionLabel="Login"
          onAction={() => navigate("/login")}
        />
      )}
    </>
  );
}
