import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Minimize, X, SkipForward, Info, Settings } from 'lucide-react';
import { VideoItem } from '../constants';

interface NetflixPlayerProps {
    video: VideoItem;
    onClose: () => void;
    onNext?: () => void;
}

export const NetflixPlayer: React.FC<NetflixPlayerProps> = ({
    video,
    onClose,
    onNext
}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const controlsTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleMouseMove = () => {
            setShowControls(true);
            if (controlsTimer.current) clearTimeout(controlsTimer.current);
            controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        handleMouseMove();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (controlsTimer.current) clearTimeout(controlsTimer.current);
        };
    }, []);

    // Progress bar simulation
    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setProgress(prev => (prev >= 100 ? 0 : prev + 0.1));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden cursor-none"
            style={{ cursor: showControls ? 'default' : 'none' }}
        >
            {/* The actual video iframe */}
            <iframe
                src={`${video.embedUrl}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
                className="w-full h-full pointer-events-none scale-[1.35]"
                allow="autoplay; encrypted-media"
            />

            {/* Clickable Overlay to toggle play/pause */}
            <div 
                className="absolute inset-0 z-10" 
                onClick={() => setIsPlaying(!isPlaying)}
            />

            {/* Controls Overlay */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between"
                    >
                        {/* Top Bar */}
                        <div className="p-8 flex items-center gap-4">
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={32} className="text-white" />
                            </button>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white">{video.title}</h2>
                                <p className="text-sm text-white/60">{video.artist}</p>
                            </div>
                        </div>

                        {/* Bottom Controls */}
                        <div className="p-8 space-y-6">
                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-white/20 rounded-full relative group cursor-pointer">
                                <div 
                                    className="absolute left-0 top-0 h-full bg-[var(--accent)] rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                                <div 
                                    className="absolute h-4 w-4 bg-[var(--accent)] rounded-full -top-1.5 -ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ left: `${progress}%` }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <button 
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="text-white hover:scale-110 transition-transform"
                                    >
                                        {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
                                    </button>
                                    
                                    <button className="text-white hover:scale-110 transition-transform">
                                        <RotateCcw size={28} />
                                    </button>

                                    <button 
                                        onClick={onNext}
                                        className="text-white hover:scale-110 transition-transform"
                                    >
                                        <SkipForward size={28} fill="white" />
                                    </button>

                                    <div className="flex items-center gap-4 group/vol">
                                        <button 
                                            onClick={() => setIsMuted(!isMuted)}
                                            className="text-white"
                                        >
                                            {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
                                        </button>
                                        <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                                            <div className="h-1 w-24 bg-white/20 rounded-full relative">
                                                <div className="absolute left-0 top-0 h-full bg-white rounded-full w-2/3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <button className="text-white flex items-center gap-2">
                                        <Settings size={24} />
                                        <span className="text-sm font-medium">Auto (1080p)</span>
                                    </button>
                                    <button className="text-white">
                                        <Maximize size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Play/Pause Large Icon Overlay */}
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute z-30 pointer-events-none"
                    >
                        <div className="w-32 h-32 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <Play size={64} fill="white" className="text-white ml-2" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
