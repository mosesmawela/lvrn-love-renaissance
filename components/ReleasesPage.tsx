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
            const shareUrl = platform === 'twitter'
                ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
                : platform === 'facebook'
                ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
                : url;

            window.open(shareUrl, '_blank');
        }
        setShowShareOptions(false);
    };

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

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.artist.toLowerCase().includes(q) ||
                r.description?.toLowerCase().includes(q) ||
                r.genre?.some(g => g.toLowerCase().includes(q))
            );
        }

        if (selectedGenres.length > 0) {
            data = data.filter(r =>
                r.genre?.some(g => selectedGenres.includes(g))
            );
        }

        if (selectedArtists.length > 0) {
            data = data.filter(r => selectedArtists.includes(r.artist));
        }

        data = data.filter(r => {
            const year = parseInt(r.date);
            return year >= yearRange[0] && year <= yearRange[1];
        });

        data.sort((a, b) => {
            switch (sortBy) {
                case 'oldest': return parseInt(a.date) - parseInt(b.date);
                case 'popularity': return (b.popularity || 0) - (a.popularity || 0);
                case 'title': return a.title.localeCompare(b.title);
                case 'newest':
                default: return parseInt(b.date) - parseInt(a.date);
            }
        });

        return data;
    }, [filter, searchQuery, selectedGenres, selectedArtists, yearRange, sortBy]);

    return (
        <div className="min-h-screen py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative mb-16">
                    <div className="text-center lg:text-left">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-full text-[var(--accent)] text-sm font-bold uppercase tracking-wider mb-6">
                            <Disc size={16} /> Complete Collection
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-color)] tracking-tighter mb-6 leading-none">
                            DISCOGRAPHY
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                            The complete sonic history of Love Renaissance. explore our musical journey across genres and eras.
                        </motion.p>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                    <div className="w-full lg:w-auto">
                        <div className="relative max-w-md group mb-4">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" size={18} />
                            <input type="text" placeholder="Search albums, singles, or artists..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-color)] focus:outline-none focus:border-[var(--accent)] transition-all" />
                        </div>
                        <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${showAdvancedFilters ? 'bg-[var(--accent)] text-white' : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-color)]'}`}>
                            <SlidersHorizontal size={16} /> Advanced Filters
                        </button>
                    </div>

                    <div className="flex gap-2 p-1 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] overflow-x-auto max-w-full">
                        {['All', 'Album', 'EP', 'Single'].map(type => (
                            <button key={type} onClick={() => setFilter(type)} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filter === type ? 'bg-[var(--text-color)] text-[var(--bg-color)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-color)]'}`}>
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {showAdvancedFilters && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 overflow-hidden mb-8">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[var(--text-color)] mb-3 uppercase tracking-wider">Genres</label>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {availableGenres.map(genre => (
                                            <label key={genre} className="flex items-center gap-2 cursor-pointer hover:bg-[var(--text-color)]/5 p-1 rounded">
                                                <input type="checkbox" checked={selectedGenres.includes(genre)} onChange={(e) => e.target.checked ? setSelectedGenres(prev => [...prev, genre]) : setSelectedGenres(prev => prev.filter(g => g !== genre))} className="rounded border-[var(--card-border)] text-[var(--accent)] focus:ring-[var(--accent)]" />
                                                <span className="text-sm text-[var(--text-secondary)]">{genre}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[var(--text-color)] mb-3 uppercase tracking-wider">Artists</label>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {availableArtists.map(artist => (
                                            <label key={artist} className="flex items-center gap-2 cursor-pointer hover:bg-[var(--text-color)]/5 p-1 rounded">
                                                <input type="checkbox" checked={selectedArtists.includes(artist)} onChange={(e) => e.target.checked ? setSelectedArtists(prev => [...prev, artist]) : setSelectedArtists(prev => prev.filter(a => a !== artist))} className="rounded border-[var(--card-border)] text-[var(--accent)] focus:ring-[var(--accent)]" />
                                                <span className="text-sm text-[var(--text-secondary)]">{artist}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[var(--text-color)] mb-3 uppercase tracking-wider">Year Range</label>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs text-[var(--text-secondary)]">From: {yearRange[0]}</label>
                                            <input type="range" min="2016" max="2024" value={yearRange[0]} onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])} className="w-full accent-[var(--accent)]" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-[var(--text-secondary)]">To: {yearRange[1]}</label>
                                            <input type="range" min="2016" max="2024" value={yearRange[1]} onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])} className="w-full accent-[var(--accent)]" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[var(--text-color)] mb-3 uppercase tracking-wider">Sort By</label>
                                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="w-full p-2 rounded-lg bg-[var(--bg-color)] border border-[var(--card-border)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="popularity">Most Popular</option>
                                        <option value="title">Title A-Z</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 border border-dashed border-[var(--text-color)]/10 rounded-3xl">
                        <Disc size={48} className="text-[var(--text-secondary)] opacity-20 mb-4" />
                        <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">No Releases Found</h3>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filtered.map((release) => (
                            <motion.div key={release.id} layoutId={`release-${release.id}`}>
                                <GlassCard className="h-full flex flex-col group !p-0 overflow-hidden cursor-pointer" onClick={() => setSelectedRelease(release)}>
                                    <div className="relative aspect-square overflow-hidden bg-black">
                                        <img src={release.cover} alt={release.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-[var(--text-color)] mb-1">{release.title}</h3>
                                        <p className="text-[var(--text-secondary)] mb-4">{release.artist}</p>
                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--text-color)]/5">
                                            <span className="text-xs text-[var(--text-muted)]">{release.totalTracks} Tracks</span>
                                            {!presaved[release.id] ? (
                                                <button onClick={(e) => handlePresave(release.id, e)} className="text-[var(--text-secondary)] hover:text-[var(--accent)] p-1"><Heart size={16} /></button>
                                            ) : (
                                                <span className="text-xs text-green-500 font-bold">Saved</span>
                                            )}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedRelease && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedRelease(null)}>
                        <motion.div layoutId={`release-${selectedRelease.id}`} className="w-full max-w-4xl bg-[var(--bg-color)] border border-[var(--card-border)] rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]" onClick={e => e.stopPropagation()}>
                            <div className="md:w-5/12 bg-black relative">
                                <img src={selectedRelease.cover} alt={selectedRelease.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
                                    <h2 className="text-3xl font-black mb-1">{selectedRelease.title}</h2>
                                    <p className="text-lg opacity-80">{selectedRelease.artist}</p>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col min-h-0 bg-[var(--card-bg)]">
                                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <button onClick={() => setActivePlayer('spotify')} className={`px-4 py-1 rounded-full text-xs font-bold ${activePlayer === 'spotify' ? 'bg-[#1DB954] text-black' : 'bg-white/5 text-white'}`}>Spotify</button>
                                        <button onClick={() => setActivePlayer('apple')} className={`px-4 py-1 rounded-full text-xs font-bold ${activePlayer === 'apple' ? 'bg-[#FC3C44] text-white' : 'bg-white/5 text-white'}`}>Apple</button>
                                    </div>
                                    <button onClick={() => setSelectedRelease(null)} className="text-white opacity-50 hover:opacity-100"><X size={24} /></button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6">
                                    {activePlayer === 'spotify' ? (
                                        <iframe src={`https://open.spotify.com/embed/album/${selectedRelease.spotifyId}`} width="100%" height="380" frameBorder="0" allow="encrypted-media" />
                                    ) : activePlayer === 'apple' ? (
                                        <iframe src={`https://embed.music.apple.com/za/album/${selectedRelease.appleId}`} width="100%" height="450" frameBorder="0" allow="encrypted-media" />
                                    ) : (
                                        <div className="space-y-2">
                                            {selectedRelease.tracks.map((track, i) => (
                                                <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 text-white group cursor-pointer" onClick={() => handlePlayPreview(track.title)}>
                                                    <span className={playingTrack === track.title ? 'text-[var(--accent)]' : ''}>{i + 1}. {track.title}</span>
                                                    <span className="text-xs opacity-50">{track.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 border-t border-white/5">
                                    <a href={selectedRelease.link} target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl bg-white text-black font-bold text-center hover:opacity-90">Full Experience</a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};