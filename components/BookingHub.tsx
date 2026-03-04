import React from 'react';
import { motion } from 'framer-motion';
import { ARTISTS } from '../constants';
import { GlassCard } from './GlassCard';
import { Artist } from '../types';
import { Calendar, Globe, Star, ArrowUpRight } from 'lucide-react';

interface BookingHubProps {
    onSelectArtist: (artist: Artist) => void;
    onClose: () => void;
}

export const BookingHub: React.FC<BookingHubProps> = ({ onSelectArtist, onClose }) => {
    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] pt-24 pb-12 px-6 relative z-40 transition-colors duration-300">
            <button
                onClick={onClose}
                className="fixed top-24 right-6 z-50 p-2 bg-[var(--card-bg)] hover:bg-[var(--text-color)]/10 rounded-full backdrop-blur-md transition-colors border border-[var(--card-border)] text-[var(--text-color)]"
            >
                <ArrowUpRight className="rotate-180" size={24} />
            </button>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-[var(--text-color)]">Booking Roster</h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Official booking rates and availability for the LVRN roster.
                        Select an artist to begin the inquiry process.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ARTISTS.map((artist, index) => (
                        <motion.div
                            key={artist.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <GlassCard className="h-full flex flex-col group cursor-pointer border-[var(--text-color)]/10 hover:border-orange-500/50 transition-colors" onClick={() => onSelectArtist(artist)}>
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${artist.category === 'Signed'
                                                ? 'bg-orange-500/10 border-orange-500/20 text-orange-500'
                                                : 'bg-[var(--text-color)]/5 border-[var(--text-color)]/10 text-[var(--text-secondary)]'
                                            }`}>
                                            {artist.category}
                                        </span>
                                        <Star size={16} className="text-[var(--text-color)]/20 group-hover:text-yellow-400 transition-colors" />
                                    </div>

                                    <h3 className="text-3xl font-black text-[var(--text-color)] mb-2">{artist.name}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-6 line-clamp-2">{artist.role}</p>

                                    <div className="space-y-3 pt-6 border-t border-[var(--text-color)]/5">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                                <Globe size={14} />
                                                <span>Region</span>
                                            </div>
                                            <span className="font-medium text-[var(--text-color)]">{artist.bookingRegion || 'Global'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                                <Calendar size={14} />
                                                <span>Est. Rate</span>
                                            </div>
                                            <span className="font-bold text-green-500">{artist.bookingRate || 'Inquire'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-[var(--text-color)]/5 border-t border-[var(--text-color)]/5 group-hover:bg-orange-600 group-hover:border-orange-500 transition-colors group-hover:text-white text-[var(--text-color)]">
                                    <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider">
                                        Book Now <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};