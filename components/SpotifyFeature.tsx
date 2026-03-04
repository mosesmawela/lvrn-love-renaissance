import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const SpotifyFeature: React.FC = () => {
  return (
    <GlassCard className="overflow-hidden bg-[#1DB954]/5 group max-w-5xl mx-auto">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#1DB954]/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#1DB954]/30 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-orange-900/20 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6">
        <div className="flex-1 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-2 py-1 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/20 text-[#1DB954] text-[10px] font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
              <span>Label Spotlight</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
              Recognized by <span className="text-[#1DB954]">Spotify</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg">
              "LVRN is not just a record label; it's a creative agency, a management company, and a cultural incubator."
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="https://artists.spotify.com/en/blog/label-spotlight-lvrn"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center justify-center px-6 py-3 bg-white text-black rounded-full font-bold text-sm overflow-hidden transition-transform active:scale-95 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Read Feature
              <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-[#1DB954] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </motion.div>
      </div>
    </GlassCard>
  );
};