import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Artist } from '../types';

interface Artist3DCarouselProps {
    artists: Artist[];
    onSelect: (artist: Artist) => void;
}

// Helper for fallback gradients
const getGradient = (name: string) => {
    const gradients = [
        'from-orange-900 to-black',
        'from-blue-900 to-black',
        'from-orange-900 to-black',
        'from-emerald-900 to-black',
        'from-amber-900 to-black'
    ];
    const index = name.length % gradients.length;
    return gradients[index];
};

export const Artist3DCarousel: React.FC<Artist3DCarouselProps> = ({ artists, onSelect }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [bgColor, setBgColor] = useState('rgba(0,0,0,1)');

    // Extract color from image
    useEffect(() => {
        const artist = artists[activeIndex];
        if (!artist) return;

        const imagePath = artist.image || `assets/images/${artist.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
        
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imagePath;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            try {
                // Get average color from a small sample in the center
                const data = ctx.getImageData(img.width / 4, img.height / 4, img.width / 2, img.height / 2).data;
                let r = 0, g = 0, b = 0;
                const count = data.length / 4;

                for (let i = 0; i < data.length; i += 4 * 10) { // Sample every 10th pixel for performance
                    r += data[i];
                    g += data[i+1];
                    b += data[i+2];
                }

                const avgR = Math.floor((r / (count / 10)) * 0.6); // Darken for background
                const avgG = Math.floor((g / (count / 10)) * 0.6);
                const avgB = Math.floor((b / (count / 10)) * 0.6);

                setBgColor(`rgba(${avgR}, ${avgG}, ${avgB}, 0.4)`);
            } catch (e) {
                // Fallback if getImageData fails (CORS)
                setBgColor('rgba(20, 20, 20, 0.4)');
            }
        };

        img.onerror = () => setBgColor('rgba(0,0,0,0.4)');
    }, [activeIndex, artists]);

    // Reset index if artists array changes significantly
    useEffect(() => {
        setActiveIndex(0);
    }, [artists]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1 < artists.length ? prev + 1 : 0));
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : artists.length - 1));
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Enter') {
                if (artists[activeIndex]) onSelect(artists[activeIndex]);
            }
        };
        // Only attach if element is in DOM (component mounted)
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, artists, onSelect]);

    // Swipe Handlers
    const touchStart = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => touchStart.current = e.touches[0].clientX;
    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (diff > 50) handleNext();
        if (diff < -50) handlePrev();
    };

    const getCardStyle = (index: number) => {
        const offset = index - activeIndex;
        const isActive = offset === 0;

        const xOffset = offset * 260; // Spacing
        const scale = isActive ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15);
        const rotateY = isActive ? 0 : offset * -25;
        const zIndex = 100 - Math.abs(offset);
        const opacity = isActive ? 1 : Math.max(0.2, 1 - Math.abs(offset) * 0.3);
        const blur = isActive ? 0 : Math.abs(offset) * 4;

        return {
            zIndex,
            opacity,
            scale,
            x: xOffset,
            rotateY,
            filter: `blur(${blur}px)`,
            pointerEvents: isActive ? 'auto' : 'none'
        };
    };

    if (artists.length === 0) return null;

    return (
        <div className="relative group/carousel">
            {/* Dynamic Background Gradient */}
            <motion.div 
                className="absolute inset-0 pointer-events-none z-0"
                animate={{ 
                    background: `radial-gradient(circle at center, ${bgColor} 0%, rgba(0,0,0,0) 70%)`
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <div
                ref={containerRef}
                className="h-[600px] w-full relative flex items-center justify-center overflow-hidden perspective-[1000px] z-10"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                    <AnimatePresence initial={false}>
                        {artists.map((artist, index) => {
                            // Optimization: Render only neighbors
                            if (Math.abs(index - activeIndex) > 3) return null;

                            const style = getCardStyle(index);
                            const imagePath = artist.image || `assets/images/${artist.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;

                            return (
                                <motion.div
                                    key={artist.name}
                                    className="absolute top-1/2 left-1/2 w-[300px] md:w-[400px] h-[500px] -ml-[150px] md:-ml-[200px] -mt-[250px] cursor-pointer"
                                    initial={false}
                                    animate={{
                                        x: style.x,
                                        scale: style.scale,
                                        opacity: style.opacity,
                                        zIndex: style.zIndex,
                                        rotateY: style.rotateY,
                                        filter: style.filter
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    onClick={() => index === activeIndex ? onSelect(artist) : setActiveIndex(index)}
                                >
                                    <GlassCard className="w-full h-full p-0 overflow-hidden relative group border-[var(--card-border)] bg-black" hoverEffect={index === activeIndex}>
                                        <img
                                            src={imagePath}
                                            alt={artist.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', getGradient(artist.name).split(' ')[0], 'to-black');
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                        <div className="absolute bottom-0 left-0 w-full p-8 text-left">
                                            <div className="overflow-hidden">
                                                <motion.h3
                                                    className="text-4xl font-black text-white mb-2 leading-none drop-shadow-lg"
                                                    layoutId={`title-${artist.name}`}
                                                >
                                                    {artist.name}
                                                </motion.h3>
                                            </div>
                                            <p className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-4">{artist.role}</p>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-6 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                                            >
                                                View Profile <Maximize2 size={12} />
                                            </motion.button>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {artists.length > 1 && (
                    <>
                        <button onClick={handlePrev} className="absolute left-4 md:left-10 z-50 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={handleNext} className="absolute right-4 md:right-10 z-50 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}
            </div>

            {/* Scrubber */}
            <div className="flex justify-center items-center gap-2 mt-4 px-6 overflow-x-auto pb-4 custom-scrollbar relative z-10">
                {artists.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-12 bg-[var(--accent)]' : 'w-2 bg-[var(--text-color)]/20 hover:bg-[var(--text-color)]/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};