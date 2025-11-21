import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/**
 * Component to track page views in Google Analytics when route changes
 * This should be placed inside the Router component
 */
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;

