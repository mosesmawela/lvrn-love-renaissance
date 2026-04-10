import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TourGlobe } from './TourGlobe';
import { TOUR_SCHEDULE, TourDate } from '../constants';
import { MapPin, Calendar, Ticket, ChevronRight, Globe, AlertCircle, CheckCircle2, Navigation, ArrowUpRight, Share2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useExperience } from './ExperienceProvider';

export const TourPage: React.FC = () => {
    const { showNotification } = useExperience();
    const [selectedArtist, setSelectedArtist] = useState<string>('All');
    const [activeLocation, setActiveLocation] = useState<TourDate | null>(null);
    const [mobileView, setMobileView] = useState<'map' | 'list'>('list');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Extract unique artists with memoization
    const artists = useMemo(() => ['All', ...Array.from(new Set(TOUR_SCHEDULE.map(d => d.artist)))], []);

    // Filter dates with memoization, search, and add loading state
    const filteredDates = useMemo(() => {
      // Simulate loading delay for demonstration
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 300);
      
      let dates = selectedArtist === 'All'
          ? TOUR_SCHEDULE
          : TOUR_SCHEDULE.filter(d => d.artist === selectedArtist);
          
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        dates = dates.filter(d => 
          d.city.toLowerCase().includes(query) || 
          d.venue.toLowerCase().includes(query) ||
          d.artist.toLowerCase().includes(query)
        );
      }
      
      return dates;
    }, [selectedArtist, searchQuery]);

    // Keyboard navigation handler
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close active location details
        setActiveLocation(null);
        if (window.innerWidth < 768) {
          setMobileView('list');
        }
      }
      
      // Focus trap for mobile view toggle
      if (e.key === 'Tab' && mobileView === 'map' && window.innerWidth < 768) {
        e.preventDefault();
        // In a real implementation, you would manage focus trapping here
      }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'current': return 'text-yellow-400';
            case 'upcoming': return 'text-orange-400';
            case 'past': return 'text-gray-500';
            case 'announced': return 'text-blue-400';
            default: return 'text-white';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'current': return 'Happening Now';
            case 'upcoming': return 'Upcoming';
            case 'past': return 'Past Event';
            case 'announced': return 'Coming Soon';
            default: return '';
        }
    };

    const handleTicketClick = (date: TourDate, e: React.MouseEvent) => {
        e.preventDefault();
        if (date.status === 'past') {
            showNotification("This event has ended.", "info");
        } else if (date.status === 'announced') {
            showNotification("Tickets coming soon. Joined waitlist.", "success");
        } else {
            // Simulate low stock / sold out logic for demo
            if (Math.random() > 0.8) {
                showNotification("Sold Out! Joined resale waitlist.", "error");
            } else {
                showNotification("Redirecting to Ticketmaster...", "info");
                setTimeout(() => window.open(date.ticketUrl, '_blank'), 1000);
            }
        }
    };

    const handleDirections = (date: TourDate) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${date.coordinates.lat},${date.coordinates.lng}`;
        window.open(url, '_blank');
    };

    return (
        <div 
          className="min-h-screen relative overflow-hidden bg-[var(--bg-color)]"
          onKeyDown={handleKeyDown}
          tabIndex={-1} // Make div focusable to capture key events
        >

             {/* Background UI Elements with subtle animation */}
             <div className="absolute top-24 left-6 z-10 pointer-events-none opacity-20 dark:opacity-10">
                 <motion.h1
                     initial={{ opacity: 0, y: -20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1.2, ease: "easeOut" }}
                     className="text-6xl md:text-8xl font-black text-[var(--text-color)] tracking-tighter uppercase select-none"
                 >
                     Global Tour
                 </motion.h1>
             </div>

            {/* Mobile Toggle with improved accessibility */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex bg-black/80 backdrop-blur-xl rounded-full p-1 border border-white/20 shadow-2xl" role="group" aria-label="Tour view selector">
                <button
                    onClick={() => setMobileView('list')}
                    aria-pressed={mobileView === 'list'}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase transition-all ${mobileView === 'list' ? 'bg-white text-black' : 'text-white'}`}
                >
                    List View
                </button>
                <button
                    onClick={() => setMobileView('map')}
                    aria-pressed={mobileView === 'map'}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase transition-all ${mobileView === 'map' ? 'bg-white text-black' : 'text-white'}`}
                >
                    Map View
                </button>
            </div>

            <div className="relative z-20 h-screen flex flex-col md:flex-row pt-20 md:pt-0">

                {/* Sidebar / HUD */}
                <div className={`w-full md:w-[400px] h-full flex flex-col gap-6 bg-[var(--bg-color)]/95 md:bg-gradient-to-r md:from-[var(--bg-color)] md:to-transparent z-30 transition-transform duration-500 absolute md:relative ${mobileView === 'map' ? 'translate-y-full md:translate-y-0 opacity-0 md:opacity-100' : 'translate-y-0 opacity-100'}`}>
                    <div className="p-6 pb-0 pt-0 md:pt-24 pointer-events-auto">
                                 <motion.div
                                     initial={{ opacity: 0, x: -20 }}
                                     animate={{ opacity: 1, x: 0 }}
                                     transition={{ duration: 0.6, ease: "easeOut" }}
                                 >
                            <h2 className="text-3xl font-black text-[var(--text-color)] mb-1">
                                Tour Dates
                            </h2>
                            <p className="text-[var(--text-secondary)] text-sm mb-6">
                                Official schedule & tickets.
                            </p>
                        </motion.div>

                     {/* Artist Filter with smooth transitions */}
                          <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar mb-4">
                              {artists.map((artist, index) => (
                      <motion.button
                          key={artist}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          onClick={() => setSelectedArtist(artist)}
                          aria-pressed={selectedArtist === artist}
                          aria-label={selectedArtist === artist ? `Show all artists` : `Show ${artist} only`}
                          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${selectedArtist === artist
                                              ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                                              : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border-[var(--card-border)] hover:border-[var(--text-color)]'
                                              }`}
                      >
                          {artist}
                      </motion.button>
                              ))}
                          </div>
                          
                          {/* Search Filter */}
                          <div className="mb-4">
                              <label htmlFor="tour-search" className="block text-[var(--text-secondary)] text-sm font-medium mb-2">
                                  Search Tour Dates
                              </label>
                              <input
                                  id="tour-search"
                                  type="text"
                                  placeholder="Search cities, venues, artists..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="w-full px-4 py-2 rounded-lg bg-[var(--card-bg)] text-[var(--text-color)] border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                                  aria-label="Search tour dates by city, venue, or artist"
                              />
                          </div>
                    </div>
                    
                    {/* Share Button (Desktop) */}
                    <div className="absolute top-6 right-6 md:flex items-center gap-2 z-20">
                        <button
                            onClick={() => {
                                // Use Web Share API if available
                                if (navigator.share) {
                                    navigator.share({
                                        title: 'LVRN Global Tour',
                                        text: 'Check out the LVRN Global Tour dates!',
                                        url: window.location.href
                                    }).catch(() => {
                                        // Fallback to copying to clipboard
                                        navigator.clipboard.writeText(window.location.href);
                                        showNotification("Link copied to clipboard!", "success");
                                    });
                                } else {
                                    // Fallback for browsers without Web Share API
                                    navigator.clipboard.writeText(window.location.href);
                                    showNotification("Link copied to clipboard!", "success");
                                }
                            }}
                            className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 transition-colors text-white"
                            title="Share Tour"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>

                    {/* Date List with skeleton loading */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pointer-events-auto px-6 space-y-3 pb-32 md:pb-20">
                        {isLoading ? (
                            // Skeleton loading states
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <motion.div
                                        key={`skeleton-${i}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <GlassCard className="!p-4">
                                            <div className="h-2 w-32 bg-[var(--text-color)]/20 rounded mb-2"></div>
                                            <h3 className="h-4 w-24 bg-[var(--text-color)]/20 rounded mb-1"></h3>
                                            <div className="flex items-center gap-1 h-6">
                                                <div className="h-2 w-16 bg-[var(--text-color)]/20 rounded"></div>
                                                <div className="h-2 w-20 bg-[var(--text-color)]/20 rounded"></div>
                                            </div>
                                            <p className="h-2 w-20 bg-[var(--text-color)]/20 rounded mt-1"></p>
                                        </GlassCard>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            filteredDates.length === 0 ? (
                                <div className="p-8 rounded-xl border border-dashed border-[var(--card-border)] text-center">
                                    <AlertCircle className="mx-auto mb-2 text-[var(--text-secondary)] opacity-50" />
                                    <p className="text-[var(--text-secondary)] text-sm font-bold">No dates found.</p>
                                    <p className="text-[var(--text-muted)] text-xs mt-1">Check back later for announcements.</p>
                                </div>
                            ) : (
                                filteredDates.map((date, idx) => (
                                    <motion.div
                                        key={date.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <GlassCard
                                            className={`group cursor-pointer !p-4 border-[var(--card-border)] hover:bg-[var(--text-color)]/5 transition-all ${activeLocation?.id === date.id ? 'border-[var(--accent)] bg-[var(--accent)]/5 ring-1 ring-[var(--accent)]' : ''}`}
                                            onClick={() => {
                                                setActiveLocation(date);
                                                if (window.innerWidth < 768) setMobileView('map');
                                            }}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${getStatusColor(date.status)}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${date.status === 'current' ? 'bg-yellow-400 animate-pulse' : 'bg-current'}`} />
                                                    {getStatusLabel(date.status)}
                                                </span>
                                                <span className="text-xs text-[var(--text-secondary)] font-mono flex items-center gap-1">
                                                    <Calendar size={10} /> {date.date}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-[var(--text-color)] leading-tight">{date.city}</h3>
                                            <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm mb-1">
                                                <MapPin size={12} /> {date.venue}
                                            </div>
                                            <p className="text-xs font-bold text-[var(--accent)] mt-1">{date.artist}</p>

                                            {activeLocation?.id === date.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    className="mt-3 pt-3 border-t border-[var(--text-color)]/10 flex gap-2"
                                                >
                                                    <button
                                                        onClick={(e) => handleTicketClick(date, e)}
                                                        disabled={date.status === 'past'}
                                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[var(--text-color)] text-[var(--bg-color)] font-bold uppercase text-[10px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {date.status === 'past' ? 'Event Ended' : (date.status === 'announced' ? 'Join Waitlist' : 'Get Tickets')}
                                                        <Ticket size={12} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDirections(date); }}
                                                        className="px-3 py-2 rounded-lg border border-[var(--text-color)]/20 text-[var(--text-color)] hover:bg-[var(--text-color)]/5 transition-colors"
                                                        title="Get Directions"
                                                    >
                                                        <Navigation size={12} />
                                                    </button>
                                                </motion.div>
                                            )}
                                        </GlassCard>
                                    </motion.div>
                                ))
                            )
                        )}
                    </div>
                </div>

                {/* 3D Globe Container */}
                <div className="absolute inset-0 md:relative md:flex-1 w-full h-full bg-[var(--bg-color)] md:bg-transparent">
                    <div className="absolute inset-0">
                        <TourGlobe
                            dates={TOUR_SCHEDULE}
                            selectedArtist={selectedArtist}
                            onSelectLocation={(loc) => {
                                setActiveLocation(loc);
                                setMobileView('list'); // Switch back to list to show details on mobile
                            }}
                        />
                    </div>

                    {/* Legend (Desktop) */}
                    <div className="absolute bottom-24 md:bottom-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 pointer-events-none z-20">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Globe size={12} /> Live Tracker
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                <span className="text-[10px] text-gray-300">Live Location</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                <span className="text-[10px] text-gray-300">Upcoming Show</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-500" />
                                <span className="text-[10px] text-gray-300">Past Event</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
