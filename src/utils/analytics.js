/**
 * Google Analytics utility functions
 * Provides methods to track page views, events, and user interactions
 */

// Get the Google Analytics Measurement ID from environment variables
const GA_MEASUREMENT_ID = "G-EQ9DCHRG5V";

/**
 * Check if Google Analytics is enabled and configured
 */
export const isGAEnabled = () => {
  return typeof window !== 'undefined' && 
         typeof window.gtag !== 'undefined' && 
         GA_MEASUREMENT_ID;
};

/**
 * Initialize Google Analytics
 * This is called automatically when the script loads, but can be used to reinitialize
 */
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname + window.location.search,
    });
  }
};

/**
 * Track a page view
 * @param {string} path - The path of the page (defaults to current path)
 * @param {string} title - Optional page title
 */
export const trackPageView = (path = null, title = null) => {
  if (!isGAEnabled()) return;

  const pagePath = path || window.location.pathname + window.location.search;
  const pageTitle = title || document.title;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * Track a custom event
 * @param {string} eventName - The name of the event
 * @param {object} eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (!isGAEnabled()) return;

  window.gtag('event', eventName, {
    ...eventParams,
  });
};

/**
 * Track button clicks
 * @param {string} buttonName - Name/identifier of the button
 * @param {string} location - Where the button is located (optional)
 */
export const trackButtonClick = (buttonName, location = null) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: location || window.location.pathname,
  });
};

/**
 * Track form submissions
 * @param {string} formName - Name/identifier of the form
 * @param {boolean} success - Whether the form submission was successful
 */
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

/**
 * Track file downloads
 * @param {string} fileName - Name of the file being downloaded
 * @param {string} fileType - Type of the file (pdf, image, etc.)
 */
export const trackDownload = (fileName, fileType = null) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
};

/**
 * Track external link clicks
 * @param {string} url - The external URL being clicked
 * @param {string} linkText - The text of the link (optional)
 */
export const trackExternalLink = (url, linkText = null) => {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText,
  });
};

/**
 * Track search queries
 * @param {string} searchTerm - The search term
 * @param {number} resultsCount - Number of results (optional)
 */
export const trackSearch = (searchTerm, resultsCount = null) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Track user engagement (time on page, scroll depth, etc.)
 * @param {string} engagementType - Type of engagement (scroll, time_on_page, etc.)
 * @param {object} params - Additional parameters
 */
export const trackEngagement = (engagementType, params = {}) => {
  trackEvent('user_engagement', {
    engagement_type: engagementType,
    ...params,
  });
};

/**
 * Set user properties
 * @param {object} properties - User properties to set
 */
export const setUserProperties = (properties) => {
  if (!isGAEnabled()) return;

  window.gtag('set', 'user_properties', properties);
};

/**
 * Track e-commerce events (for purchases, add to cart, etc.)
 * @param {string} eventType - Type of e-commerce event (purchase, add_to_cart, etc.)
 * @param {object} ecommerceData - E-commerce data
 */
export const trackEcommerce = (eventType, ecommerceData) => {
  if (!isGAEnabled()) return;

  window.gtag('event', eventType, {
    ecommerce: ecommerceData,
  });
};

