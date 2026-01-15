import React, { useEffect, useRef } from 'react';

/**
 * LiveStream Component
 * Displays live streaming content based on stream type
 * Supports: YouTube, Facebook, Zoom, Custom embed code, and direct URLs
 */
const LiveStream = ({ 
  streamType, 
  streamUrl, 
  embedCode, 
  streamId,
  isLive = false,
  className = '' 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Clean up any existing iframes when component unmounts or props change
    return () => {
      if (containerRef.current) {
        const iframes = containerRef.current.querySelectorAll('iframe');
        iframes.forEach(iframe => {
          iframe.src = '';
        });
      }
    };
  }, [streamType, streamUrl, embedCode, streamId]);

  if (!isLive || !streamType) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg p-8 ${className}`}>
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-2">🔴</div>
          <p className="text-gray-600">Live stream will appear here when the webinar starts</p>
        </div>
      </div>
    );
  }

  const renderStream = () => {
    switch (streamType) {
      case 'youtube':
        if (streamUrl || streamId) {
          // Extract video ID from URL or use provided streamId
          let videoId = streamId;
          if (streamUrl) {
            // Try to extract video ID from various YouTube URL formats
            const patterns = [
              /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
              /youtube\.com\/live\/([^"&?\/\s]+)/,
              /youtube\.com\/watch\?v=([^"&?\/\s]+)/
            ];
            
            for (const pattern of patterns) {
              const match = streamUrl.match(pattern);
              if (match) {
                videoId = match[1];
                break;
              }
            }
          }
          
          if (videoId) {
            return (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
                  title="YouTube Live Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          }
        }
        break;

      case 'facebook':
        if (streamUrl || streamId) {
          // Facebook Live embed - use the stream URL directly
          const embedUrl = streamUrl 
            ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(streamUrl)}&show_text=false&width=734&height=413`
            : (streamId ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/watch/?v=${streamId}`)}&show_text=false&width=734&height=413` : null);
          
          if (embedUrl) {
            return (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={embedUrl}
                  title="Facebook Live Stream"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  scrolling="no"
                />
              </div>
            );
          }
        }
        break;

      case 'zoom':
        if (embedCode) {
          // Use custom embed code for Zoom
          return (
            <div 
              className="w-full"
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />
          );
        } else if (streamUrl) {
          // Fallback to iframe with Zoom URL
          return (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={streamUrl}
                title="Zoom Webinar"
                frameBorder="0"
                allow="camera; microphone; fullscreen"
                allowFullScreen
              />
            </div>
          );
        }
        break;

      case 'embed':
        if (embedCode) {
          // Custom embed code (for any platform)
          return (
            <div 
              className="w-full"
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />
          );
        }
        break;

      case 'custom':
        if (streamUrl) {
          // Custom stream URL (HLS, RTMP, etc.)
          return (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <video
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                controls
                autoPlay
                playsInline
                src={streamUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          );
        }
        break;

      default:
        return (
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
            <p className="text-gray-600">Unsupported stream type: {streamType}</p>
          </div>
        );
    }

    // Fallback if no valid stream configuration
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
        <p className="text-gray-600">Stream configuration incomplete. Please check stream settings.</p>
      </div>
    );
  };

  const extractFacebookVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:facebook\.com\/watch\/\?v=|facebook\.com\/.*\/videos\/)(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-red-600 font-semibold">LIVE</span>
        </span>
      </div>
      {renderStream()}
    </div>
  );
};

export default LiveStream;

