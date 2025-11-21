import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import { initGA } from "./utils/analytics.js";

// Initialize Google Analytics
const GA_MEASUREMENT_ID = "G-0D9M13RY6R";

if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-0D9M13RY6R`;
  document.head.appendChild(script);

  // Initialize GA after script loads
  script.onload = () => {
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname + window.location.search,
    });
    initGA();
    console.log('✅ Google Analytics initialized:', GA_MEASUREMENT_ID);
  };

  script.onerror = () => {
    console.error('❌ Failed to load Google Analytics script');
  };
} 

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show notification
              // You can show a toast notification here if needed
            }
          });
        });
      })
      .catch((registrationError) => {
      });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
