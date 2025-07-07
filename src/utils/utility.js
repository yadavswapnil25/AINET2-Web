import { razorpayKey } from "./constant";

export const initiatePayment = async ({ amount, name, email, contact, currency }) => {
    return new Promise(async (resolve, reject) => {
        const loadScript = () =>
            new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });

        const isLoaded = await loadScript();
        if (!isLoaded) return reject("Razorpay SDK failed to load.");

        const options = {
            key: razorpayKey, // use live key in prod
            amount: amount * 100, // Razorpay works in paise
            currency: currency || "INR",
            name: "AINET",
            description: "Membership Payment",
            handler: function (response) {
                // ✅ Called only on payment success
                resolve(response); // move ahead
            },
            prefill: {
                name,
                email,
                contact,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);

        // ❌ Called on user cancel, failure, or error
        paymentObject.on("payment.failed", function (response) {
            reject(response.error.description || "Payment failed or was cancelled.");
        });

        paymentObject.open();
    });
};

// Token validation utilities

/**
 * Check if a JWT token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - true if token is expired or invalid
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token has expiration time
    if (!payload.exp) return true;
    
    // Convert exp from seconds to milliseconds and compare with current time
    const currentTime = Date.now();
    const expirationTime = payload.exp * 1000;

    console.log(currentTime, expirationTime);
    
    return currentTime >= expirationTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Treat invalid tokens as expired
  }
};

/**
 * Get valid token from localStorage or return null if expired
 * @returns {string|null} - Valid token or null
 */
export const getValidToken = () => {
  const token = localStorage.getItem('ainetToken');
  
  if (!token || isTokenExpired(token)) {
    // Clean up expired token
    localStorage.removeItem('ainetToken');
    return null;
  }
  
  return token;
};

/**
 * Handle API response errors, especially authentication errors
 * @param {Response} response - Fetch response object
 * @param {Function} onTokenExpired - Callback for token expiration
 */
export const handleApiResponse = async (response, onTokenExpired) => {
  if (response.status === 401 || response.status === 403) {
    // Token is invalid/expired on server side
    localStorage.removeItem('ainetToken');
    if (onTokenExpired) {
      onTokenExpired();
    }
    return null;
  }
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response;
};

/**
 * Create an authenticated fetch wrapper
 * @param {string} url - API endpoint
 * @param {object} options - Fetch options
 * @param {Function} onTokenExpired - Callback for token expiration
 */
export const authenticatedFetch = async (url, options = {}, onTokenExpired) => {
  const token = getValidToken();
  
  if (!token) {
    if (onTokenExpired) {
      onTokenExpired();
    }
    return null;
  }
  
  const authHeaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  const response = await fetch(url, {
    ...options,
    headers: authHeaders
  });
  
  return handleApiResponse(response, onTokenExpired);
};
