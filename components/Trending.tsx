import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, TrendingUp, Music, BarChart3, Users, ExternalLink, Disc, ChevronLeft, ChevronRight, Pause, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';

const TRENDS = {
  summerwalker: {
    id: 'summerwalker',
    artist: "Summer Walker",
    title: "Finally Over It",
    track: "Heart Of A Woman",
    subTrack: "Finally Over It",
    description: "Atlanta native Summer Walker emerges with the raw, soulful energy that RnB devotees live for. The trilogy is complete.",
    link: "https://songstats.com/artist/7my38ftu/summer-walker",
    theme: "from-amber-900 via-black to-orange-900/40",
    accent: "text-orange-500",
    accentBg: "bg-orange-500",
    accentGlow: "shadow-orange-500/20",
    stats: [
      { label: "Followers", value: "27M", icon: Users },
      { label: "Streams", value: "13.1B", icon: Music },
      { label: "Playlists", value: "42.4K", icon: BarChart3 },
      { label: "Charts", value: "3146", icon: TrendingUp }
    ],
    videoId: "1ipRd0WgB0c"
  },
  odeal: {
    id: 'odeal',
    artist: "Odeal",
    title: "Thoughts I Never Said",
    track: "Be Easy",
    subTrack: "Thoughts I Never Said",
    description: "Multi-genre artist from South East London. Blending Alt-R&B with Afro-fusion. No boundaries.",
    link: "https://songstats.com/artist/4h1tovaz/odeal",
    theme: "from-amber-900 via-black to-orange-900/40",
    accent: "text-amber-500",
    accentBg: "bg-amber-500",
    accentGlow: "shadow-amber-500/20",
    stats: [
      { label: "Followers", value: "1.37M", icon: Users },
      { label: "Streams", value: "616M", icon: Music },
      { label: "Playlists", value: "5,969", icon: BarChart3 },
      { label: "Charts", value: "946", icon: TrendingUp }
    ],
    videoId: "V_KchwQrS7Y"
  },
  alxapo: {
    id: 'alxapo',
    artist: "Al Xapo",
    title: "The Villain They Need",
    track: "Snokonoko",
    subTrack: "Secret Bounce EP",
    description: "The hood's hero and industry's villain. Al Xapo is driving culture with his rebellious Public Enemy persona and sophisticated ghetto aesthetic.",
    link: "https://ffm.bio/v4vjlax",
    theme: "from-gray-900 via-black to-red-900/40",
    accent: "text-red-500",
    accentBg: "bg-red-500",
    accentGlow: "shadow-red-500/20",
    stats: [
      { label: "TikTok Creates", value: "139k+", icon: TrendingUp },
      { label: "Spotify Listeners", value: "1.2M", icon: Users },
      { label: "Apple Streams", value: "644k", icon: Music },
      { label: "TikTok Followers", value: "10k+", icon: BarChart3 }
    ],
    videoId: "7cQz60N88Jg"
  },
  ciza: {
    id: 'ciza',
    artist: "Ciza",
    title: "The 3-Step King",
    track: "Isaka (6am)",
    subTrack: "Isaka II (Remix)",
    description: "Leading a new era of African dance music. His global smash 'Isaka' has become the driving force of the international 3-Step/Afrohouse wave.",
    link: "https://ffm.bio/xyoenml",
    theme: "from-yellow-900/40 via-black to-amber-700/20",
    accent: "text-yellow-500",
    accentBg: "bg-yellow-500",
    accentGlow: "shadow-yellow-500/20",
    stats: [
      { label: "Total Streams", value: "150M+", icon: Music },
      { label: "Top Song", value: "#1 SA", icon: TrendingUp },
      { label: "Listeners", value: "3.2M", icon: Users },
      { label: "Shazams", value: "856k", icon: BarChart3 }
    ],
    videoId: "sel1mCYFJ8U"
  }
};

type TrendKey = keyof typeof TRENDS;

interface TrendingProps {
  onViewProfile?: (artistName: string) => void;
}

const AUTO_ROTATE_INTERVAL = 8000;

