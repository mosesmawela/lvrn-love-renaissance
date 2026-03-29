import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, AlertCircle, Loader2 } from 'lucide-react';

interface MediaPlayerProps {
  url: string;
  type: 'spotify' | 'vimeo';
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  title?: string;
}

// Loading skeleton component
const VideoSkeleton = memo(() => (
  <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center rounded-2xl">
    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
  </div>
));
VideoSkeleton.displayName = 'VideoSkeleton';

// Error fallback component
const ErrorFallback = memo(({ onRetry }: { onRetry: () => void }) => (
  <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center rounded-2xl p-6 text-center">
    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <p className="text-white mb-4">Failed to load media</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
    >
      Retry
    </button>
  </div>
));
ErrorFallback.displayName = 'ErrorFallback';

export const MediaPlayer: React.FC<MediaPlayerProps> = memo(({
  url,
  type,
  onPlay,
  onPause,
  onTimeUpdate,
  title = 'LVRN Media'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    onPlay?.();

    if (type === 'vimeo') {
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.1;
          onTimeUpdate?.(newProgress * 100, 100);
          return newProgress >= 100 ? 0 : newProgress;
        });
      }, 100);
    }
  }, [type, onPlay, onTimeUpdate]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    onPause?.();
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  }, [onPause]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (iframeRef.current && type === 'vimeo') {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ method: 'setVolume', value: newMuted ? 0 : 1 }),
          '*'
        );
      }
      return newMuted;
    });
  }, [type]);

  const toggleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          console.error('Fullscreen error:', err);
        });
      } else {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  }, []);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleIframeError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          isPlaying ? handlePause() : handlePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, handlePlay, handlePause, toggleMute, toggleFullscreen]);

  if (type === 'vimeo') {
    return (
      <div className="relative w-full" ref={containerRef}>
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
          {/* Loading Skeleton */}
          {isLoading && <VideoSkeleton />}

          {/* Error Fallback */}
          {hasError && <ErrorFallback onRetry={handleRetry} />}

          <iframe
            ref={iframeRef}
            src={`${url}?autoplay=1&loop=0&muted=${isMuted ? 1 : 0}&controls=0&title=0&byline=0&portrait=0`}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`}
            style={{ border: 'none' }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            aria-label={`Video player: ${title}`}
          />

          {/* Custom Controls Overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity"
            role="toolbar"
            aria-label="Video controls"
          >
            {/* Progress Bar */}
            <div
              className="w-full h-1 bg-white/20 rounded-full mb-3 overflow-hidden"
              role="progressbar"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Video progress"
            >
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center transition-colors"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  aria-pressed={isPlaying}
                  title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" aria-hidden="true" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" aria-hidden="true" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  aria-pressed={isMuted}
                  title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" aria-hidden="true" />
                  )}
                </button>
              </div>

              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center transition-colors"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                title="Fullscreen (F)"
              >
                <Maximize2 className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Exclusive Badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Exclusive</span>
          </div>
        </div>

        {/* Audio Visualization Indicator */}
        <div
          className="flex items-center justify-center gap-1 mt-4"
          role="img"
          aria-label={isPlaying ? 'Audio visualizer active' : 'Audio visualizer paused'}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-orange-500 to-red-500 rounded-full transition-all duration-100 will-change-height"
              style={{
                height: isPlaying ? `${Math.random() * 24 + 8}px` : '4px',
                opacity: isPlaying ? 1 : 0.3,
                animationDelay: `${i * 50}ms`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Spotify embed (default)
  return (
    <div className="relative">
      {isLoading && <VideoSkeleton />}
      {hasError && <ErrorFallback onRetry={handleRetry} />}
      <iframe
        src={`${url}${url.includes('?') ? '&' : '?'}autoplay=1`}
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className={`rounded-2xl transition-opacity duration-300 ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`}
        title={`Spotify: ${title}`}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        aria-label={`Spotify embed: ${title}`}
      />
    </div>
  );
});

MediaPlayer.displayName = 'MediaPlayer';
