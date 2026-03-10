import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Clock, Eye, AlertCircle, Loader2, Filter, Youtube } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useExperience } from './ExperienceProvider';
import { musicDataService, UnifiedVideo } from '../src/services/music-data-service';

export const MusicVideos: React.FC = () => {
    const { showNotification } = useExperience();
    const [videos, setVideos] = useState<UnifiedVideo[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<UnifiedVideo | null>(null);
    const [filterArtist, setFilterArtist] = useState<string>('All');
    const [loading, setLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        const fetchAllVideos = async () => {
            setLoading(true);
            try {
                // Fetch videos for major artists or a general list
                // In a real app, this might be a single 'getFeaturedVideos' call
                const artistList = ['6LACK', 'Summer Walker', 'Odeal', 'Santi', 'SPINALL'];
                const videoPromises = artistList.map(name => musicDataService.getArtistVideos(name));
                const results = await Promise.all(videoPromises);
                const allVideos = results.flat();
                setVideos(allVideos);
            } catch {
            } finally {
                setLoading(false);
            }
        };

        fetchAllVideos();
    }, []);

    // Extract unique artists for filter
    const artists = useMemo(() => {
        const unique = Array.from(new Set(videos.map(v => v.artist.split(' ')[0])));
        return ['All', ...unique];
    }, [videos]);

    const filteredVideos = useMemo(() => {
        return filterArtist === 'All'
            ? videos
            : videos.filter(v => v.artist.includes(filterArtist));
    }, [videos, filterArtist]);

    useEffect(() => {
        if (selectedVideo) {
            setVideoLoading(true);
            setVideoError(false);
        }
    }, [selectedVideo]);

    // Keyboard Close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedVideo) setSelectedVideo(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [selectedVideo]);

    const featuredVideo = videos[0];

    return (
        <div className="min-h-screen py-12 relative">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-[var(--text-color)] tracking-tighter mb-4">
                            Visuals
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
                            Cinematic experiences from the LVRN roster.
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-2">
                        <Filter size={16} className="text-[var(--text-secondary)] shrink-0" />
                        {artists.map(artist => (
                            <button
                                key={artist}
                                onClick={() => setFilterArtist(artist)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${filterArtist === artist
                                    ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                                    : 'bg-transparent border-[var(--card-border)] text-[var(--text-secondary)] hover:border-[var(--text-color)]'
                                    }`}
                            >
                                {artist}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-[var(--text-muted)]">
                        <Loader2 className="animate-spin text-[var(--accent)] mb-4" size={48} />
                        <p className="font-bold uppercase tracking-widest">Compiling Visuals...</p>
                    </div>
                ) : filteredVideos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-[var(--text-secondary)]">
                        <AlertCircle size={48} className="opacity-20 mb-4" />
                        <p className="font-bold">No videos found for this filter.</p>
                        <button
                            onClick={() => setFilterArtist('All')}
                            className="mt-4 text-[var(--accent)] text-sm underline"
                        >
                            View All Videos
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Featured (Only if 'All' or if it matches filter) and we have videos */}
                        {featuredVideo && (filterArtist === 'All' || featuredVideo.artist.includes(filterArtist)) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-video w-full rounded-3xl overflow-hidden group cursor-pointer mb-12 border border-[var(--card-border)] shadow-2xl"
                                onClick={() => setSelectedVideo(featuredVideo)}
                            >
                                <img
                                    src={featuredVideo.thumbnail}
                                    alt={featuredVideo.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                        <Play size={40} className="text-white fill-white ml-2" />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                                    <div className="inline-block px-3 py-1 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                                        Latest Premiere
                                    </div>
                                    <h2 className="text-3xl md:text-6xl font-black text-white mb-2 leading-none line-clamp-2">{featuredVideo.title}</h2>
                                    <p className="text-xl md:text-2xl text-gray-300 font-light">{featuredVideo.artist}</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.filter(v => featuredVideo ? v.id !== featuredVideo.id || filterArtist !== 'All' : true).map((video, idx) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <GlassCard
                                        className="group cursor-pointer !p-0 overflow-hidden h-full flex flex-col focus-within:ring-2 focus-within:ring-[var(--accent)]"
                                        onClick={() => setSelectedVideo(video)}
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && setSelectedVideo(video)}
                                    >
                                        <div className="relative aspect-video overflow-hidden bg-black">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                                    <Play size={20} className="text-white fill-white ml-1" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-[10px] font-bold text-white flex items-center gap-1">
                                                <Clock size={10} /> {video.duration || '4:00'}
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-[var(--text-color)] line-clamp-1 mb-1">{video.title}</h3>
                                                <p className="text-[var(--text-secondary)] text-sm line-clamp-1">{video.artist}</p>
                                            </div>
                                            <div className="flex items-center gap-4 mt-4 text-xs text-[var(--text-muted)] font-mono border-t border-[var(--text-color)]/10 pt-3">
                                                <span className="flex items-center gap-1"><Eye size={12} /> {video.views || '1.2M'}</span>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <div className="w-full max-w-6xl relative" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest focus:outline-none focus:text-[var(--accent)]"
                                aria-label="Close video"
                                title="Close video"
                            >
                                Close <X size={20} />
                            </button>

                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black relative">
                                {videoLoading && !videoError && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                                        <div className="text-center">
                                            <Loader2 size={40} className="text-[var(--accent)] animate-spin mx-auto mb-2" />
                                            <p className="text-xs font-mono text-gray-500 uppercase">Loading Stream...</p>
                                        </div>
                                    </div>
                                )}

                                {videoError ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                                        <div className="text-center text-red-400">
                                            <AlertCircle size={40} className="mx-auto mb-2" />
                                            <p className="font-bold">Playback Error</p>
                                            <p className="text-sm opacity-80">Video unavailable.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <iframe
                                        src={`${selectedVideo.embedUrl}?autoplay=1`}
                                        title={`Video: ${selectedVideo.title}`}
                                        className="w-full h-full relative z-10"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        onLoad={() => setVideoLoading(false)}
                                        onError={() => setVideoError(true)}
                                    />
                                )}
                            </div>

                            <div className="mt-6 flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black text-white mb-1">{selectedVideo.title}</h2>
                                    <p className="text-xl text-gray-400">{selectedVideo.artist}</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => showNotification("Added to Library", "success")}
                                        className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold uppercase text-xs text-white transition-colors"
                                        title="Save Video"
                                        aria-label="Save Video"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};