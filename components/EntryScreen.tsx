import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from './ExperienceProvider';
import { ParticleBackground } from './ParticleBackground';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import InteractiveNeuralVortex from './ui/interactive-neural-vortex-background';

export const EntryScreen: React.FC = () => {
  const { enterExperience, hasEntered } = useExperience();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (hasEntered) return;

    // Simulate loading resources
    const duration = 2500; // 2.5 seconds load time
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsReady(true);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [hasEntered]);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      enterExperience();
    }, 800);
  };

  if (hasEntered && !isExiting) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#000] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <InteractiveNeuralVortex>
            <div className="absolute inset-0 pointer-events-none">
              <ParticleBackground intensity={0.4} className="opacity-40" />
            </div>

          <div className="relative z-10 flex flex-col items-center justify-center p-8 w-full max-w-4xl">

            {/* Logo Container with Loading Ring */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-16">
              {/* Spinning Loading Ring */}
              <div className="absolute inset-0">
                <svg className="w-full h-full -rotate-90">
                  {/* Track */}
                  <circle
                    cx="50%" cy="50%" r="48%"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                  {/* Progress */}
                  <motion.circle
                    cx="50%" cy="50%" r="48%"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: loadingProgress / 100 }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Glowing Pulse when Ready */}
              {isReady && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-orange-500/30"
                />
              )}

              <Logo className="w-20 h-auto md:w-24 z-10" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-[var(--text-color)] tracking-[0.2em] uppercase text-center mb-4">
              Love Renaissance
            </h1>

            <div className="h-6 flex items-center justify-center mb-16">
              <p className="text-[var(--text-secondary)] text-xs tracking-[0.3em] uppercase font-mono">
                {isReady ? "System Initialized" : `Loading Assets [${Math.round(loadingProgress)}%]`}
              </p>
            </div>

            <AnimatePresence>
              {isReady && (
                <motion.button
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnter}
                  className="group relative px-12 py-5 bg-white/5 border border-white/10 rounded-full overflow-hidden backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:shadow-[0_0_50px_rgba(249,115,22,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-4 text-sm font-bold text-white uppercase tracking-[0.25em]">
                    Enter Site <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          </InteractiveNeuralVortex>
        </motion.div>
      )}
    </AnimatePresence>
  );
};