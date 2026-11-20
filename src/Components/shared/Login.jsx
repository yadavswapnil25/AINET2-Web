import React, { useState, useEffect } from "react";
import { baseUrl } from "../../utils/constant";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import AuthLayout from "./AuthLayout";
import { buttonPrimary, inputClass, labelClass } from "./sectionStyles";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const REMEMBER_EMAIL_KEY = "rememberedEmail";
const REMEMBER_EMAIL_EXPIRY_KEY = "rememberedEmailExpiry";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const autoLoginToken = urlParams.get('token');
    const autoLogin = urlParams.get('autoLogin') === 'true';

    // Handle auto-login from admin portal
    if (autoLoginToken && autoLogin) {
      setLoading(true);
      try {
        // Store the token
        localStorage.setItem("ainetToken", autoLoginToken);

        // Trigger a custom event to notify AuthContext about the token change
        window.dispatchEvent(new CustomEvent("authTokenChanged", { detail: { token: autoLoginToken } }));

        toast.success("Login successful!");

        // Remove token from URL for security
        window.history.replaceState({}, document.title, window.location.pathname);

        // Navigate to profile
        navigate("/profile");
        return;
      } catch (error) {
        console.error("Auto-login error:", error);
        toast.error("Auto-login failed. Please try logging in manually.");
        setLoading(false);
        // Remove token from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    const token = localStorage.getItem("ainetToken");
    // Check if we're not already on the login page due to a redirect
    const isRedirected = urlParams.get('from') === 'profile';

    if (token && !isRedirected) {
      // Set loading state to true to show loading indicator
      setLoading(true);
      // Navigate immediately to prevent seeing the login page
      navigate("/profile");
    }

    // Check if user was redirected due to token expiration
    const expired = urlParams.get('expired');
    if (expired === 'true') {
      toast.error("Your session has expired. Please log in again.");
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

    if (!email || !password) {
      setError("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseUrl}/client/auth/login`, {
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
        localStorage.setItem("ainetToken", token);

        // Trigger a custom event to notify AuthContext about the token change
        window.dispatchEvent(new CustomEvent("authTokenChanged", { detail: { token } }));

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
    <>
      {loading && <Loader />}
      <AuthLayout title="Journey Begins" subtitle="Log in with your email">
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="login-email" className={labelClass}>
              Email
            </label>
            <input
              required
              id="login-email"
              type="text"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="login-password" className={labelClass}>
              Password
            </label>
            <div className="relative">
              <input
                required
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink/50 transition-colors hover:text-ink focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm text-ink/80">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-4 rounded accent-ink"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm font-semibold text-sage-deep hover:text-ink">
              Forgot password?
            </Link>
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-100">
              {error}
            </p>
          )}

          <button disabled={loading} className={`${buttonPrimary} w-full py-3.5`}>
            {loading ? "Logging in..." : "LOG IN"}
          </button>

          <p className="text-center text-sm text-ink/60">
            Not a member yet?{" "}
            <Link to="/#membershipplan" className="font-semibold text-sage-deep hover:text-ink">
              Join AINET
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
}
