import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Heart, ExternalLink, ArrowRight, Check, Search, List, Play, X, Music4, Filter, SlidersHorizontal, Share2, Copy, MessageCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { MERCH_PRODUCTS, MerchProduct, FULL_RELEASES } from '../constants';
import { useExperience } from './ExperienceProvider';
import type { Release } from '../types';

// Streaming Stats Component
const StreamingStats: React.FC<{ stats: Release['streamingStats'] }> = ({ stats }) => {
    if (!stats) return null;

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-black/20 rounded-xl">
            {stats.spotify && (
                <div className="text-center">
                    <div className="text-lg font-bold text-green-400 mb-1">
                        {formatNumber(stats.spotify.streams)}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                        Spotify Streams
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                        {formatNumber(stats.spotify.monthlyListeners)} monthly
                    </div>
                </div>
            )}
            {stats.appleMusic && (
                <div className="text-center">
                    <div className="text-lg font-bold text-pink-400 mb-1">
                        {formatNumber(stats.appleMusic.plays)}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                        Apple Music
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                        Plays
                    </div>
                </div>
            )}
            {stats.youtube && (
                <div className="text-center">
                    <div className="text-lg font-bold text-red-400 mb-1">
                        {formatNumber(stats.youtube.views)}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">
                        YouTube
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                        Views
                    </div>
                </div>
            )}
        </div>
    );
};

