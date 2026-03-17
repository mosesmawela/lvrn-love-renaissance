import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ARTISTS } from '../constants';
import { SearchX, Search, ArrowDownUp, Clock } from 'lucide-react';
import { Artist } from '../types';
import { useExperience } from './ExperienceProvider';
import { Artist3DCarousel } from './Artist3DCarousel';

interface RosterProps {
    onViewProfile: (artist: Artist) => void;
}

const HISTORY_KEY = 'lvrn_artist_history';

// Helper to generate consistent gradients based on name
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

// Smart Sort Helper
const parseMetric = (val?: string) => {
    if (!val) return 0;
    const num = parseFloat(val.replace(/[^0-9.]/g, ''));
    const multiplier = val.toUpperCase().includes('B') ? 1000000000 :
        val.toUpperCase().includes('M') ? 1000000 :
            val.toUpperCase().includes('K') ? 1000 : 1;
    return num * multiplier;
};

export const Roster: React.FC<RosterProps> = ({ onViewProfile }) => {
    type FilterCategory = 'All' | 'Signed' | 'Management' | 'Publishing' | 'Africa';
    const [filter, setFilter] = useState<FilterCategory>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortType, setSortType] = useState<'Default' | 'Name' | 'Popularity'>('Default');
    const [recentArtists, setRecentArtists] = useState<Artist[]>([]);

    const searchInputRef = useRef<HTMLInputElement>(null);

    // Experience Hooks
    const { setAiContext, trackEvent, showNotification } = useExperience();

    // Load History
    useEffect(() => {
        try {
            const stored = localStorage.getItem(HISTORY_KEY);
            if (stored) {
                const names = JSON.parse(stored) as string[];
                const artists = names.map(n => ARTISTS.find(a => a.name === n)).filter(Boolean) as Artist[];
                setRecentArtists(artists);
            }
        } catch (e) { console.error("History Load Error", e); }
    }, []);

    // Listen for Global Search Shortcut
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
                showNotification("Search Focus", "info");
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    const filteredArtists = useMemo(() => {
        let result = filter === 'All'
            ? ARTISTS
            : ARTISTS.filter(a => a.category === filter);

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(a =>
                a.name.toLowerCase().includes(q) ||
                a.role?.toLowerCase().includes(q)
            );
        }

        // Apply Sorting
        if (sortType === 'Name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === 'Popularity') {
            // Sort by streams (highest first)
            result.sort((a, b) => parseMetric(b.stats?.streams) - parseMetric(a.stats?.streams));
        }

        return result;
    }, [filter, searchQuery, sortType]);

    const categories: FilterCategory[] = ['All', 'Signed', 'Management', 'Publishing', 'Africa'];

    const handleArtistClick = (artist: Artist) => {
        // Update History
        const newHistory = [artist.name, ...recentArtists.map(r => r.name).filter(n => n !== artist.name)].slice(0, 5);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
        setRecentArtists(newHistory.map(n => ARTISTS.find(a => a.name === n)).filter(Boolean) as Artist[]);

        trackEvent('artist_view', { artist: artist.name });
        setAiContext({
            type: 'artist_view',
            data: { name: artist.name, bio: artist.bio }
        });

        onViewProfile(artist);
    };

    return (
        <div className="space-y-8 relative">
            {/* Tools & Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 relative z-50">
                <div className="flex gap-2 bg-[var(--card-bg)] p-1 rounded-full border border-[var(--card-border)] overflow-x-auto max-w-full custom-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setFilter(cat); trackEvent('filter_change', { category: cat }); }}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${filter === cat
                                ? 'bg-[var(--text-color)] text-[var(--bg-color)]'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-color)]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors" size={14} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search (Cmd+K)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full py-2 pl-9 pr-4 text-xs text-[var(--text-color)] focus:outline-none focus:border-[var(--accent)] transition-all"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative group/sort">
                        <button className="p-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-color)] hover:border-[var(--accent)] transition-all">
                            <ArrowDownUp size={16} />
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-32 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shadow-xl p-1 opacity-0 invisible group-hover/sort:opacity-100 group-hover/sort:visible transition-all transform origin-top-right backdrop-blur-md">
                            <button onClick={() => setSortType('Default')} className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[var(--text-color)]/10 ${sortType === 'Default' ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-secondary)]'}`}>Default</button>
                            <button onClick={() => setSortType('Name')} className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[var(--text-color)]/10 ${sortType === 'Name' ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-secondary)]'}`}>Name (A-Z)</button>
                            <button onClick={() => setSortType('Popularity')} className={`w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[var(--text-color)]/10 ${sortType === 'Popularity' ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-secondary)]'}`}>Popularity</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3D Carousel Stage */}
            {filteredArtists.length > 0 ? (
                <Artist3DCarousel
                    artists={filteredArtists}
                    onSelect={handleArtistClick}
                />
            ) : (
                <div className="h-[400px] flex flex-col items-center justify-center text-[var(--text-secondary)]">
                    <SearchX size={48} className="mb-4 opacity-50" />
                    <p>No artists found.</p>
                    <button
                        onClick={() => { setFilter('All'); setSearchQuery(''); }}
                        className="mt-4 text-[var(--accent)] text-sm font-bold uppercase underline"
                    >
                        Reset Filter
                    </button>
                </div>
            )}

            {/* Recently Viewed */}
            {recentArtists.length > 0 && !searchQuery && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 pt-8 border-t border-[var(--card-border)]"
                >
                    <div className="flex items-center gap-2 mb-4 text-[var(--text-secondary)]">
                        <Clock size={14} />
                        <span className="text-xs font-bold uppercase tracking-wider">Recently Viewed</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                        {recentArtists.map(artist => (
                            <button
                                key={artist.name}
                                onClick={() => handleArtistClick(artist)}
                                className="flex-shrink-0 w-32 group"
                            >
                                <div className="w-32 h-32 rounded-lg overflow-hidden mb-2 border border-[var(--card-border)]">
                                    <img
                                        src={artist.image || `assets/images/${artist.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`}
                                        alt={artist.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', getGradient(artist.name).split(' ')[0], 'to-black');
                                        }}
                                    />
                                </div>
                                <p className="text-xs font-bold text-[var(--text-color)] truncate">{artist.name}</p>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};