export const Trending: React.FC<TrendingProps> = ({ onViewProfile }) => {
  const [activeTab, setActiveTab] = useState<TrendKey>('summerwalker');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  const trendKeys = Object.keys(TRENDS) as TrendKey[];
  const currentIndex = trendKeys.indexOf(activeTab);

  const navigateTo = useCallback((key: TrendKey) => {
    setActiveTab(key);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % trendKeys.length;
    navigateTo(trendKeys[nextIndex]);
  }, [currentIndex, trendKeys, navigateTo]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + trendKeys.length) % trendKeys.length;
    navigateTo(trendKeys[prevIndex]);
  }, [currentIndex, trendKeys, navigateTo]);

  // Auto-rotation with progress tracking
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / AUTO_ROTATE_INTERVAL) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= AUTO_ROTATE_INTERVAL) {
        goNext();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const currentTrend = TRENDS[activeTab];
  const accentColor = currentTrend.accent.replace('text-', '');

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Video/Ambience */}
      <div className="absolute inset-0 bg-black transition-colors duration-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            {TRENDS[activeTab].videoId ? (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${TRENDS[activeTab].videoId}?autoplay=1&mute=1&loop=1&playlist=${TRENDS[activeTab].videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
                  className="absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 object-cover scale-110 opacity-40 md:opacity-50"
                  allow="autoplay; encrypted-media"
                  title="Background Ambient Video"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                <div className={`absolute inset-0 bg-gradient-to-br ${TRENDS[activeTab].theme} mix-blend-multiply opacity-60`} />
              </div>
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${TRENDS[activeTab].theme}`} />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[2]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.span
                className={`w-2 h-2 rounded-full ${currentTrend.accentBg}`}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className={`${currentTrend.accent} font-bold uppercase tracking-widest text-sm`}>Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              Breaking <span className="text-gray-500">Culture</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            {/* Prev/Next Arrows */}
            <div className="flex gap-1">
              <motion.button
                onClick={goPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Previous artist"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={goNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Next artist"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>

            {/* Auto-play Toggle */}
            <motion.button
              onClick={() => {
                setIsAutoPlaying(!isAutoPlaying);
                if (!isAutoPlaying) {
                  startTimeRef.current = Date.now();
                  setProgress(0);
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                isAutoPlaying
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/5 border-white/10 text-gray-500'
              }`}
              aria-label={isAutoPlaying ? "Pause auto-rotate" : "Start auto-rotate"}
            >
              {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
            </motion.button>

            {/* Tab Switcher */}
            <div className="flex gap-2 bg-white/5 rounded-2xl p-2 border border-white/10 backdrop-blur-md">
              {Object.entries(TRENDS).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => navigateTo(key as TrendKey)}
                  className={`relative px-4 md:px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {data.artist}
                  {activeTab === key && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 rounded-xl bg-white/20 blur-md -z-10"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isAutoPlaying && (
          <div className="mb-8 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${currentTrend.accentBg}`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Column: Info */}
            <div className="space-y-8">
              <div>
                <motion.h3
                  className={`text-5xl md:text-7xl font-black mb-2 uppercase leading-none ${currentTrend.accent}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentTrend.artist}
                </motion.h3>
                <motion.p
                  className="text-2xl text-white font-light tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {currentTrend.title}
                </motion.p>
              </div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="!p-0 !rounded-lg overflow-hidden !bg-white/5" hoverEffect={false}>
                  <div className="px-4 py-2 flex items-center gap-3">
                    <Disc size={18} className={currentTrend.accent} />
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase block tracking-wider">Focus Track</span>
                      <span className="text-base font-bold text-white">{currentTrend.track}</span>
                    </div>
                  </div>
                </GlassCard>
                {currentTrend.subTrack && (
                  <GlassCard className="!p-0 !rounded-lg overflow-hidden !bg-white/5" hoverEffect={false}>
                    <div className="px-4 py-2">
                      <span className="text-[10px] text-gray-400 uppercase block tracking-wider">Project</span>
                      <span className="text-base font-bold text-white">{currentTrend.subTrack}</span>
                    </div>
                  </GlassCard>
                )}
              </motion.div>

              <motion.p
                className="text-gray-300 text-lg leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {currentTrend.description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={() => onViewProfile?.(currentTrend.artist)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${currentTrend.accentBg} text-black px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-xl ${currentTrend.accentGlow}`}
                >
                  <Users className="w-5 h-5" />
                  View Profile
                </motion.button>

                <motion.a
                  href={currentTrend.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold text-lg group hover:bg-white/10 transition-all"
                >
                  <BarChart3 className={currentTrend.accent} size={20} />
                  See More Stats
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors ml-1" />
                </motion.a>
              </motion.div>
            </div>

            {/* Right Column: Stats */}
            <div className="space-y-6 lg:pl-12">
              <div className="grid grid-cols-2 gap-4">
                {currentTrend.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <GlassCard
                      className="!bg-white/5 group hover:!bg-white/10 transition-colors border-white/5 hover:border-white/20"
                    >
                      <div className="flex flex-col h-full justify-between">
                        <stat.icon className={`w-6 h-6 mb-4 ${currentTrend.accent} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all`} />
                        <div>
                          <div className="text-2xl md:text-5xl font-black text-white mb-1">
                            {stat.value}
                          </div>
                          <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-medium">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <GlassCard className="!bg-white/5 border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/10 ${currentTrend.accent}`}>
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm">Real-time Performance</h4>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">LVRN Data Engine Live</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Artist Quick Nav Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {trendKeys.map((key, index) => (
            <motion.button
              key={key}
              onClick={() => navigateTo(key)}
              className="relative w-3 h-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to ${TRENDS[key].artist}`}
            >
              {activeTab === key && (
                <motion.div
                  className={`absolute inset-0 rounded-full ${currentTrend.accentBg}`}
                  layoutId="activeDot"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Keyboard Hint */}
        <p className="text-center text-gray-600 text-xs mt-4 hidden md:block">
          Use <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-gray-500 font-mono">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-gray-500 font-mono">→</kbd> arrow keys to navigate
        </p>
      </div>
    </section>
  );
};