export const ReleasesPage: React.FC = () => {
    const { showNotification } = useExperience();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [presaved, setPresaved] = useState<Record<number, boolean>>({});
    const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
    const [playingTrack, setPlayingTrack] = useState<string | null>(null);
    const [activePlayer, setActivePlayer] = useState<'spotify' | 'apple' | null>(null);
    const [showShareOptions, setShowShareOptions] = useState(false);

    // Advanced Filter State
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    const [yearRange, setYearRange] = useState<[number, number]>([2016, 2024]);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popularity' | 'title'>('newest');

    const handlePresave = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setPresaved(prev => ({ ...prev, [id]: true }));
        showNotification("Release Pre-saved to Library", "success");
    };

    const handlePlayPreview = (trackTitle: string) => {
        if (playingTrack === trackTitle) {
            setPlayingTrack(null);
        } else {
            setPlayingTrack(trackTitle);
            // Simulate audio starting
        }
    };

    const handleShare = async (platform?: string) => {
        const url = window.location.href;
        const text = `Check out "${selectedRelease?.title}" by ${selectedRelease?.artist} from LVRN! 🎵`;

        if (platform === 'copy') {
            await navigator.clipboard.writeText(`${text} ${url}`);
            showNotification("Link copied to clipboard!", "success");
            setShowShareOptions(false);
            return;
        }

        if (navigator.share && !platform) {
            try {
                await navigator.share({
                    title: selectedRelease?.title,
                    text: text,
                    url: url,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback sharing
            const shareUrl = platform === 'twitter'
                ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
                : platform === 'facebook'
                ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
                : url;

            window.open(shareUrl, '_blank');
        }
        setShowShareOptions(false);
    };

    // Get unique values for filters
    const availableGenres = useMemo(() => {
        const genres = new Set<string>();
        FULL_RELEASES.forEach(release => {
            release.genre?.forEach(genre => genres.add(genre));
        });
        return Array.from(genres).sort();
    }, []);

    const availableArtists = useMemo(() => {
        const artists = new Set<string>();
        FULL_RELEASES.forEach(release => artists.add(release.artist));
        return Array.from(artists).sort();
    }, []);

    const filtered = useMemo(() => {
        let data = filter === 'All' ? FULL_RELEASES : FULL_RELEASES.filter(r => r.type === filter);

        // Search query filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.artist.toLowerCase().includes(q) ||
                r.description?.toLowerCase().includes(q) ||
                r.genre?.some(g => g.toLowerCase().includes(q))
            );
        }

        // Genre filter
        if (selectedGenres.length > 0) {
            data = data.filter(r =>
                r.genre?.some(g => selectedGenres.includes(g))
            );
        }

        // Artist filter
        if (selectedArtists.length > 0) {
            data = data.filter(r => selectedArtists.includes(r.artist));
        }

        // Year range filter
        data = data.filter(r => {
            const year = parseInt(r.date);
            return year >= yearRange[0] && year <= yearRange[1];
        });

        // Sort
        data.sort((a, b) => {
            switch (sortBy) {
                case 'oldest':
                    return parseInt(a.date) - parseInt(b.date);
                case 'popularity':
                    return (b.popularity || 0) - (a.popularity || 0);
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'newest':
                default:
                    return parseInt(b.date) - parseInt(a.date);
            }
        });

        return data;
    }, [filter, searchQuery, selectedGenres, selectedArtists, yearRange, sortBy]);

    return (
        <div className="min-h-screen py-12 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative mb-16"
                >
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full text-[var(--accent)] text-sm font-bold uppercase tracking-wider mb-6"
                        >
                            <Disc size={16} />
                            Complete Collection
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-color)] tracking-tighter mb-6 leading-none"
                        >
                            DISCOGRAPHY
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                        >
                            The complete sonic history of Love Renaissance. From underground anthems to chart-topping hits,
                            explore our musical journey across genres and eras.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto lg:mx-0"
                        >
                            <div className="text-center lg:text-left">
                                <div className="text-3xl md:text-4xl font-black text-[var(--accent)] mb-2">
                                    {FULL_RELEASES.length}
                                </div>
                                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
                                    Releases
                                </div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl md:text-4xl font-black text-[var(--accent)] mb-2">
                                    {FULL_RELEASES.reduce((acc, r) => acc + r.totalTracks, 0)}
                                </div>
                                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
                                    Total Tracks
                                </div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl md:text-4xl font-black text-[var(--accent)] mb-2">
                                    {new Set(FULL_RELEASES.map(r => r.artist)).size}
                                </div>
                                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
                                    Artists
                                </div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl md:text-4xl font-black text-[var(--accent)] mb-2">
                                    {FULL_RELEASES.reduce((acc, r) => acc + (r.streamingStats?.spotify?.streams || 0), 0) / 1000000000 | 0}B+
                                </div>
                                <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
                                    Streams
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Header & Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full lg:w-auto"
                    >

                        {/* Search Bar */}
                        <div className="relative max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search albums, singles, or artists..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-color)] focus:outline-none focus:border-[var(--accent)] transition-all"
                            />
                        </div>

                        {/* Advanced Filters Toggle */}
                        <button
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                                showAdvancedFilters
                                    ? 'bg-[var(--accent)] text-white'
                                    : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-color)]'
                            }`}
                        >
                            <SlidersHorizontal size={16} />
                            Advanced Filters
                        </button>
                    </motion.div>

                    {/* Advanced Filters Panel */}
                    <AnimatePresence>
                        {showAdvancedFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 overflow-hidden"
                            >
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Genre Filter */}
                                    <div>
                                        <label className="block text-sm font-bold text-[var(--text-color)] mb-3 uppercase tracking-wider">
                                            Genres
                                        </label>
                                        <div className="space-y-2 max-h-32 overflow-y-auto">
                                            {availableGenres.map(genre => (
                                                <label key={genre} className="flex items-center gap-2 cursor-pointer hover:bg-[var(--text-color)]/5 p-1 rounded">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedGenres.includes(genre)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedGenres(prev => [...prev, genre]);
                                                            } else {
                                                                setSelectedGenres(prev => prev.filter(g => g !== genre));
                                                            }
                                                        }}
                                                        className="rounded border-[var(--card-border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                                    />
                                                    <span className="text-sm text-[var(--text-secondary)]">{genre}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Artist Filter */}
                                    <div>
                                        <label className="block text-sm font-bold text-[var(--text-color)] mb-3 uppercase tracking-wider">
                                            Artists
                                        </label>
                                        <div className="space-y-2 max-h-32 overflow-y-auto">
                                            {availableArtists.map(artist => (
                                                <label key={artist} className="flex items-center gap-2 cursor-pointer hover:bg-[var(--text-color)]/5 p-1 rounded">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedArtists.includes(artist)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedArtists(prev => [...prev, artist]);
                                                            } else {
                                                                setSelectedArtists(prev => prev.filter(a => a !== artist));
                                                            }
                                                        }}
                                                        className="rounded border-[var(--card-border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                                                    />
                                                    <span className="text-sm text-[var(--text-secondary)]">{artist}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Year Range */}
                                    <div>
                                        <label className="block text-sm font-bold text-[var(--text-color)] mb-3 uppercase tracking-wider">
                                            Year Range
                                        </label>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs text-[var(--text-secondary)]">From: {yearRange[0]}</label>
                                                <input
                                                    type="range"
                                                    min="2016"
                                                    max="2024"
                                                    value={yearRange[0]}
                                                    onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                                                    className="w-full accent-[var(--accent)]"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-[var(--text-secondary)]">To: {yearRange[1]}</label>
                                                <input
                                                    type="range"
                                                    min="2016"
                                                    max="2024"
                                                    value={yearRange[1]}
                                                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                                                    className="w-full accent-[var(--accent)]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sort Options */}
                                    <div>
                                        <label className="block text-sm font-bold text-[var(--text-color)] mb-3 uppercase tracking-wider">
                                            Sort By
                                        </label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as any)}
                                            className="w-full p-2 rounded-lg bg-[var(--bg-color)] border border-[var(--card-border)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                        >
                                            <option value="newest">Newest First</option>
                                            <option value="oldest">Oldest First</option>
                                            <option value="popularity">Most Popular</option>
                                            <option value="title">Title A-Z</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                <div className="flex justify-end mt-6 pt-4 border-t border-[var(--text-color)]/10">
                                    <button
                                        onClick={() => {
                                            setSelectedGenres([]);
                                            setSelectedArtists([]);
                                            setYearRange([2016, 2024]);
                                            setSortBy('newest');
                                            setSearchQuery('');
                                            setFilter('All');
                                        }}
                                        className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] font-bold uppercase tracking-wider"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Filter Pills */}
                    <div className="flex gap-2 p-1 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] overflow-x-auto max-w-full">
                        {['All', 'Album', 'EP', 'Single'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filter === type
                                    ? 'bg-[var(--text-color)] text-[var(--bg-color)]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-color)]'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Trending Section */}
                {filtered.length > 0 && !searchQuery && selectedGenres.length === 0 && selectedArtists.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-color)]">Trending Now</h2>
                            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-[var(--accent)] to-transparent" />
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                            {FULL_RELEASES
                                .filter(r => r.popularity && r.popularity > 65)
                                .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
                                .slice(0, 4)
                                .map((release, idx) => (
                                    <motion.div
                                        key={`trending-${release.id}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group cursor-pointer"
                                        onClick={() => setSelectedRelease(release)}
                                    >
                                        <GlassCard className="overflow-hidden">
                                            <div className="relative aspect-square overflow-hidden bg-black">
                                                <img
                                                    src={release.cover}
                                                    alt={release.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-2 left-2">
                                                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded">
                                                        🔥 Trending
                                                    </span>
                                                </div>
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="px-4 py-2 bg-white text-black rounded-full font-bold uppercase text-sm tracking-wider">
                                                        View Details
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-[var(--text-color)] text-sm line-clamp-1 mb-1">{release.title}</h4>
                                                <p className="text-[var(--text-secondary)] text-xs">{release.artist}</p>
                                                {release.streamingStats?.spotify && (
                                                    <p className="text-green-400 text-xs font-mono mt-1">
                                                        {(release.streamingStats.spotify.streams / 1000000).toFixed(1)}M streams
                                                    </p>
                                                )}
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))}
                        </div>
                    </motion.div>
                )}

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <p className="text-[var(--text-secondary)]">
                            Showing {filtered.length} of {FULL_RELEASES.length} releases
                        </p>
                        {(selectedGenres.length > 0 || selectedArtists.length > 0 || yearRange[0] > 2016 || yearRange[1] < 2024 || sortBy !== 'newest') && (
                            <span className="px-2 py-1 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                Filtered
                            </span>
                        )}
                    </div>

                    {filtered.length !== FULL_RELEASES.length && (
                        <button
                            onClick={() => {
                                setFilter('All');
                                setSearchQuery('');
                                setSelectedGenres([]);
                                setSelectedArtists([]);
                                setYearRange([2016, 2024]);
                                setSortBy('newest');
                            }}
                            className="text-[var(--accent)] hover:underline text-sm font-bold"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 border border-dashed border-[var(--text-color)]/10 rounded-3xl">
                        <Disc size={48} className="text-[var(--text-secondary)] opacity-20 mb-4" />
                        <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">No Releases Found</h3>
                        <p className="text-[var(--text-secondary)]">Try adjusting your search or filters.</p>
                        <button
                            onClick={() => { setFilter('All'); setSearchQuery(''); }}
                            className="mt-6 text-[var(--accent)] font-bold text-sm hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filtered.map((release, idx) => (
                            <motion.div
                                key={release.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                layoutId={`release-${release.id}`}
                            >
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <GlassCard
                                        className="h-full flex flex-col group !p-0 overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-[var(--accent)] hover:shadow-2xl hover:shadow-[var(--accent)]/10 transition-all duration-500"
                                        onClick={() => setSelectedRelease(release)}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`View details for ${release.title}`}
                                        onKeyDown={(e) => e.key === 'Enter' && setSelectedRelease(release)}
                                    >
                                    <div className="relative aspect-square overflow-hidden bg-black">
                                        <img
                                            src={release.cover}
                                            alt={release.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                            <span className="px-6 py-3 bg-white text-black rounded-full font-bold uppercase text-xs tracking-wider flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                View Tracks <List size={12} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/30 px-2 py-0.5 rounded-full bg-[var(--accent)]/5">
                                                    {release.type}
                                                </span>
                                                {release.popularity && release.popularity > 70 && (
                                                    <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-500 text-black px-2 py-0.5 rounded-full">
                                                        🔥 Hot
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[10px] text-[var(--text-secondary)] font-mono">{release.date}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-[var(--text-color)] leading-tight mb-1 line-clamp-1">{release.title}</h3>
                                        <p className="text-[var(--text-secondary)] line-clamp-1 mb-2">{release.artist}</p>

                                        {/* Streaming Stats Preview */}
                                        {release.streamingStats?.spotify && (
                                            <div className="mb-3 p-2 bg-black/20 rounded-lg">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-[var(--text-secondary)]">Spotify Streams</span>
                                                    <span className="text-green-400 font-mono font-bold">
                                                        {(release.streamingStats.spotify.streams / 1000000).toFixed(1)}M
                                                    </span>
                                                </div>
                                                <div className="w-full bg-[var(--text-color)]/20 rounded-full h-1 mt-1">
                                                    <div
                                                        className="bg-green-400 h-1 rounded-full"
                                                        style={{ width: `${Math.min((release.streamingStats.spotify.streams / 10000000) * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--text-color)]/5">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                                                    <Music4 size={12} /> {release.totalTracks} Tracks
                                                </span>
                                                {release.genre && release.genre.length > 0 && (
                                                    <span className="text-xs text-[var(--text-secondary)]">
                                                        {release.genre[0]}
                                                    </span>
                                                )}
                                            </div>
                                            {!presaved[release.id] ? (
                                                <button
                                                    onClick={(e) => handlePresave(release.id, e)}
                                                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors p-1"
                                                    title="Pre-Save"
                                                >
                                                    <Heart size={16} />
                                                </button>
                                            ) : (
                                                <span className="text-xs text-green-500 font-bold flex items-center gap-1">
                                                    <Check size={12} /> Saved
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                        </GlassCard>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedRelease && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setSelectedRelease(null)}
                    >
                        <motion.div
                            layoutId={`release-${selectedRelease.id}`}
                            className="w-full max-w-4xl bg-[var(--bg-color)] border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Album Art Side */}
                            <div className="md:w-5/12 bg-black relative aspect-square md:aspect-auto">
                                <img
                                    src={selectedRelease.cover}
                                    alt={selectedRelease.title}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => setSelectedRelease(null)}
                                    className="absolute top-4 left-4 p-2 bg-black/50 text-white rounded-full md:hidden"
                                    title="Close modal"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                                    <h2 className="text-3xl font-black text-white leading-none mb-1">{selectedRelease.title}</h2>
                                    <p className="text-lg text-gray-300">{selectedRelease.artist}</p>
                                </div>
                            </div>

                             {/* Tracks Side */}
                             <div className="flex-1 flex flex-col min-h-0 bg-[var(--card-bg)]">
                                 {/* Streaming Stats */}
                                 {selectedRelease.streamingStats && (
                                     <div className="p-6 border-b border-[var(--text-color)]/10">
                                         <StreamingStats stats={selectedRelease.streamingStats} />
                                     </div>
                                 )}

                                 <div className="p-6 border-b border-[var(--text-color)]/10 flex justify-between items-center bg-[var(--bg-color)]/50 backdrop-blur-md sticky top-0 z-10">
                                     <div className="flex gap-4">
                                         <button
                                             onClick={() => setActivePlayer('spotify')}
                                             className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activePlayer === 'spotify' ? 'bg-[#1DB954] text-black' : 'bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-color)]'}`}
                                         >
                                             Spotify
                                         </button>
                                         <button
                                             onClick={() => setActivePlayer('apple')}
                                             className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activePlayer === 'apple' ? 'bg-[#FC3C44] text-white' : 'bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-color)]'}`}
                                         >
                                             Apple Music
                                         </button>
                                     </div>
                                     <div className="flex items-center gap-2">
                                         {/* Share Button */}
                                         <div className="relative">
                                             <button
                                                 onClick={() => setShowShareOptions(!showShareOptions)}
                                                 className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-color)] transition-colors"
                                                 title="Share"
                                             >
                                                 <Share2 size={20} />
                                             </button>

                                             {/* Share Options Dropdown */}
                                             <AnimatePresence>
                                                 {showShareOptions && (
                                                     <motion.div
                                                         initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                                         animate={{ opacity: 1, scale: 1, y: 0 }}
                                                         exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                                         className="absolute right-0 top-full mt-2 w-48 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-xl z-20"
                                                     >
                                                         <div className="p-2">
                                                             <button
                                                                 onClick={() => handleShare('copy')}
                                                                 className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--text-color)]/5 rounded-lg transition-colors"
                                                             >
                                                                 <Copy size={16} />
                                                                 Copy Link
                                                             </button>
                                                             <button
                                                                 onClick={() => handleShare('twitter')}
                                                                 className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--text-color)]/5 rounded-lg transition-colors"
                                                             >
                                                                 <MessageCircle size={16} />
                                                                 Twitter
                                                             </button>
                                                             <button
                                                                 onClick={() => handleShare('facebook')}
                                                                 className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--text-color)]/5 rounded-lg transition-colors"
                                                             >
                                                                 <Share2 size={16} />
                                                                 Facebook
                                                             </button>
                                                         </div>
                                                     </motion.div>
                                                 )}
                                             </AnimatePresence>
                                         </div>

                                         <button onClick={() => setSelectedRelease(null)} className="hidden md:block p-2 text-[var(--text-secondary)] hover:text-[var(--text-color)]" title="Close modal">
                                             <X size={24} />
                                         </button>
                                     </div>
                                 </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20">
                                    {activePlayer === 'spotify' ? (
                                        <iframe
                                            src={`https://open.spotify.com/embed/album/${selectedRelease.spotifyId}?utm_source=generator&theme=0`}
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                            className="min-h-[400px]"
                                            title="Spotify Music Player"
                                        />
                                    ) : activePlayer === 'apple' ? (
                                        <iframe
                                            src={`https://embed.music.apple.com/za/album/${selectedRelease.appleId}`}
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                                            className="min-h-[400px]"
                                            title="Apple Music Player"
                                        />
                                    ) : (
                                        <div className="p-6 space-y-2">
                                            {selectedRelease.tracks.map((track, i) => (
                                                <div
                                                    key={i}
                                                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-[var(--text-color)]/5 transition-colors cursor-pointer"
                                                    onClick={() => handlePlayPreview(track.title)}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--text-color)]/5 text-[var(--text-secondary)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors text-xs font-mono">
                                                            {playingTrack === track.title ? (
                                                                <div className="flex gap-0.5 items-end h-3">
                                                                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-current" />
                                                                    <motion.div animate={{ height: [8, 4, 10] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-current" />
                                                                    <motion.div animate={{ height: [5, 9, 6] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-current" />
                                                                </div>
                                                            ) : (
                                                                i + 1
                                                            )}
                                                        </div>
                                                        <span className={`text-sm font-bold ${playingTrack === track.title ? 'text-[var(--accent)]' : 'text-[var(--text-color)]'}`}>
                                                            {track.title}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-[var(--text-secondary)] font-mono">{track.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 border-t border-[var(--text-color)]/10 bg-[var(--bg-color)]/50 backdrop-blur-md">
                                    <div className="flex gap-4">
                                        <a
                                            href={selectedRelease.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-4 rounded-xl bg-[var(--text-color)] text-[var(--bg-color)] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                        >
                                            Full Experience <ExternalLink size={16} />
                                        </a>
                                        {!presaved[selectedRelease.id] && (
                                            <button
                                                onClick={(e) => handlePresave(selectedRelease.id, e)}
                                                className="px-6 py-4 rounded-xl border border-[var(--text-color)]/20 text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-colors"
                                                title="Pre-save release"
                                            >
                                                <Heart size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};