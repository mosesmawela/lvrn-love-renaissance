import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Youtube, Play, Star, ExternalLink, Volume2, VolumeX, Maximize2, Share2,
    Heart, ChevronRight, X, Copy, Check, Sparkles, MessageCircle, Music,
    TrendingUp, Users, Globe, Flame, Zap
} from 'lucide-react';
import { Artist } from '../types';
import { GlassCard } from './GlassCard';

interface ArtistSectionProps {
    artist: Artist;
}

interface FloatingReaction {
    id: number;
    emoji: string;
    x: number;
    y: number;
}

const REACTIONS = [
    { emoji: '🔥', label: 'Fire' },
    { emoji: '💯', label: '100' },
    { emoji: '🎵', label: 'Vibes' },
    { emoji: '😍', label: 'Love' },
    { emoji: '👏', label: 'Applause' }
];

const ARTIST_QUOTES: Record<string, string[]> = {
    'Summer Walker': [
        "Music is my therapy. Every note is a piece of my soul.",
        "I don't make music for numbers. I make it for the broken hearts.",
        "Atlanta raised me. Music saved me."
    ],
    'Odeal': [
        "Afro-fusion isn't a genre. It's a movement.",
        "London taught me grit. Africa gave me rhythm.",
        "No boundaries. Just sound."
    ],
    'Al Xapo': [
        "They call me villain because I speak the truth they hide.",
        "The streets don't lie. My music is the mirror.",
        "Ghetto aesthetic, global impact."
    ],
    'Ciza': [
        "3-Step is not a dance. It's a language.",
        "Africa is the future of dance music.",
        "Every beat is a heartbeat from home."
    ]
};

const DEFAULT_QUOTES = [
    "Art is the bridge between what we feel and what we can't say.",
    "Every track is a world. Every album is a universe.",
    "Music doesn't ask permission. It just arrives."
];

