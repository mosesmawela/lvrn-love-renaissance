import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Globe, Star, Users, Music, ListMusic, Trophy, Zap, Video, Share2, Quote, ExternalLink, Check, Twitter, Instagram, Search, Play, Youtube, Music as MusicIcon, ExternalLink as LinkIcon, Loader2, X } from 'lucide-react';
import { Artist } from '../types';
import { GlassCard } from './GlassCard';
import { useExperience } from './ExperienceProvider';
import { musicDataService, UnifiedTrack, UnifiedVideo } from '../src/services/music-data-service';

interface ArtistProfileProps {
    artist: Artist;
    onBack: () => void;
    onBook: (artist: Artist) => void;
}

// --- Metric Ticker Component ---
const MetricTicker: React.FC<{ stats: NonNullable<Artist['stats']> }> = ({ stats }) => {
    const items = useMemo(() => {
        const list = [
            { key: 'followers', label: 'Total Followers', icon: Users, value: stats.followers },
            { key: 'streams', label: 'Monthly Streams', icon: Music, value: stats.streams },
            { key: 'playlists', label: 'Editorial Playlists', icon: ListMusic, value: stats.playlists },
            { key: 'charts', label: 'Chart Peaks', icon: Trophy, value: stats.charts },
            { key: 'shazams', label: 'Shazams', icon: Zap, value: stats.shazams },
            { key: 'creates', label: 'Content Creations', icon: Video, value: stats.creates }
        ];
        return list.filter(i => i.value);
    }, [stats]);

    if (items.length === 0) return null;

    const tickerItems = [...items, ...items, ...items, ...items];

    return (
        <div className="w-full bg-[var(--card-bg)] border-y border-[var(--card-border)] backdrop-blur-md overflow-hidden flex relative z-40">
            <div className="flex items-center gap-2 px-6 py-4 bg-[var(--bg-color)]/50 border-r border-[var(--card-border)] z-10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-color)] whitespace-nowrap">Live Stats</span>
            </div>

            <div className="flex-1 overflow-hidden relative group cursor-default">
                <motion.div
                    className="flex"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: Math.max(20, items.length * 5),
                        ease: "linear",
                        repeat: Infinity
                    }}
                    style={{ width: "fit-content" }}
                >
                    {tickerItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={`${item.key}-${idx}`} className="flex items-center gap-4 px-8 py-4 border-r border-[var(--card-border)] min-w-[200px] group-hover:bg-[var(--text-color)]/5 transition-colors">
                                <Icon size={16} className="text-[var(--text-secondary)]" />
                                <div className="flex flex-col">
                                    <span className="text-lg font-black text-[var(--text-color)] leading-none">{item.value}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">{item.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artist, onBack, onBook }) => {
    const { showNotification } = useExperience();
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tracks, setTracks] = useState<UnifiedTrack[]>([]);
    const [videos, setVideos] = useState<UnifiedVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMedia, setActiveMedia] = useState<({ type: 'track', data: UnifiedTrack } | { type: 'video', data: UnifiedVideo }) | null>(null);

    useEffect(() => {
        const fetchMedia = async () => {
            setLoading(true);
            try {
                const [artistTracks, artistVideos] = await Promise.all([
                    musicDataService.searchTracks(artist.name, searchQuery),
                    musicDataService.getArtistVideos(artist.name)
                ]);
                setTracks(artistTracks);
                setVideos(artistVideos);
            } catch {
                // Ignore error as we want to fail silently and stop loading
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchMedia, 300);
        return () => clearTimeout(debounce);
    }, [artist.name, searchQuery]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleShare = () => {
        const shareData = {
            title: `LVRN - ${artist.name}`,
            text: `Check out ${artist.name} on Love Renaissance.`,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else {
            navigator.clipboard.writeText(shareData.url).then(() => {
                setCopied(true);
                showNotification("Link copied to clipboard", "success");
                setTimeout(() => setCopied(false), 3000);
            });
        }
    };

    const imagePath = artist.image || `assets/images/${artist.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[var(--bg-color)] relative z-50 pb-20"
        >
            <nav className="fixed top-0 left-0 right-0 z-[60] p-6 pointer-events-none">
                <div className="flex justify-between items-start pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-3 px-5 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Back to Roster</span>
                    </button>

                    <button
                        onClick={() => onBook(artist)}
                        className="md:hidden flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--text-color)] text-[var(--bg-color)] border border-transparent font-bold uppercase tracking-widest text-xs shadow-xl"
                    >
                        Book Now
                    </button>
                </div>
            </nav>

            <div className="relative h-[75vh] w-full overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                >
                    <img
                        src={imagePath}
                        alt={artist.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-orange-900', 'to-black');
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[var(--bg-color)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/20 to-transparent opacity-90" />
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-24 z-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap items-center gap-4 mb-6"
                        >
                            <span className="px-4 py-1.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[var(--accent)]/20">
                                {artist.category}
                            </span>
                            {artist.role && (
                                <span className="px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider">
                                    {artist.role}
                                </span>
                            )}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none drop-shadow-2xl"
                        >
                            {artist.name}
                        </motion.h1>
                    </div>
                </div>
            </div>

            {artist.stats && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="-mt-12 relative z-40 mb-12"
                >
                    <MetricTicker stats={artist.stats} />
                </motion.div>
            )}

            <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                    <div className="lg:col-span-4 relative order-2 lg:order-1">
                        <div className="sticky top-24 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <GlassCard className="space-y-6 !bg-[var(--card-bg)] !backdrop-blur-xl border-[var(--card-border)] shadow-xl">
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] border-b border-[var(--text-color)]/10 pb-3">
                                            Booking Information
                                        </h3>
                                        <div className="flex justify-between items-center py-1">
                                            <div className="flex items-center gap-3">
                                                <Globe className="text-[var(--text-secondary)]" size={16} />
                                                <span className="text-sm text-[var(--text-secondary)]">Region</span>
                                            </div>
                                            <span className="font-bold text-[var(--text-color)] text-sm">{artist.bookingRegion || 'Global'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="text-[var(--text-secondary)]" size={16} />
                                                <span className="text-sm text-[var(--text-secondary)]">Est. Rate</span>
                                            </div>
                                            <span className="font-bold text-[var(--accent)] text-sm">{artist.bookingRate || 'Inquire'}</span>
                                        </div>

                                        <button
                                            onClick={() => onBook(artist)}
                                            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[var(--text-color)] text-[var(--bg-color)] font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                            title="Send Booking Inquiry"
                                        >
                                            <Star size={16} /> Book {artist.name}
                                        </button>

                                        <div className="pt-4 flex items-center justify-center gap-6 border-t border-[var(--text-color)]/5">
                                            <a href="#" title="Follow on Twitter" aria-label="Follow on Twitter" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><Twitter size={18} /></a>
                                            <a href="#" title="Follow on Instagram" aria-label="Follow on Instagram" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><Instagram size={18} /></a>
                                            <a href="#" title="Visit Official Website" aria-label="Visit Official Website" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><Globe size={18} /></a>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-12 order-1 lg:order-2">
                        {artist.quote && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="relative"
                            >
                                <Quote className="absolute -top-6 -left-4 text-[var(--accent)] opacity-30 w-12 h-12" />
                                <p className="text-3xl md:text-4xl lg:text-5xl font-medium italic leading-tight text-[var(--text-color)] relative z-10">
                                    "{artist.quote}"
                                </p>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-[var(--card-bg)]/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[var(--text-color)]/5"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-1 bg-[var(--accent)] rounded-full" />
                                <h2 className="text-xl font-bold uppercase tracking-widest text-[var(--text-color)]">Biography</h2>
                            </div>

                            <div className="prose prose-lg prose-invert text-[var(--text-secondary)] max-w-none leading-loose">
                                <p>{artist.bio || "Biography coming soon..."}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75 }}
                            className="space-y-8"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-1 bg-[var(--accent)] rounded-full" />
                                    <h2 className="text-xl font-bold uppercase tracking-widest text-[var(--text-color)]">Music & Visuals</h2>
                                </div>

                                <div className="relative group max-w-md w-full">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search songs or albums..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[var(--card-bg)] border border-[var(--text-color)]/10 rounded-full py-3 pl-12 pr-6 text-sm text-[var(--text-color)] focus:outline-none focus:border-[var(--accent)]/50 transition-all backdrop-blur-md"
                                    />
                                </div>
                            </div>

                            {(artist.spotifyEmbedId || artist.appleMusicEmbedId) && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white/5 rounded-3xl p-6 border border-white/10">
                                    {artist.spotifyEmbedId && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 px-2">
                                                <div className="w-2 h-2 rounded-full bg-[#1DB954]" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Spotify Artist Profile</span>
                                            </div>
                                            <iframe
                                                src={`https://open.spotify.com/embed/artist/${artist.spotifyEmbedId}?utm_source=generator&theme=0`}
                                                width="100%"
                                                height="352"
                                                frameBorder="0"
                                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                                loading="lazy"
                                                className="rounded-2xl shadow-2xl music-embed-iframe"
                                                title="Spotify Player"
                                            />
                                        </div>
                                    )}
                                    {artist.appleMusicEmbedId && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 px-2">
                                                <div className="w-2 h-2 rounded-full bg-[#FC3C44]" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Apple Music Artist Profile</span>
                                            </div>
                                            <iframe
                                                allow="autoplay *; encrypted-media *;"
                                                frameBorder="0"
                                                height="352"
                                                className="rounded-2xl shadow-2xl apple-music-embed"
                                                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                                                src={`https://embed.music.apple.com/za/${artist.appleMusicEmbedId}`}
                                                title="Apple Music Player"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] flex items-center gap-2">
                                    <Search size={14} /> Search Library
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {loading ? (
                                        <div className="col-span-full py-12 flex flex-col items-center justify-center gap-4 text-[var(--text-muted)]">
                                            <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
                                            <p className="text-xs uppercase tracking-widest font-bold">Scanning Library...</p>
                                        </div>
                                    ) : tracks.length > 0 ? (
                                        tracks.map((track) => (
                                            <GlassCard
                                                key={track.id}
                                                className="group relative !p-3 flex items-center gap-4 hover:border-[var(--accent)]/30 transition-all cursor-pointer"
                                                onClick={() => setActiveMedia({ type: 'track', data: track })}
                                            >
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                                    <img src={track.image} alt={track.name} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Play size={20} className="text-white fill-white" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-[var(--text-color)] truncate">{track.name}</h4>
                                                    <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider truncate">{track.album}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        {track.platform === 'spotify' && <div className="w-2 h-2 rounded-full bg-[#1DB954]" title="Spotify" />}
                                                        {track.platform === 'apple' && <div className="w-2 h-2 rounded-full bg-[#FC3C44]" title="Apple Music" />}
                                                        {track.platform === 'youtube' && <div className="w-2 h-2 rounded-full bg-[#FF0000]" title="YouTube" />}
                                                        <span className="text-[10px] text-[var(--text-muted)] font-mono">{track.platform}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                                                    title={`Open ${track.name} on ${track.platform}`}
                                                    aria-label={`Open ${track.name} on ${track.platform}`}
                                                >
                                                    <LinkIcon size={14} />
                                                </button>
                                            </GlassCard>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center text-[var(--text-muted)] italic">
                                            No tracks found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            </div>

                            {videos.length > 0 && (
                                <div className="space-y-4 pt-4">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4 flex items-center gap-2">
                                        <Youtube size={14} /> Official Visuals
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {videos.slice(0, 3).map((video) => (
                                            <div
                                                key={video.id}
                                                className="group aspect-video rounded-xl overflow-hidden relative cursor-pointer border border-white/5"
                                                onClick={() => setActiveMedia({ type: 'video', data: video })}
                                            >
                                                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-lg">
                                                        <Play size={18} className="text-white fill-white ml-0.5" />
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-2 left-3 right-3 text-[10px] font-bold text-white truncate">
                                                    {video.title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-[var(--text-color)]/10"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold uppercase tracking-widest text-[var(--text-color)]">Share Profile</span>
                                <span className="text-xs text-[var(--text-secondary)]">Spread the word about {artist.name}</span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--card-bg)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-all border border-[var(--text-color)]/10 text-sm font-bold uppercase tracking-wider"
                                >
                                    {copied ? <Check size={16} /> : <Share2 size={16} />}
                                    {copied ? 'Copied' : 'Share'}
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--card-bg)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-colors border border-[var(--text-color)]/10 text-sm font-bold uppercase tracking-wider">
                                    <ExternalLink size={16} /> EPK
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {activeMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
                        onClick={() => setActiveMedia(null)}
                    >
                        <div
                            className="w-full max-w-4xl bg-[#111] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                                <div className="flex items-center gap-3">
                                    {activeMedia.type === 'track' ? (
                                        <MusicIcon className="text-[var(--accent)]" size={18} />
                                    ) : (
                                        <Youtube className="text-red-500" size={18} />
                                    )}
                                    <span className="text-xs font-bold uppercase tracking-widest text-white">
                                        Now Playing: {activeMedia.data.name || activeMedia.data.title}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setActiveMedia(null)}
                                    className="p-1 hover:text-[var(--accent)] transition-colors text-white/50"
                                    aria-label="Close media player"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="aspect-video w-full bg-black">
                                {activeMedia.type === 'video' ? (
                                    <iframe
                                        src={`${activeMedia.data.embedUrl}?autoplay=1`}
                                        title={`Video: ${activeMedia.data.name || activeMedia.data.title}`}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center p-8">
                                        {activeMedia.data.platform === 'spotify' ? (
                                            <iframe
                                                src={`https://open.spotify.com/embed/track/${activeMedia.data.id.includes(':') ? activeMedia.data.id.split(':').pop() : activeMedia.data.id}?utm_source=generator&theme=0`}
                                                width="100%"
                                                height="352"
                                                title={`Spotify Preview: ${activeMedia.data.name}`}
                                                frameBorder="0"
                                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="text-center space-y-4">
                                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
                                                    <MusicIcon size={32} className="text-[var(--text-muted)]" />
                                                </div>
                                                <p className="text-sm font-bold text-white uppercase tracking-widest">Platform player unavailable in preview</p>
                                                <a
                                                    href={activeMedia.data.externalUrl || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-bold uppercase tracking-widest text-xs"
                                                >
                                                    Open in {activeMedia.data.platform} <LinkIcon size={14} />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div >
    );
};
