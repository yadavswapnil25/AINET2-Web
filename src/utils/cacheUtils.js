/**
 * Cache utilities for managing image and resource caching
 */

/**
 * Preload and cache images
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @returns {Promise<void[]>}
 */
export const preloadImages = async (imageUrls) => {
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  });
  
  try {
    await Promise.all(promises);
    console.log('All images preloaded successfully');
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

/**
 * Check if service worker and caching is supported
 * @returns {boolean}
 */
export const isCacheSupported = () => {
  return 'serviceWorker' in navigator && 'caches' in window;
};

/**
 * Get cache information
 * @returns {Promise<Object>}
 */
export const getCacheInfo = async () => {
  if (!isCacheSupported()) {
    return { supported: false };
  }

  try {
    const cacheNames = await caches.keys();
    const cacheInfo = {};
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      cacheInfo[cacheName] = {
        count: keys.length,
        urls: keys.map(request => request.url)
      };
    }
    
    return {
      supported: true,
      caches: cacheInfo,
      totalCaches: cacheNames.length
    };
  } catch (error) {
    console.error('Error getting cache info:', error);
    return { supported: true, error: error.message };
  }
};

/**
 * Clear specific cache
 * @param {string} cacheName - Name of cache to clear
 * @returns {Promise<boolean>}
 */
export const clearCache = async (cacheName) => {
  if (!isCacheSupported()) {
    return false;
  }

  try {
    const deleted = await caches.delete(cacheName);
    console.log(`Cache ${cacheName} ${deleted ? 'cleared' : 'not found'}`);
    return deleted;
  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

/**
 * Clear all caches
 * @returns {Promise<number>}
 */
export const clearAllCaches = async () => {
  if (!isCacheSupported()) {
    return 0;
  }

  try {
    const cacheNames = await caches.keys();
    const deletePromises = cacheNames.map(cacheName => caches.delete(cacheName));
    const results = await Promise.all(deletePromises);
    const deletedCount = results.filter(Boolean).length;
    
    console.log(`Cleared ${deletedCount} out of ${cacheNames.length} caches`);
    return deletedCount;
  } catch (error) {
    console.error('Error clearing all caches:', error);
    return 0;
  }
};

/**
 * Force cache update for specific URL
 * @param {string} url - URL to update in cache
 * @returns {Promise<boolean>}
 */
export const updateCache = async (url) => {
  if (!isCacheSupported()) {
    return false;
  }

  try {
    const response = await fetch(url, { cache: 'reload' });
    if (response.ok) {
      const cache = await caches.open('images-cache');
      await cache.put(url, response.clone());
      console.log(`Cache updated for: ${url}`);
      return true;
    }
  } catch (error) {
    console.error('Error updating cache:', error);
  }
  return false;
};

/**
 * Get cache storage estimate
 * @returns {Promise<Object>}
 */
export const getCacheStorageEstimate = async () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        quota: estimate.quota,
        usage: estimate.usage,
        usageDetails: estimate.usageDetails,
        percentUsed: ((estimate.usage / estimate.quota) * 100).toFixed(2)
      };
    } catch (error) {
      console.error('Error getting storage estimate:', error);
    }
  }
  return { supported: false };
}; 