import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Play, Star, ExternalLink } from 'lucide-react';
import { Artist } from '../types';
import { GlassCard } from './GlassCard';

interface ArtistSectionProps {
    artist: Artist;
}

export const ArtistSection: React.FC<ArtistSectionProps> = ({ artist }) => {
    if (!artist.videoId) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="my-20"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-gradient-to-r from-[var(--accent)] to-transparent rounded-full" />
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[var(--text-color)]">
                    Featured Masterpiece
                </h2>
            </div>

            <GlassCard className="!p-0 overflow-hidden border-[var(--card-border)] shadow-2xl relative group">
                <div className="aspect-video w-full relative">
                    {/* Immersive Video Player */}
                    <iframe
                        src={`https://www.youtube.com/embed/${artist.videoId}?autoplay=0&modestbranding=1&rel=0`}
                        title={`${artist.name} Featured Video`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    
                    {/* Decorative Overlay for premium feel */}
                    <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[inherit]" />
                </div>

                <div className="p-6 md:p-8 bg-gradient-to-b from-transparent to-black/20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Youtube className="text-red-500" size={20} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                                    Official LVRN Premiere
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white">
                                {artist.name} &mdash; Official Visual
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm max-w-xl">
                                Dive into the creative world of {artist.name}. This featured visual encapsulates 
                                the unique aesthetic and sound that defines their place in the LVRN family.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <a 
                                href={`https://www.youtube.com/watch?v=${artist.videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                <Play size={16} className="relative z-10 group-hover/btn:fill-white" /> 
                                <span className="relative z-10 group-hover:text-white transition-colors">Experience on YouTube</span>
                            </a>
                            
                            <div className="hidden sm:flex items-center gap-3 px-5 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">High Fidelity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Subtle floating elements for "Wow" factor */}
            <div className="relative">
                <motion.div 
                    animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -right-10 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div 
                    animate={{ y: [0, 10, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
                />
            </div>
        </motion.div>
    );
};