export const ArtistSection: React.FC<ArtistSectionProps> = ({ artist }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [cinematicMode, setCinematicMode] = useState(false);
    const [activeReaction, setActiveReaction] = useState<string | null>(null);
    const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
    const [currentQuote, setCurrentQuote] = useState(0);
    const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 900) + 100);
    const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 50000) + 10000);
    const [equalizerActive, setEqualizerActive] = useState(false);
    const reactionIdRef = useRef(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    const quotes = ARTIST_QUOTES[artist.name] || DEFAULT_QUOTES;
    const shareUrl = `https://www.youtube.com/watch?v=${artist.videoId}`;

    useEffect(() => {
        setIsLiked(false);
        setShowDetails(false);
        setIframeKey(prev => prev + 1);
        setCurrentQuote(0);
        setEqualizerActive(false);
        setLikeCount(Math.floor(Math.random() * 900) + 100);
        setViewCount(Math.floor(Math.random() * 50000) + 10000);
    }, [artist.videoId, artist.name]);

    // Auto-rotate quotes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote(prev => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [quotes.length]);

    // Simulate live view count
    useEffect(() => {
        const interval = setInterval(() => {
            setViewCount(prev => prev + Math.floor(Math.random() * 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleReaction = useCallback((emoji: string, e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const sectionRect = sectionRef.current?.getBoundingClientRect();
        if (!sectionRect) return;

        const id = ++reactionIdRef.current;
        const newReaction: FloatingReaction = {
            id,
            emoji,
            x: rect.left - sectionRect.left + rect.width / 2,
            y: rect.top - sectionRect.top
        };

        setFloatingReactions(prev => [...prev, newReaction]);
        setActiveReaction(emoji);

        setTimeout(() => {
            setFloatingReactions(prev => prev.filter(r => r.id !== id));
        }, 2000);

        setTimeout(() => setActiveReaction(null), 500);
    }, []);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatNumber = (num: number): string => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`my-20 relative ${cinematicMode ? 'fixed inset-0 z-[100] bg-black flex items-center justify-center p-4' : ''}`}
        >
            {/* Floating Reactions */}
            <AnimatePresence>
                {floatingReactions.map(reaction => (
                    <motion.div
                        key={reaction.id}
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -120, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute pointer-events-none text-3xl z-[200]"
                        style={{ left: reaction.x, top: reaction.y }}
                    >
                        {reaction.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Cinematic Mode Overlay */}
            {cinematicMode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-[99]"
                    onClick={() => setCinematicMode(false)}
                />
            )}

            {/* Section Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-12 h-1 bg-gradient-to-r from-[var(--accent)] to-transparent rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[var(--text-color)]">
                        Featured <span className="text-gray-500">Masterpiece</span>
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    {/* Cinematic Mode Toggle */}
                    <motion.button
                        onClick={() => setCinematicMode(!cinematicMode)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded-lg border transition-all ${
                            cinematicMode
                                ? 'bg-white/20 border-white/30 text-white'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                        title="Cinematic Mode"
                    >
                        <Maximize2 size={16} />
                    </motion.button>

                    {/* Like Button */}
                    <motion.button
                        onClick={() => {
                            setIsLiked(!isLiked);
                            if (!isLiked) setLikeCount(prev => prev + 1);
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all relative overflow-hidden ${
                            isLiked
                                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        <motion.div
                            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <Heart size={14} className={isLiked ? 'fill-red-400' : ''} />
                        </motion.div>
                        <span className="text-xs font-bold tabular-nums">{formatNumber(likeCount)}</span>
                    </motion.button>
                </div>
            </div>

            {/* Main Video Card */}
            <GlassCard className={`!p-0 overflow-hidden border-[var(--card-border)] shadow-2xl relative group ${cinematicMode ? 'w-full max-w-6xl' : ''}`}>
                <div className="aspect-video w-full relative">
                    {/* Video Player */}
                    <iframe
                        key={iframeKey}
                        src={`https://www.youtube.com/embed/${artist.videoId}?autoplay=0&modestbranding=1&rel=0&controls=1`}
                        title={`${artist.name} Featured Video`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />

                    {/* Decorative Border */}
                    <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[inherit]" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Equalizer Overlay (when active) */}
                    <AnimatePresence>
                        {equalizerActive && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-1 px-4 pb-4 pointer-events-none"
                            >
                                {Array.from({ length: 32 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-gradient-to-t from-[var(--accent)] to-transparent rounded-full"
                                        animate={{
                                            height: [4, Math.random() * 40 + 10, 4]
                                        }}
                                        transition={{
                                            duration: 0.5 + Math.random() * 0.5,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            delay: i * 0.02
                                        }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent pointer-events-none group-hover:pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={() => {
                                setIsMuted(!isMuted);
                                setEqualizerActive(!isMuted);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </motion.button>
                        <motion.button
                            onClick={() => setEqualizerActive(!equalizerActive)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-2 rounded-lg transition-colors ${equalizerActive ? 'bg-[var(--accent)]/30 text-[var(--accent)]' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                        >
                            <Music size={16} />
                        </motion.button>
                    </div>
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={() => setShowShareModal(true)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <Share2 size={16} />
                        </motion.button>
                    </div>
                </div>

                {/* Live Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <motion.div
                        className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                            {formatNumber(viewCount)} watching
                        </span>
                    </motion.div>
                </div>
            </GlassCard>

            {/* Reaction Bar */}
            <motion.div
                className="mt-4 flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mr-2">React:</span>
                {REACTIONS.map(reaction => (
                    <motion.button
                        key={reaction.emoji}
                        onClick={(e) => handleReaction(reaction.emoji, e)}
                        whileHover={{ scale: 1.3, y: -4 }}
                        whileTap={{ scale: 0.8 }}
                        className={`text-xl p-2 rounded-full transition-all ${
                            activeReaction === reaction.emoji ? 'bg-white/10 scale-110' : 'hover:bg-white/5'
                        }`}
                        title={reaction.label}
                    >
                        {reaction.emoji}
                    </motion.button>
                ))}
            </motion.div>

            {/* Info Section */}
            <motion.div
                className="mt-8 grid md:grid-cols-2 gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                {/* Left: Description */}
                <div className="space-y-5">
                    <div className="flex items-center gap-2">
                        <Youtube className="text-red-500" size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                            Official LVRN Premiere
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                        {artist.name} &mdash; Official Visual
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-lg">
                        Dive into the creative world of {artist.name}. This featured visual encapsulates
                        the unique aesthetic and sound that defines their place in the LVRN family.
                    </p>

                    {/* Artist Quote Carousel */}
                    <div className="relative p-4 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                        <MessageCircle size={14} className="text-[var(--accent)] mb-2 opacity-60" />
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentQuote}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="text-sm text-gray-300 italic leading-relaxed"
                            >
                                "{quotes[currentQuote]}"
                            </motion.p>
                        </AnimatePresence>
                        <div className="flex gap-1 mt-3">
                            {quotes.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQuote(idx)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                                        idx === currentQuote ? 'bg-[var(--accent)] w-4' : 'bg-white/20 hover:bg-white/40'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Expandable Details */}
                    <motion.button
                        onClick={() => setShowDetails(!showDetails)}
                        className="flex items-center gap-2 text-xs text-[var(--accent)] font-bold uppercase tracking-wider hover:underline"
                    >
                        {showDetails ? 'Hide' : 'View'} More Details
                        <motion.div
                            animate={{ rotate: showDetails ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronRight size={14} />
                        </motion.div>
                    </motion.button>

                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-2 gap-3 pt-3">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-[10px] text-gray-500 uppercase block">Artist</span>
                                        <span className="text-sm text-white font-bold">{artist.name}</span>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-[10px] text-gray-500 uppercase block">Category</span>
                                        <span className="text-sm text-white font-bold">{artist.category || 'LVRN'}</span>
                                    </div>
                                    {artist.role && (
                                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-[10px] text-gray-500 uppercase block">Role</span>
                                            <span className="text-sm text-white font-bold">{artist.role}</span>
                                        </div>
                                    )}
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                        <span className="text-[10px] text-gray-500 uppercase block">Platform</span>
                                        <span className="text-sm text-white font-bold">YouTube</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Actions & Stats */}
                <div className="flex flex-col justify-between gap-6">
                    {/* Action Button */}
                    <motion.a
                        href={`https://www.youtube.com/watch?v=${artist.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group/btn relative flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        <Play size={16} className="relative z-10 group-hover/btn:fill-white" />
                        <span className="relative z-10 group-hover/btn:text-white transition-colors">Watch on YouTube</span>
                        <ExternalLink size={14} className="relative z-10 text-gray-500 group-hover/btn:text-white transition-colors" />
                    </motion.a>

                    {/* Live Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <motion.div
                            className="p-4 bg-white/5 rounded-xl border border-white/10 group hover:border-[var(--accent)]/30 transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Flame size={14} className="text-orange-400" />
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Trending</span>
                            </div>
                            <div className="text-xl font-black text-white tabular-nums">#{Math.floor(Math.random() * 20) + 1}</div>
                            <div className="text-[10px] text-gray-500">in Music</div>
                        </motion.div>
                        <motion.div
                            className="p-4 bg-white/5 rounded-xl border border-white/10 group hover:border-[var(--accent)]/30 transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={14} className="text-yellow-400" />
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Engagement</span>
                            </div>
                            <div className="text-xl font-black text-white tabular-nums">{Math.floor(Math.random() * 5) + 95}%</div>
                            <div className="text-[10px] text-gray-500">Positive</div>
                        </motion.div>
                        <motion.div
                            className="p-4 bg-white/5 rounded-xl border border-white/10 group hover:border-[var(--accent)]/30 transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Globe size={14} className="text-blue-400" />
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Reach</span>
                            </div>
                            <div className="text-xl font-black text-white tabular-nums">{Math.floor(Math.random() * 40) + 20}+</div>
                            <div className="text-[10px] text-gray-500">Countries</div>
                        </motion.div>
                        <motion.div
                            className="p-4 bg-white/5 rounded-xl border border-white/10 group hover:border-[var(--accent)]/30 transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp size={14} className="text-green-400" />
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Growth</span>
                            </div>
                            <div className="text-xl font-black text-white tabular-nums">+{Math.floor(Math.random() * 30) + 10}%</div>
                            <div className="text-[10px] text-gray-500">This Week</div>
                        </motion.div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-3">
                        <motion.div
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">HD</span>
                        </motion.div>
                        <motion.div
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Star size={14} className="text-yellow-500" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Featured</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Ambient Glow Effects */}
            <div className="relative pointer-events-none">
                <motion.div
                    animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -right-10 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, 10, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"
                />
            </div>

            {/* Share Modal */}
            <AnimatePresence>
                {showShareModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowShareModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white">Share This</h3>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Copy Link */}
                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 mb-4">
                                <input
                                    type="text"
                                    value={shareUrl}
                                    readOnly
                                    className="flex-1 bg-transparent text-xs text-gray-400 focus:outline-none truncate"
                                />
                                <motion.button
                                    onClick={handleCopyLink}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                        copied
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </motion.button>
                            </div>

                            {/* Share Options */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { icon: <Globe size={18} />, label: 'Browser', action: () => window.open(shareUrl, '_blank') },
                                    { icon: <Users size={18} />, label: 'Social', action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out ${artist.name} on LVRN`, '_blank') },
                                    { icon: <Sparkles size={18} />, label: 'More', action: () => { if (navigator.share) navigator.share({ title: artist.name, url: shareUrl }); } }
                                ].map((option, idx) => (
                                    <motion.button
                                        key={idx}
                                        onClick={option.action}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white"
                                    >
                                        {option.icon}
                                        <span className="text-[10px] font-bold uppercase tracking-wider">{option.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
