import React, { useState, useEffect, useRef } from 'react';
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

    return (
        <motion.div
            className="relative flex-none w-[200px] md:w-[300px] aspect-video rounded-md cursor-pointer group"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            layout
        >
            {/* Base Thumbnail */}
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover rounded-md transition-opacity duration-300 group-hover:opacity-0"
            />

            {/* Hover Preview Overlay */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, zIndex: 50 }}
                        animate={{ opacity: 1, scale: 1.1, zIndex: 50 }}
                        exit={{ opacity: 0, scale: 0.9, zIndex: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 bg-[#141414] rounded-md shadow-2xl overflow-hidden pointer-events-auto"
                        style={{ originY: 0.5 }}
                    >
                        {/* Preview Video / GIF Placeholder */}
                        <div className="relative aspect-video w-full bg-black">
                            {showPreview ? (
                                <iframe
                                    src={`${video.embedUrl}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&loop=1&playlist=${video.embedUrl.split('/').pop()}`}
                                    className="w-full h-full pointer-events-none"
                                    allow="autoplay"
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
                                >
                                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => onSelect(video)}
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
                                >
                                    {inList ? <Check size={16} /> : <Plus size={16} />}
                                </button>
                                <div className="flex-1" />
                                <button className="p-2 rounded-full border border-white/40 hover:border-white transition-colors">
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
