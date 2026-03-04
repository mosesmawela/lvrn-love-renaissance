import React from 'react';
import { motion } from 'framer-motion';
import { Music4 } from 'lucide-react';

export const Playlist: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 relative" id="playlist">
       {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1DB954]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/20 text-[#1DB954] text-xs font-bold uppercase tracking-wider mb-4">
                <Music4 size={14} />
                <span>On Rotation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">LVRN Radio</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Tune in to the official sounds of Love Renaissance. Streaming the latest hits, deep cuts, and future classics from our roster.
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-[0_0_50px_rgba(29,185,84,0.1)] border border-white/5 bg-black relative z-10"
        >
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/playlist/03zrHC6FVV2r0Mp4yBhosO?utm_source=generator&theme=0" 
            width="100%" 
            height="450" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="LVRN Spotify Playlist"
          />
        </motion.div>
      </div>
    </section>
  );
};