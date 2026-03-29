import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Plus, Check, Volume2, VolumeX, Search, X } from 'lucide-react';
import { VideoItem, VIDEOS, ARTISTS } from '../constants';
import { useExperience } from './ExperienceProvider';
import { VideoRow } from './VideoRow';
import { NetflixPlayer } from './NetflixPlayer';
import { Logo } from './Logo';

interface MusicVideosProps {
    onNavigate?: (pageId: string) => void;
}

export const MusicVideos: React.FC<MusicVideosProps> = ({ onNavigate }) => {
    const { showNotification } = useExperience();
    const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [myList, setMyList] = useState<string[]>([]);
    const [watchHistory, setWatchHistory] = useState<string[]>([]);
    const [filterArtist, setFilterArtist] = useState('All');
    const [isScrolled, setIsScrolled] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    // Persistance
    useEffect(() => {
        const savedList = localStorage.getItem('lvrn_my_list');
        const savedHistory = localStorage.getItem('lvrn_watch_history');
        if (savedList) setMyList(JSON.parse(savedList));
        if (savedHistory) setWatchHistory(JSON.parse(savedHistory));

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Simulate initial load
        const timer = setTimeout(() => setIsLoading(false), 1000);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const toggleList = useCallback((video: VideoItem) => {
        setMyList(prev => {
            const newList = prev.includes(video.id) 
                ? prev.filter(id => id !== video.id) 
                : [video.id, ...prev];
            localStorage.setItem('lvrn_my_list', JSON.stringify(newList));
            showNotification(prev.includes(video.id) ? 'Removed from My List' : 'Added to My List', 'info');
            return newList;
        });
    }, [showNotification]);

    const handleVideoSelect = useCallback((video: VideoItem) => {
        setSelectedVideo(video);
        setWatchHistory(prev => {
            const newHistory = [video.id, ...prev.filter(id => id !== video.id)].slice(0, 10);
            localStorage.setItem('lvrn_watch_history', JSON.stringify(newHistory));
            return newHistory;
        });
    }, []);

    const [filterCategory, setFilterCategory] = useState<string | null>(null);

    // Filtered Content
    const featuredVideo = useMemo(() => VIDEOS[0], []);
    
    const interviewVideos = useMemo(() => 
        VIDEOS.filter(v => v.category === 'Interview'),
    []);

    const myListVideos = useMemo(() => 
        VIDEOS.filter(v => myList.includes(v.id)), 
    [myList]);

    const continueWatchingVideos = useMemo(() => 
        VIDEOS.filter(v => watchHistory.includes(v.id)), 
    [watchHistory]);

    const trendingVideos = useMemo(() => 
        [...VIDEOS].sort(() => 0.5 - Math.random()), 
    []);

    const filteredVideos = useMemo(() => {
        if (!filterCategory) return VIDEOS;
        return VIDEOS.filter(v => v.category === filterCategory);
    }, [filterCategory]);

    const artistRows = useMemo(() => {
        const videosToUse = filterCategory ? filteredVideos : VIDEOS;
        const artists = Array.from(new Set(videosToUse.map(v => v.artist.split(/,|&/)[0].trim())));
        return artists.map(artist => ({
            name: artist,
            videos: videosToUse.filter(v => v.artist.includes(artist))
        }));
    }, [filterCategory, filteredVideos]);

    const searchResults = useMemo(() => {
        if (!searchQuery) return [];
        return VIDEOS.filter(v => 
            v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                >
                    <Logo className="h-12 w-auto brightness-0 invert" />
                    <span className="text-4xl font-black text-white tracking-tighter">TV</span>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] text-white selection:bg-[var(--accent)]/30">
            {/* Transparent Header */}
            <div className={`fixed top-0 w-full z-[100] transition-colors duration-500 px-6 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
                <div className="flex items-center gap-8">
                    <div 
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => onNavigate?.('home')}
                    >
                        <Logo className="h-8 w-auto brightness-0 invert group-hover:scale-105 transition-transform" />
                        <span className="text-2xl font-black tracking-tighter text-white">TV</span>
                    </div>
                    <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-300">
                        <button onClick={() => { setFilterArtist('All'); setFilterCategory(null); }} className={`hover:text-white transition-colors ${filterArtist === 'All' && !filterCategory ? 'text-white font-bold' : ''}`}>Home</button>
                        <button onClick={() => setFilterCategory('Music Video')} className={`hover:text-white transition-colors ${filterCategory === 'Music Video' ? 'text-white font-bold' : ''}`}>Music Videos</button>
                        <button onClick={() => setFilterCategory('Interview')} className={`hover:text-white transition-colors ${filterCategory === 'Interview' ? 'text-white font-bold' : ''}`}>Interviews</button>
                        <button onClick={() => setFilterCategory('Behind The Scenes')} className={`hover:text-white transition-colors ${filterCategory === 'Behind The Scenes' ? 'text-white font-bold' : ''}`}>Behind The Scenes</button>
                        <button className="hover:text-white transition-colors">My List</button>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative flex items-center bg-black/40 border border-white/20 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-[var(--accent)] transition-all">
                        <Search size={18} className="text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none text-white text-sm focus:outline-none ml-2 w-24 md:w-48 transition-all"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="ml-2 text-gray-400 hover:text-white">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => onNavigate?.('home')}
                        className="text-xs font-bold uppercase tracking-widest border border-white/20 px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
                    >
                        Exit
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {searchQuery ? (
                <div className="pt-32 px-6 md:px-12 pb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Results for "{searchQuery}"</h2>
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                            {searchResults.map(video => (
                                <motion.div 
                                    key={video.id} 
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="aspect-video relative group cursor-pointer rounded-lg overflow-hidden border border-white/5" 
                                    onClick={() => handleVideoSelect(video)}
                                >
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <h4 className="font-bold text-sm line-clamp-1">{video.title}</h4>
                                        <p className="text-xs text-gray-300">{video.artist}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-gray-400">No videos found matching your search.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative">
                    {/* Hero Section */}
                    <div className="relative h-[85vh] md:h-[100vh] w-full overflow-hidden">
                        {/* Hero Video / Thumbnail */}
                        <div className="absolute inset-0 w-full h-full">
                            <iframe
                                src={`${featuredVideo.embedUrl}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1&loop=1&playlist=${featuredVideo.embedUrl.split('/').pop()}`}
                                className="w-[140%] h-[140%] -translate-x-[15%] -translate-y-[15%] pointer-events-none"
                                allow="autoplay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/20 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20" />
                        </div>

                        {/* Hero Content */}
                        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 pt-20 max-w-2xl z-20">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">LVRN Premiere</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none tracking-tight">
                                    {featuredVideo.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-300 font-medium mb-8 line-clamp-3 md:line-clamp-none max-w-xl">
                                    Experience the latest visual masterpiece from {featuredVideo.artist}. Directed by the LVRN creative team in Atlanta.
                                </p>

                                <div className="flex flex-wrap items-center gap-4">
                                    <button 
                                        onClick={() => handleVideoSelect(featuredVideo)}
                                        className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-md font-bold text-lg hover:bg-white/80 transition-colors"
                                    >
                                        <Play fill="black" size={24} /> Play
                                    </button>
                                    <button className="flex items-center gap-3 px-8 py-3 bg-white/20 backdrop-blur-md text-white rounded-md font-bold text-lg hover:bg-white/10 transition-colors border border-white/10">
                                        <Info size={24} /> More Info
                                    </button>
                                    
                                    <button 
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                                    >
                                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Rating/Feature Tag */}
                        <div className="absolute right-0 bottom-[20%] z-20 flex items-center gap-0">
                            <div className="bg-black/40 backdrop-blur-md border-l-4 border-white/40 py-2 pl-4 pr-12 text-sm font-medium">
                                Visual Excellence
                            </div>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="relative z-30 -mt-32 md:-mt-48 space-y-8 pb-20">
                        {myListVideos.length > 0 && (
                            <VideoRow 
                                title="My List" 
                                videos={myListVideos} 
                                onSelect={handleVideoSelect}
                                isMuted={isMuted}
                                onToggleMute={() => setIsMuted(!isMuted)}
                                myList={myList}
                                onToggleList={toggleList}
                            />
                        )}

                        {interviewVideos.length > 0 && !filterCategory && (
                            <VideoRow 
                                title="LVRN TV Interviews" 
                                videos={interviewVideos} 
                                onSelect={handleVideoSelect}
                                isMuted={isMuted}
                                onToggleMute={() => setIsMuted(!isMuted)}
                                myList={myList}
                                onToggleList={toggleList}
                            />
                        )}

                        {continueWatchingVideos.length > 0 && (
                            <VideoRow 
                                title="Continue Watching" 
                                videos={continueWatchingVideos} 
                                onSelect={handleVideoSelect}
                                isMuted={isMuted}
                                onToggleMute={() => setIsMuted(!isMuted)}
                                myList={myList}
                                onToggleList={toggleList}
                            />
                        )}

                        {!filterCategory && (
                            <VideoRow 
                                title="Trending Now" 
                                videos={trendingVideos} 
                                onSelect={handleVideoSelect}
                                isMuted={isMuted}
                                onToggleMute={() => setIsMuted(!isMuted)}
                                myList={myList}
                                onToggleList={toggleList}
                            />
                        )}

                        {artistRows.map(row => (
                            <VideoRow 
                                key={row.name}
                                title={row.name} 
                                videos={row.videos} 
                                onSelect={handleVideoSelect}
                                isMuted={isMuted}
                                onToggleMute={() => setIsMuted(!isMuted)}
                                myList={myList}
                                onToggleList={toggleList}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Video Player Overlay */}
            <AnimatePresence>
                {selectedVideo && (
                    <NetflixPlayer 
                        video={selectedVideo} 
                        onClose={() => setSelectedVideo(null)} 
                        onNext={() => {
                            const currentIndex = VIDEOS.findIndex(v => v.id === selectedVideo.id);
                            const nextIndex = (currentIndex + 1) % VIDEOS.length;
                            handleVideoSelect(VIDEOS[nextIndex]);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Footer with Netflix style */}
            <footer className="pt-20 pb-10 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/10 text-gray-500 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    <ul className="space-y-3">
                        <li className="hover:underline cursor-pointer">Audio Description</li>
                        <li className="hover:underline cursor-pointer">Help Center</li>
                        <li className="hover:underline cursor-pointer">Gift Cards</li>
                        <li className="hover:underline cursor-pointer">Media Center</li>
                    </ul>
                    <ul className="space-y-3">
                        <li className="hover:underline cursor-pointer">Investor Relations</li>
                        <li className="hover:underline cursor-pointer">Jobs</li>
                        <li className="hover:underline cursor-pointer">Terms of Use</li>
                        <li className="hover:underline cursor-pointer">Privacy</li>
                    </ul>
                    <ul className="space-y-3">
                        <li className="hover:underline cursor-pointer">Legal Notices</li>
                        <li className="hover:underline cursor-pointer">Cookie Preferences</li>
                        <li className="hover:underline cursor-pointer">Corporate Information</li>
                        <li className="hover:underline cursor-pointer">Contact Us</li>
                    </ul>
                    <div>
                        <button className="border border-gray-500 px-2 py-1 hover:text-white hover:border-white transition-colors">
                            Service Code
                        </button>
                    </div>
                </div>
                <p>© 1997-{new Date().getFullYear()} Love Renaissance, Inc.</p>
            </footer>
        </div>
    );
};
