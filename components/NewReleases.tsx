import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Music2, ArrowUpRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useExperience } from './ExperienceProvider';

const RELEASES = [
  {
    id: 1,
    artist: "Summer Walker",
    title: "Finally Over It",
    type: "Album",
    date: "November 14, 2025",
    description: "The trilogy is complete. 19 tracks featuring Chris Brown, Latto, and more.",
    color: "from-orange-500 to-amber-900",
    link: "https://ffm.bio/joqmpro"
  },
  {
    id: 2,
    artist: "Nektunez",
    title: "Fated Skies",
    type: "Album",
    date: "Coming 2025",
    description: "Exploring destiny and ambition through a fusion of Afrobeats and electronic sounds.",
    color: "from-amber-500 to-yellow-900",
    link: "https://ffm.bio/n2m99kb"
  },
  {
    id: 3,
    artist: "Sadboi",
    title: "Latest Release",
    type: "Single",
    date: "Out Now",
    description: "Expertly weaving elements of reggae, dancehall, and Caribbean culture.",
    color: "from-orange-600 to-red-900",
    link: "https://linktr.ee/whyusadboi?utm_source=linktree_admin_share"
  },
  {
    id: 4,
    artist: "6LACK",
    title: "Since I Have A Lover",
    type: "Album",
    date: "Available Now",
    description: "A musical journey into love and healing.",
    color: "from-amber-700 to-orange-900",
    link: "https://linktr.ee/6lack?fbclid=PAZXh0bgNhZW0CMTEAAaaVGqBGHPLaghJlREvqQ4sHAVmqJ5PDmGSnDEaanrXE9LSMnlPdnawfVn0_aem_zH5mYhA3ccJv7k45ofZ1Rg"
  },
  {
    id: 5,
    artist: "Odeal",
    title: "Thoughts I Never Said",
    type: "EP",
    date: "Latest Release",
    description: "A musical R&B project charged with deep emotional depth.",
    color: "from-amber-600 to-orange-800",
    link: "https://ffm.bio/prgp37n"
  }
];

export const NewReleases: React.FC = () => {
  const { showNotification } = useExperience();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % RELEASES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + RELEASES.length) % RELEASES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleListen = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    showNotification("Redirecting to streaming platform...", "info");
    setTimeout(() => {
        window.open(url, '_blank');
    }, 800);
  };

  const currentRelease = RELEASES[currentIndex];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-16">
           <h2 className="display-heading text-5xl md:text-7xl">New Releases</h2>
           <div className="flex gap-2">
              <button onClick={prevSlide} className="p-4 border border-[var(--card-border)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] transition-all">
                <ChevronLeft />
              </button>
              <button onClick={nextSlide} className="p-4 border border-[var(--card-border)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] transition-all">
                <ChevronRight />
              </button>
            </div>
        </div>

        <div className="relative h-[500px] w-full flex items-center justify-center perspective-[1000px]">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 200 : -200, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: direction > 0 ? -200 : 200, filter: "blur(10px)", position: 'absolute' }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="w-full max-w-5xl"
            >
              <GlassCard className="w-full">
                <div className="relative w-full h-[450px] rounded-none overflow-hidden bg-[var(--bg-color)] group">
                  {/* Dynamic Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentRelease.color} opacity-10 group-hover:opacity-20 transition-opacity duration-700`} />
                  
                  <div className="relative z-10 h-full flex flex-col md:flex-row items-center p-8 md:p-16 gap-16">
                    {/* Vinyl Record Visualization */}
                    <motion.div 
                      className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-full bg-black border border-[var(--card-border)] shadow-2xl relative flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
                    >
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${currentRelease.color} opacity-30`} />
                      <div className="w-24 h-24 rounded-full bg-black border border-[var(--card-border)] flex items-center justify-center">
                        <Music2 className="text-[var(--accent)] w-10 h-10" />
                      </div>
                      {/* Vinyl Grooves */}
                      <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
                      <div className="absolute inset-6 rounded-full border border-white/5 pointer-events-none" />
                      <div className="absolute inset-10 rounded-full border border-white/5 pointer-events-none" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left space-y-6" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}>
                      <div>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="inline-block px-4 py-2 border border-[var(--card-border)] text-xs font-bold uppercase tracking-[0.2em] mb-6"
                        >
                          {currentRelease.type} — {currentRelease.date}
                        </motion.div>
                        <motion.h3 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight"
                        >
                          {currentRelease.title}
                        </motion.h3>
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-xl text-[var(--accent)] font-serif italic mt-2"
                        >
                          {currentRelease.artist}
                        </motion.p>
                      </div>

                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-xl"
                      >
                        {currentRelease.description}
                      </motion.p>

                      <motion.button
                        onClick={(e) => handleListen(e, currentRelease.link)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-luxury mt-4"
                      >
                        <span className="relative z-10">Listen Now</span>
                        <ArrowUpRight className="inline-block ml-3 w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Progress Bar */}
        <div className="flex justify-center mt-8 gap-2">
          {RELEASES.map((_, idx) => (
            <div 
              key={idx}
              className={`h-[2px] transition-all duration-300 ${idx === currentIndex ? 'w-12 bg-[var(--accent)]' : 'w-4 bg-[var(--text-muted)]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};