import React, { useState } from 'react';
import { useCache } from '../../hooks/useCache';

const CacheManager = () => {
  const {
    cacheInfo,
    storageEstimate,
    isLoading,
    error,
    supported,
    preloadImages,
    clearCache,
    clearAllCaches,
    updateCache,
    refreshCacheInfo,
    totalCachedItems,
    cacheNames,
    storageUsageFormatted,
    storageQuotaFormatted
  } = useCache();

  const [imageUrls, setImageUrls] = useState('');

  // Example images from your public folder
  const exampleImages = [
    '/home_banner_1.png',
    '/home_banner_2.png',
    '/logo.svg',
    '/bg1.png',
    '/bg2.png'
  ];

  const handlePreloadExamples = () => {
    preloadImages(exampleImages);
  };

  const handlePreloadCustom = () => {
    const urls = imageUrls.split('\n').filter(url => url.trim());
    if (urls.length > 0) {
      preloadImages(urls);
    }
  };

  const handleClearSpecificCache = (cacheName) => {
    clearCache(cacheName);
  };

  if (!supported) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Cache Not Supported
        </h3>
        <p className="text-yellow-700">
          Your browser doesn't support service workers or cache API. 
          The caching functionality will not be available.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Cache Manager</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {/* Cache Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Total Cached Items</h3>
          <p className="text-2xl font-bold text-blue-900">{totalCachedItems}</p>
        </div>
        
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Storage Used</h3>
          <p className="text-2xl font-bold text-green-900">{storageUsageFormatted}</p>
        </div>
        
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800">Storage Quota</h3>
          <p className="text-2xl font-bold text-purple-900">{storageQuotaFormatted}</p>
        </div>
      </div>

      {/* Usage Percentage */}
      {storageEstimate?.percentUsed && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Storage Usage</span>
            <span>{storageEstimate.percentUsed}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${storageEstimate.percentUsed}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Cache Operations */}
      <div className="space-y-6">
        {/* Preload Images Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Preload Images</h3>
          
          <div className="space-y-3">
            <button
              onClick={handlePreloadExamples}
              disabled={isLoading}
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Preload Example Images'}
            </button>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Image URLs (one per line):
              </label>
              <textarea
                value={imageUrls}
                onChange={(e) => setImageUrls(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="/path/to/image1.jpg&#10;/path/to/image2.png&#10;https://example.com/image3.svg"
              />
              <button
                onClick={handlePreloadCustom}
                disabled={isLoading || !imageUrls.trim()}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Preload Custom Images
              </button>
            </div>
          </div>
        </div>

        {/* Cache Management Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Cache Management</h3>
          
          <div className="space-y-3">
            <button
              onClick={refreshCacheInfo}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Refresh Cache Info
            </button>
            
            <button
              onClick={clearAllCaches}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear All Caches
            </button>
          </div>
        </div>

        {/* Individual Cache Management */}
        {cacheNames.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Individual Caches</h3>
            
            <div className="space-y-2">
              {cacheNames.map(cacheName => (
                <div key={cacheName} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{cacheName}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({cacheInfo.caches[cacheName].count} items)
                    </span>
                  </div>
                  <button
                    onClick={() => handleClearSpecificCache(cacheName)}
                    disabled={isLoading}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clear
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CacheManager; 