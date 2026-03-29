import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, TrendingUp, Music, BarChart3, Users, ExternalLink, Disc } from 'lucide-react';
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
    stats: [
      { label: "TikTok Creates", value: "139k+", icon: TrendingUp },
      { label: "Spotify Listeners", value: "1.2M", icon: Users },
      { label: "Apple Streams", value: "644k", icon: Music },
      { label: "TikTok Followers", value: "10k+", icon: BarChart3 }
    ],
    videoId: "YxU-vshDkAA"
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

export const Trending: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TrendKey>('summerwalker');

  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-black transition-colors duration-1000">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${TRENDS[activeTab].theme}`}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${TRENDS[activeTab].accent.replace('text', 'bg')}`} />
              <span className={`${TRENDS[activeTab].accent} font-bold uppercase tracking-widest text-sm`}>Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              Breaking <span className="text-gray-500">Culture</span>
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-2 bg-white/5 rounded-2xl p-2 border border-white/10 backdrop-blur-md">
            {Object.entries(TRENDS).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as TrendKey)}
                className={`px-4 md:px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${activeTab === key ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {data.artist}
              </button>
            ))}
          </div>
        </div>

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
                  className={`text-5xl md:text-7xl font-black mb-2 uppercase leading-none ${TRENDS[activeTab].accent}`}
                >
                  {TRENDS[activeTab].artist}
                </motion.h3>
                <p className="text-2xl text-white font-light tracking-wide">{TRENDS[activeTab].title}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <GlassCard className="!p-0 !rounded-lg overflow-hidden !bg-white/5" hoverEffect={false}>
                  <div className="px-4 py-2 flex items-center gap-3">
                    <Disc size={18} className={TRENDS[activeTab].accent} />
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase block tracking-wider">Focus Track</span>
                      <span className="text-base font-bold text-white">{TRENDS[activeTab].track}</span>
                    </div>
                  </div>
                </GlassCard>
                {TRENDS[activeTab].subTrack && (
                  <GlassCard className="!p-0 !rounded-lg overflow-hidden !bg-white/5" hoverEffect={false}>
                    <div className="px-4 py-2">
                      <span className="text-[10px] text-gray-400 uppercase block tracking-wider">Project</span>
                      <span className="text-base font-bold text-white">{TRENDS[activeTab].subTrack}</span>
                    </div>
                  </GlassCard>
                )}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                {TRENDS[activeTab].description}
              </p>

              <motion.a
                href={TRENDS[activeTab].link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-black text-lg group`}
              >
                <Play className="fill-current w-5 h-5" />
                See Stats
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
              </motion.a>
            </div>

            <div className="space-y-6">
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm relative group">
                <iframe
                  src={`https://www.youtube.com/embed/${TRENDS[activeTab].videoId}?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  title={`${TRENDS[activeTab].artist} Video`}
                />
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {TRENDS[activeTab].stats.map((stat, index) => (
                  <GlassCard
                    key={stat.label}
                    className="!bg-white/5 group hover:!bg-white/10 transition-colors"
                  >
                    <div className="flex flex-col h-full justify-between">
                      <stat.icon className={`w-6 h-6 mb-4 ${TRENDS[activeTab].accent} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all`} />
                      <div>
                        <div className="text-2xl md:text-4xl font-black text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};