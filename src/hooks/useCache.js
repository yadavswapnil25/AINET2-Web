import { useState, useEffect, useCallback } from 'react';
import { 
  preloadImages, 
  getCacheInfo, 
  clearCache, 
  clearAllCaches,
  updateCache,
  getCacheStorageEstimate,
  isCacheSupported 
} from '../utils/cacheUtils';

/**
 * Custom hook for cache management
 * @returns {Object} Cache management functions and state
 */
export const useCache = () => {
  const [cacheInfo, setCacheInfo] = useState(null);
  const [storageEstimate, setStorageEstimate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if caching is supported
  const supported = isCacheSupported();

  // Refresh cache information
  const refreshCacheInfo = useCallback(async () => {
    if (!supported) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const [info, estimate] = await Promise.all([
        getCacheInfo(),
        getCacheStorageEstimate()
      ]);
      
      setCacheInfo(info);
      setStorageEstimate(estimate);
    } catch (err) {
      setError(err.message);
      console.error('Error refreshing cache info:', err);
    } finally {
      setIsLoading(false);
    }
  }, [supported]);

  // Preload images with loading state
  const preloadImagesWithState = useCallback(async (imageUrls) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await preloadImages(imageUrls);
      await refreshCacheInfo(); // Refresh info after preloading
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [refreshCacheInfo]);

  // Clear cache with state management
  const clearCacheWithState = useCallback(async (cacheName) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await clearCache(cacheName);
      await refreshCacheInfo(); // Refresh info after clearing
      return result;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [refreshCacheInfo]);

  // Clear all caches with state management
  const clearAllCachesWithState = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await clearAllCaches();
      await refreshCacheInfo(); // Refresh info after clearing
      return result;
    } catch (err) {
      setError(err.message);
      return 0;
    } finally {
      setIsLoading(false);
    }
  }, [refreshCacheInfo]);

  // Update cache with state management
  const updateCacheWithState = useCallback(async (url) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await updateCache(url);
      await refreshCacheInfo(); // Refresh info after updating
      return result;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [refreshCacheInfo]);

  // Load cache info on mount
  useEffect(() => {
    if (supported) {
      refreshCacheInfo();
    }
  }, [supported, refreshCacheInfo]);

  return {
    // State
    cacheInfo,
    storageEstimate,
    isLoading,
    error,
    supported,
    
    // Functions
    preloadImages: preloadImagesWithState,
    clearCache: clearCacheWithState,
    clearAllCaches: clearAllCachesWithState,
    updateCache: updateCacheWithState,
    refreshCacheInfo,
    
    // Computed values
    get totalCachedItems() {
      if (!cacheInfo?.caches) return 0;
      return Object.values(cacheInfo.caches).reduce((total, cache) => total + cache.count, 0);
    },
    
    get cacheNames() {
      return cacheInfo?.caches ? Object.keys(cacheInfo.caches) : [];
    },
    
    get storageUsageFormatted() {
      if (!storageEstimate?.usage) return 'Unknown';
      const mb = (storageEstimate.usage / (1024 * 1024)).toFixed(2);
      return `${mb} MB`;
    },
    
    get storageQuotaFormatted() {
      if (!storageEstimate?.quota) return 'Unknown';
      const gb = (storageEstimate.quota / (1024 * 1024 * 1024)).toFixed(2);
      return `${gb} GB`;
    }
  };
}; 