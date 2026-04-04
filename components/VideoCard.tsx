import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Check, Volume2, VolumeX, Info } from 'lucide-react';
import { VideoItem } from '../constants';
import { useExperience } from './ExperienceProvider';

interface VideoCardProps {
    video: VideoItem;
    onSelect: (video: VideoItem) => void;
    isMuted: boolean;
    onToggleMute: () => void;
    inList?: boolean;
    onToggleList?: (video: VideoItem) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
    video,
    onSelect,
    isMuted,
    onToggleMute,
    inList,
    onToggleList
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const hoverTimer = useRef<NodeJS.Timeout | null>(null);
    const leaveTimer = useRef<NodeJS.Timeout | null>(null);

    const handleHoverStart = useCallback(() => {
        // Cancel any pending leave
        if (leaveTimer.current) {
            clearTimeout(leaveTimer.current);
            leaveTimer.current = null;
        }
        setIsHovered(true);
    }, []);

    const handleHoverEnd = useCallback(() => {
        // Debounce the hover-end to prevent flicker when mouse 
        // moves between the base card and the scaled overlay
        leaveTimer.current = setTimeout(() => {
            setIsHovered(false);
        }, 150);
    }, []);

    useEffect(() => {
        if (isHovered) {
            hoverTimer.current = setTimeout(() => {
                setShowPreview(true);
            }, 800);
        } else {
            if (hoverTimer.current) clearTimeout(hoverTimer.current);
            setShowPreview(false);
        }
        return () => {
            if (hoverTimer.current) clearTimeout(hoverTimer.current);
        };
    }, [isHovered]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (leaveTimer.current) clearTimeout(leaveTimer.current);
            if (hoverTimer.current) clearTimeout(hoverTimer.current);
        };
    }, []);

    return (
        <motion.div
            className="relative flex-none w-[200px] md:w-[300px] aspect-video rounded-md cursor-pointer group"
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            onClick={() => onSelect(video)}
            layout
        >
            {/* Base Thumbnail */}
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover rounded-md transition-opacity duration-300 group-hover:opacity-0"
            />

            {/* Quick info on base card (visible without full hover expand) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute bottom-2 left-3 right-3">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{video.title}</h4>
                    <p className="text-[10px] text-white/60">{video.artist}</p>
                </div>
            </div>

            {/* Hover Preview Overlay */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1.05 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute inset-0 bg-[#141414] rounded-md shadow-2xl overflow-hidden"
                        style={{ originY: 0.5, zIndex: 50 }}
                        onMouseEnter={handleHoverStart}
                        onMouseLeave={handleHoverEnd}
                    >
                        {/* Preview Video / Thumbnail */}
                        <div className="relative aspect-video w-full bg-black" onClick={() => onSelect(video)}>
                            {showPreview ? (
                                <iframe
                                    src={`${video.embedUrl}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&loop=1&playlist=${video.embedUrl.split('/').pop()}`}
                                    className="w-full h-full pointer-events-none"
                                    allow="autoplay"
                                    title={`Preview: ${video.title}`}
                                />
                            ) : (
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            
                            <div className="absolute bottom-2 right-2 flex gap-2">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleMute();
                                    }}
                                    className="p-1.5 rounded-full bg-black/50 border border-white/20 hover:bg-black/70 transition-colors"
                                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(video);
                                    }}
                                    className="p-2 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
                                >
                                    <Play size={16} fill="black" />
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleList?.(video);
                                    }}
                                    className="p-2 rounded-full border border-white/40 hover:border-white transition-colors"
                                    aria-label={inList ? 'Remove from list' : 'Add to list'}
                                >
                                    {inList ? <Check size={16} /> : <Plus size={16} />}
                                </button>
                                <div className="flex-1" />
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(video);
                                    }}
                                    className="p-2 rounded-full border border-white/40 hover:border-white transition-colors"
                                    aria-label={`More info: ${video.title}`}
                                >
                                    <Info size={16} />
                                </button>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-white line-clamp-1">{video.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] border border-white/40 px-1 rounded uppercase tracking-tighter text-white/60">4K</span>
                                    <span className="text-[10px] font-bold text-green-500">98% Match</span>
                                    <span className="text-[10px] text-white/60">{video.duration}</span>
                                </div>
                                <p className="text-[10px] text-white/60 mt-1 line-clamp-1">{video.artist}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
