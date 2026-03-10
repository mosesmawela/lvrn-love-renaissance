import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Heart, ExternalLink, ArrowRight, Check, Search, List, Play, X, Music4 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useExperience } from './ExperienceProvider';

// Enhanced Mock Data
// Legit Release Data
const FULL_RELEASES = [
    {
        id: 1,
        artist: "Summer Walker",
        title: "Still Over It",
        type: "Album",
        date: "2021",
        cover: "https://ik.imagekit.io/mosesmawela/Summer-Walker.jpg",
        link: "https://music.apple.com/za/album/still-over-it/1592652174",
        spotifyId: "1Ba4tVkFViKy6KmRyd9adZ",
        appleId: "1592652174",
        tracks: [
            { title: "Bitter (feat. Cardi B)", duration: "2:52" },
            { title: "Ex For A Reason", duration: "3:45" },
            { title: "No Love (feat. SZA)", duration: "3:51" },
            { title: "Throw It Away", duration: "2:31" },
            { title: "Reciprocate", duration: "3:02" }
        ],
        totalTracks: 20
    },
    {
        id: 2,
        artist: "6LACK",
        title: "East Atlanta Love Letter",
        type: "Album",
        date: "2018",
        cover: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/6lack",
        link: "https://music.apple.com/za/album/east-atlanta-love-letter/1435201630",
        spotifyId: "42IozonD99Uf6i2D6v567v",
        appleId: "1435201630",
        tracks: [
            { title: "Unfair", duration: "3:01" },
            { title: "Loaded Gun", duration: "3:18" },
            { title: "East Atlanta Love Letter", duration: "4:06" }
        ],
        totalTracks: 14
    },
    {
        id: 3,
        artist: "CIZA",
        title: "Golden Boy Pack",
        type: "EP",
        date: "2023",
        cover: "https://ik.imagekit.io/mosesmawela/Artist%20Roster/Ciza",
        link: "https://music.apple.com/za/album/golden-boy-pack/1585641561",
        spotifyId: "29nC0u1p1zM8Z3yU4X3Z0u",
        appleId: "1585641561",
        tracks: [
            { title: "Bank Notification", duration: "4:20" },
            { title: "Come Alive", duration: "3:50" },
            { title: "Jiggy", duration: "3:15" }
        ],
        totalTracks: 6
    }
];

export const ReleasesPage: React.FC = () => {
    const { showNotification } = useExperience();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [presaved, setPresaved] = useState<Record<number, boolean>>({});
    const [selectedRelease, setSelectedRelease] = useState<typeof FULL_RELEASES[0] | null>(null);
    const [playingTrack, setPlayingTrack] = useState<string | null>(null);
    const [activePlayer, setActivePlayer] = useState<'spotify' | 'apple' | null>(null);

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

    const filtered = useMemo(() => {
        let data = filter === 'All' ? FULL_RELEASES : FULL_RELEASES.filter(r => r.type === filter);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.artist.toLowerCase().includes(q)
            );
        }
        return data;
    }, [filter, searchQuery]);

    return (
        <div className="min-h-screen py-12 relative">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header & Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full lg:w-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-[var(--text-color)] tracking-tighter mb-4">
                            Discography
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mb-6">
                            The complete sonic history of Love Renaissance.
                        </p>

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
                    </motion.div>

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
                                <GlassCard
                                    className="h-full flex flex-col group !p-0 overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-[var(--accent)]"
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
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/30 px-2 py-0.5 rounded-full bg-[var(--accent)]/5">
                                                {release.type}
                                            </span>
                                            <span className="text-[10px] text-[var(--text-secondary)] font-mono">{release.date}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-[var(--text-color)] leading-tight mb-1 line-clamp-1">{release.title}</h3>
                                        <p className="text-[var(--text-secondary)] line-clamp-1">{release.artist}</p>

                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--text-color)]/5">
                                            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                                                <Music4 size={12} /> {release.totalTracks} Tracks
                                            </span>
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
                        ))}
                    </div>
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
                                    <button onClick={() => setSelectedRelease(null)} className="hidden md:block p-2 text-[var(--text-secondary)] hover:text-[var(--text-color)]" title="Close modal">
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20">
                                    {activePlayer === 'spotify' ? (
                                        <iframe
                                            src={`https://open.spotify.com/embed/album/${(selectedRelease as any).spotifyId}?utm_source=generator&theme=0`}
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
                                            src={`https://embed.music.apple.com/za/album/${(selectedRelease as any).appleId}`}
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