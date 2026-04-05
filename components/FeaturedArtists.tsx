import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Maximize2, Play, Users, Music,
    TrendingUp, Star, Sparkles, ArrowRight, X, Search, Filter
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Artist } from '../types';

interface FeaturedArtistsProps {
    artists: Artist[];
    onSelect: (artist: Artist) => void;
}

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

const ARTIST_STATS: Record<string, { streams: string; followers: string; growth: string; category: string }> = {
    'Summer Walker': { streams: '13.1B', followers: '27M', growth: '+12%', category: 'R&B' },
    '6LACK': { streams: '8.5B', followers: '15M', growth: '+8%', category: 'Hip-Hop' },
    'Odeal': { streams: '616M', followers: '1.37M', growth: '+24%', category: 'Alt-R&B' },
    'Al Xapo': { streams: '150M', followers: '890K', growth: '+45%', category: 'Amapiano' },
    'Ciza': { streams: '200M', followers: '1.2M', growth: '+38%', category: 'Afrohouse' },
    'Nektunez': { streams: '320M', followers: '2.1M', growth: '+15%', category: 'Afrobeats' },
    'Sadboi': { streams: '95M', followers: '650K', growth: '+22%', category: 'Dancehall' },
};

export const FeaturedArtists: React.FC<FeaturedArtistsProps> = ({ artists, onSelect }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [bgColor, setBgColor] = useState('rgba(0,0,0,1)');
    const [showPicker, setShowPicker] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [likedArtists, setLikedArtists] = useState<Set<string>>(() => {
        try {
            const stored = localStorage.getItem('lvrn_liked_artists');
            return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch {
            return new Set();
        }
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef<number>(Date.now());

    const AUTO_ROTATE_INTERVAL = 6000;

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
                const data = ctx.getImageData(img.width / 4, img.height / 4, img.width / 2, img.height / 2).data;
                let r = 0, g = 0, b = 0;
                const count = data.length / 4;

                for (let i = 0; i < data.length; i += 4 * 10) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                }

                const avgR = Math.floor((r / (count / 10)) * 0.6);
                const avgG = Math.floor((g / (count / 10)) * 0.6);
                const avgB = Math.floor((b / (count / 10)) * 0.6);

                setBgColor(`rgba(${avgR}, ${avgG}, ${avgB}, 0.4)`);
            } catch {
                setBgColor('rgba(20, 20, 20, 0.4)');
            }
        };

        img.onerror = () => setBgColor('rgba(0,0,0,0.4)');
    }, [activeIndex, artists]);

    useEffect(() => {
        setActiveIndex(0);
    }, [artists]);

    // Auto-rotation
    useEffect(() => {
        if (!isAutoPlaying || isHovered || showPicker) return;

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min((elapsed / AUTO_ROTATE_INTERVAL) * 100, 100);
            setProgress(newProgress);

            if (elapsed >= AUTO_ROTATE_INTERVAL) {
                handleNext();
            }
        }, 50);

        return () => clearInterval(interval);
    }, [isAutoPlaying, isHovered, showPicker, activeIndex, artists.length]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Enter' && artists[activeIndex]) onSelect(artists[activeIndex]);
            if (e.key === 'Escape') setShowPicker(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, artists, onSelect]);

    // Touch/Swipe
    const touchStart = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => touchStart.current = e.touches[0].clientX;
    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (diff > 50) handleNext();
        if (diff < -50) handlePrev();
    };

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1 < artists.length ? prev + 1 : 0));
        setProgress(0);
        startTimeRef.current = Date.now();
    }, [artists.length]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : artists.length - 1));
        setProgress(0);
        startTimeRef.current = Date.now();
    }, [artists.length]);

    const toggleLike = useCallback((artistName: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setLikedArtists(prev => {
            const next = new Set(prev);
            if (next.has(artistName)) {
                next.delete(artistName);
            } else {
                next.add(artistName);
            }
            localStorage.setItem('lvrn_liked_artists', JSON.stringify([...next]));
            return next;
        });
    }, []);

    // Filtered artists for picker
    const categories = useMemo(() => {
        const cats = new Set(artists.map(a => a.category).filter(Boolean));
        return ['All', ...cats];
    }, [artists]);

    const filteredArtists = useMemo(() => {
        let result = artists;
        if (filterCategory !== 'All') {
            result = result.filter(a => a.category === filterCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(a =>
                a.name.toLowerCase().includes(q) ||
                a.role?.toLowerCase().includes(q)
            );
        }
        return result;
    }, [artists, filterCategory, searchQuery]);

    const getCardStyle = (index: number) => {
        const offset = index - activeIndex;
        const isActive = offset === 0;
        const xOffset = offset * 260;
        const scale = isActive ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15);
        const rotateY = isActive ? 0 : offset * -25;
        const zIndex = 100 - Math.abs(offset);
        const opacity = isActive ? 1 : Math.max(0.2, 1 - Math.abs(offset) * 0.3);
        const blur = isActive ? 0 : Math.abs(offset) * 4;

        return { zIndex, opacity, scale, x: xOffset, rotateY, filter: `blur(${blur}px)`, pointerEvents: isActive ? 'auto' : 'none' as const };
    };

    const currentArtist = artists[activeIndex];
    const stats = ARTIST_STATS[currentArtist?.name] || { streams: '—', followers: '—', growth: '—', category: currentArtist?.category || '—' };

    if (artists.length === 0) return null;

    return (
        <div
            className="relative group/carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Dynamic Background */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden"
                animate={{ background: `radial-gradient(circle at center, ${bgColor} 0%, rgba(0,0,0,0) 70%)` }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Progress Bar */}
            {isAutoPlaying && !showPicker && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5 rounded-full overflow-hidden z-50">
                    <motion.div
                        className="h-full bg-[var(--accent)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Header Controls */}
            <div className="flex items-center justify-between mb-6 relative z-20">
                <div className="flex items-center gap-3">
                    <motion.button
                        onClick={handlePrev}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </motion.button>
                    <motion.button
                        onClick={handleNext}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <ChevronRight size={18} />
                    </motion.button>
                </div>

                <div className="flex items-center gap-2">
                    {/* Auto-play Toggle */}
                    <motion.button
                        onClick={() => {
                            setIsAutoPlaying(!isAutoPlaying);
                            if (!isAutoPlaying) {
                                startTimeRef.current = Date.now();
                                setProgress(0);
                            }
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                            isAutoPlaying ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10 text-gray-500'
                        }`}
                    >
                        <Play size={14} className={isAutoPlaying ? 'hidden' : 'block'} />
                        <div className={`w-3 h-3 rounded-sm ${isAutoPlaying ? 'bg-[var(--accent)]' : 'hidden'}`} />
                    </motion.button>

                    {/* Artist Picker Toggle */}
                    <motion.button
                        onClick={() => setShowPicker(!showPicker)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`px-4 h-10 rounded-full border flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                            showPicker
                                ? 'bg-[var(--accent)]/20 border-[var(--accent)]/50 text-[var(--accent)]'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        <Filter size={14} />
                        <span className="hidden sm:inline">Artists</span>
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                            {artists.length}
                        </span>
                    </motion.button>
                </div>
            </div>

            {/* Artist Picker Panel */}
            <AnimatePresence>
                {showPicker && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-6 relative z-20"
                    >
                        <GlassCard className="!p-6 !bg-black/80 !backdrop-blur-xl border-white/10">
                            {/* Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search artists..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[var(--accent)]/50 transition-colors placeholder:text-gray-600"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Category Filters */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilterCategory(cat)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                                            filterCategory === cat
                                                ? 'bg-white text-black'
                                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Artist Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-64 overflow-y-auto custom-scrollbar">
                                {filteredArtists.map((artist) => {
                                    const idx = artists.indexOf(artist);
                                    const isActive = idx === activeIndex;
                                    const isLiked = likedArtists.has(artist.name);
                                    const imagePath = artist.image || `assets/images/${artist.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;

                                    return (
                                        <motion.button
                                            key={artist.name}
                                            onClick={() => {
                                                setActiveIndex(idx);
                                                setShowPicker(false);
                                                setSearchQuery('');
                                                setFilterCategory('All');
                                            }}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`relative rounded-xl overflow-hidden border transition-all group ${
                                                isActive
                                                    ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20'
                                                    : 'border-white/10 hover:border-white/30'
                                            }`}
                                        >
                                            <div className="aspect-square relative">
                                                <img
                                                    src={imagePath}
                                                    alt={artist.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', getGradient(artist.name).split(' ')[0], 'to-black');
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                                {/* Active Indicator */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="pickerActive"
                                                        className="absolute inset-0 border-2 border-[var(--accent)] rounded-xl"
                                                    />
                                                )}

                                                {/* Like Button */}
                                                <motion.button
                                                    onClick={(e) => toggleLike(artist.name, e)}
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.8 }}
                                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Star size={12} className={isLiked ? 'fill-yellow-400 text-yellow-400' : 'text-white/70'} />
                                                </motion.button>

                                                {/* Name Overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-2">
                                                    <p className="text-xs font-bold text-white truncate">{artist.name}</p>
                                                    <p className="text-[10px] text-gray-400 truncate">{artist.role}</p>
                                                </div>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {filteredArtists.length === 0 && (
                                <div className="py-8 text-center text-gray-500 text-sm">
                                    No artists found matching your search.
                                </div>
                            )}
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Carousel */}
            <div
                ref={containerRef}
                className="h-[550px] w-full relative flex items-center justify-center overflow-hidden perspective-[1000px] z-10"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                    <AnimatePresence initial={false}>
                        {artists.map((artist, index) => {
                            if (Math.abs(index - activeIndex) > 3) return null;

                            const style = getCardStyle(index);
                            const imagePath = artist.image || `assets/images/${artist.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;
                            const isLiked = likedArtists.has(artist.name);

                            return (
                                <motion.div
                                    key={artist.name}
                                    className="absolute top-1/2 left-1/2 w-[280px] md:w-[380px] h-[480px] -ml-[140px] md:-ml-[190px] -mt-[240px] cursor-pointer"
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
                                    <GlassCard
                                        className="w-full h-full p-0 overflow-hidden relative group border-white/10 bg-black"
                                        hoverEffect={index === activeIndex}
                                    >
                                        <img
                                            src={imagePath}
                                            alt={artist.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', getGradient(artist.name).split(' ')[0], 'to-black');
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                                        {/* Like Button on Card */}
                                        <motion.button
                                            onClick={(e) => toggleLike(artist.name, e)}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.8 }}
                                            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 z-20"
                                        >
                                            <Star size={16} className={isLiked ? 'fill-yellow-400 text-yellow-400' : 'text-white/70'} />
                                        </motion.button>

                                        {/* Category Badge */}
                                        {artist.category && (
                                            <div className="absolute top-4 left-4 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 z-20">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{artist.category}</span>
                                            </div>
                                        )}

                                        {/* Bottom Info */}
                                        <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                                            <motion.h3
                                                className="text-3xl md:text-4xl font-black text-white mb-1 leading-none drop-shadow-lg"
                                                layoutId={`featured-title-${artist.name}`}
                                            >
                                                {artist.name}
                                            </motion.h3>
                                            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">{artist.role}</p>

                                            {/* Quick Stats Row */}
                                            {index === activeIndex && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center gap-4 mb-4"
                                                >
                                                    <div className="flex items-center gap-1.5">
                                                        <Music size={12} className="text-gray-400" />
                                                        <span className="text-[10px] text-gray-300 font-mono">{stats.streams}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Users size={12} className="text-gray-400" />
                                                        <span className="text-[10px] text-gray-300 font-mono">{stats.followers}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <TrendingUp size={12} className="text-green-400" />
                                                        <span className="text-[10px] text-green-400 font-mono">{stats.growth}</span>
                                                    </div>
                                                </motion.div>
                                            )}

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-5 py-2.5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 group/btn"
                                            >
                                                View Profile <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                            </motion.button>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Scrubber with Artist Names */}
            <div className="flex justify-center items-center gap-3 mt-6 px-6 relative z-10">
                {artists.map((artist, i) => (
                    <motion.button
                        key={artist.name}
                        onClick={() => {
                            setActiveIndex(i);
                            startTimeRef.current = Date.now();
                            setProgress(0);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 group/dot"
                    >
                        <div
                            className={`rounded-full transition-all duration-300 ${
                                i === activeIndex
                                    ? 'w-8 h-1.5 bg-[var(--accent)]'
                                    : 'w-1.5 h-1.5 bg-white/20 group-hover/dot:bg-white/50'
                            }`}
                        />
                        <span className={`text-[10px] font-bold uppercase tracking-wider transition-opacity hidden lg:block ${
                            i === activeIndex ? 'text-white opacity-100' : 'text-gray-600 opacity-0 group-hover/dot:opacity-60'
                        }`}>
                            {artist.name.split(' ')[0]}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Keyboard Hint */}
            <p className="text-center text-gray-700 text-[10px] mt-3 hidden md:block">
                Use <kbd className="px-1 py-0.5 bg-white/5 rounded text-gray-500 font-mono">←</kbd> <kbd className="px-1 py-0.5 bg-white/5 rounded text-gray-500 font-mono">→</kbd> to navigate · <kbd className="px-1 py-0.5 bg-white/5 rounded text-gray-500 font-mono">Enter</kbd> to view profile
            </p>
        </div>
    );
};
