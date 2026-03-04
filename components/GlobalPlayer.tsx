import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from './ExperienceProvider';
import { Play, Pause, ExternalLink, X, VolumeX, Video, Music, Repeat } from 'lucide-react';
import { VIDEOS } from '../constants';

interface GlobalPlayerProps {
    forceMinimize?: boolean;
}

export const GlobalPlayer: React.FC<GlobalPlayerProps> = ({ forceMinimize = false }) => {
  const { hasEntered } = useExperience();
  const [showPlayer, setShowPlayer] = useState(false);
  const [mediaType, setMediaType] = useState<'spotify' | 'youtube'>('spotify');

  // Auto-minimize or pause when forced (e.g. entering Playroom)
  useEffect(() => {
      if (forceMinimize) {
          setShowPlayer(false);
      }
  }, [forceMinimize]);

  // Specific LVRN Broadcast Link requested by user
  const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/track/1F6HMPZd1izYjwGoFsh7Ny?utm_source=generator&theme=0";
  const FEATURED_VIDEO = VIDEOS[0]; // Latest video

  if (!hasEntered) return null;

  // Don't render at all if we are in Playroom mode to prevent audio overlap risk
  if (forceMinimize) return null;

  const toggleMediaType = (e: React.MouseEvent) => {
      e.stopPropagation();
      setMediaType(prev => prev === 'spotify' ? 'youtube' : 'spotify');
  };

  return (
    <motion.div 
        className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col items-start gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
    >
        <AnimatePresence>
            {showPlayer && (
                <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="w-[320px] bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 origin-bottom-left"
                >
                    <div className="flex justify-between items-center p-3 bg-white/5 border-b border-white/5">
                         <div className="flex items-center gap-2">
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">
                                 {mediaType === 'spotify' ? 'LVRN Radio' : 'Latest Visual'}
                             </span>
                             <button 
                                onClick={toggleMediaType}
                                className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                                title="Switch Source"
                             >
                                 <Repeat size={10} />
                             </button>
                         </div>
                         <button onClick={() => setShowPlayer(false)} className="p-1 hover:text-white text-gray-500 transition-colors">
                            <X size={14} />
                         </button>
                    </div>
                    
                    {mediaType === 'spotify' ? (
                        <iframe 
                            style={{ borderRadius: '0 0 12px 12px' }} 
                            src={SPOTIFY_EMBED_URL} 
                            width="100%" 
                            height="152" 
                            frameBorder="0" 
                            allowFullScreen 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy"
                        />
                    ) : (
                        <div className="relative aspect-video bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`${FEATURED_VIDEO.embedUrl}?autoplay=0&controls=1&modestbranding=1`}
                                title={FEATURED_VIDEO.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-b-xl"
                            />
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>

        <motion.div 
          className={`bg-black/60 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden shadow-2xl cursor-pointer hover:bg-black/80 transition-colors pr-6`}
          onClick={() => setShowPlayer(!showPlayer)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
            <div className="flex items-center gap-4 p-3">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${showPlayer ? 'bg-[var(--accent)] text-white' : 'bg-white/10 text-white'}`}>
                    {showPlayer ? (
                        mediaType === 'spotify' ? <Music size={16} /> : <Video size={16} />
                    ) : (
                        <Play size={16} fill="currentColor" className="ml-1" />
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${showPlayer ? 'bg-[var(--accent)] animate-pulse' : 'bg-gray-500'}`} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                            {showPlayer ? 'Now Playing' : 'Media Player'}
                        </span>
                    </div>
                    <span className="text-sm font-bold text-white tracking-wide truncate max-w-[150px]">
                        {mediaType === 'spotify' ? 'Broadcast Signal' : FEATURED_VIDEO.title}
                    </span>
                </div>
            </div>
        </motion.div>
    </motion.div>
  );
};