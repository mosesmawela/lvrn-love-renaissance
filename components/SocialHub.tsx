import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, Music2, Share2, MoreHorizontal, CheckCircle2, Search, X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Logo } from './Logo';
import { useExperience } from './ExperienceProvider';

const InstagramCard = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const { showNotification } = useExperience();

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) showNotification("Liked on Instagram", "success");
  };

  const handleSave = () => {
    setSaved(!saved);
    if (!saved) showNotification("Post saved to collections", "success");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard className="h-full !p-0 overflow-hidden flex flex-col group border-white/10">
        <div className="p-4 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 via-amber-500 to-orange-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Logo className="w-5 h-auto" style={{ filter: 'invert(1)' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-white">lvrngram</span>
                <CheckCircle2 size={12} className="text-orange-500 fill-orange-500/20" />
              </div>
              <span className="text-xs text-gray-400">Atlanta, GA</span>
            </div>
          </div>
          <MoreHorizontal className="text-white" size={20} />
        </div>

        <div className="relative aspect-square bg-[#111] overflow-hidden group-hover:brightness-110 transition-all duration-500" onDoubleClick={handleLike}>
          <img
            src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop"
            alt="Studio Session"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-8 backdrop-blur-sm pointer-events-none">
            <div className="flex items-center gap-2 text-white font-bold">
              <Heart className="fill-white" /> 12.5K
            </div>
            <div className="flex items-center gap-2 text-white font-bold">
              <MessageCircle className="fill-white" /> 142
            </div>
          </div>
        </div>

        <div className="p-4 bg-black/40 backdrop-blur-md flex-1 flex flex-col justify-end">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <button onClick={handleLike} className="transition-transform active:scale-90">
                <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-white hover:text-gray-300'}`} />
              </button>
              <button onClick={() => showNotification("Comments disabled for preview")} className="transition-transform active:scale-90">
                <MessageCircle className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
              </button>
              <button onClick={() => showNotification("Link copied to clipboard", "info")} className="transition-transform active:scale-90">
                <Send className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
              </button>
            </div>
            <button onClick={handleSave} className="transition-transform active:scale-90">
              <Bookmark className={`w-6 h-6 ${saved ? 'fill-white text-white' : 'text-white hover:text-gray-300'}`} />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold text-white">12,543 likes</p>
            <p className="text-sm text-gray-300">
              <span className="font-bold text-white mr-2">lvrngram</span>
              Defining the sound of the future. New releases dropping this Friday. Stay tuned. 💿
              <span className="text-blue-400 ml-1">#LVRN #LoveRenaissance</span>
            </p>
          </div>

          <a
            href="https://www.instagram.com/lvrngram"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-center text-sm hover:opacity-90 transition-opacity shadow-lg"
          >
            Follow on Instagram
          </a>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const TikTokCard = () => {
  const { showNotification } = useExperience();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) showNotification("Added to Liked Videos", "success");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard className="h-full !p-0 overflow-hidden relative group border-white/10 bg-black">
        <div className="absolute inset-0 bg-[#111]" onDoubleClick={handleLike}>
          <img
            src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop"
            alt="TikTok Concert"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <Logo className="h-8 w-auto drop-shadow-md" style={{ filter: 'invert(1)' }} />
            <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white">
              Official
            </div>
          </div>

          <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/50 flex items-center justify-center cursor-pointer hover:bg-orange-500/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60)' }} />
                <div className="absolute -bottom-1 bg-red-500 rounded-full p-0.5">
                  <CheckCircle2 size={10} className="text-white" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button onClick={handleLike}>
                <Heart className={`w-8 h-8 drop-shadow-lg transition-colors ${liked ? 'fill-red-500 text-red-500' : 'fill-white text-white'}`} />
              </button>
              <span className="text-xs font-bold text-white drop-shadow-md">842K</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button onClick={() => showNotification("Comments are closed")} className="flex flex-col items-center gap-1">
                <MessageCircle className="w-8 h-8 fill-white text-white drop-shadow-lg" />
                <span className="text-xs font-bold text-white drop-shadow-md">12.5K</span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button onClick={() => showNotification("Share link copied", "info")} className="flex flex-col items-center gap-1">
                <Share2 className="w-8 h-8 fill-white text-white drop-shadow-lg" />
                <span className="text-xs font-bold text-white drop-shadow-md">45K</span>
              </button>
            </div>
          </div>

          <div className="pr-16">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-1 shadow-black drop-shadow-md">@lvrn</h3>
              <p className="text-sm text-gray-200 leading-snug shadow-black drop-shadow-md">
                Behind the scenes at the studio. History in the making. 🎹 🔥
                <span className="font-bold text-white ml-2">#fyp #music #atlanta</span>
              </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Music2 className="w-4 h-4 text-white animate-spin-slow" />
              <div className="overflow-hidden w-32">
                <p className="text-xs text-white whitespace-nowrap animate-marquee">
                  Summer Walker - Finally Over It (Official Audio)
                </p>
              </div>
            </div>

            <a
              href="https://www.tiktok.com/@lvrn"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-xl bg-white text-black font-bold text-center text-sm hover:bg-gray-200 transition-colors shadow-lg"
            >
              Watch on TikTok
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export const SocialHub: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 px-6 md:px-12 relative overflow-hidden" id="socials">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="h-4 w-32 bg-gray-700/50 rounded-full mx-auto animate-pulse mb-4" />
            <div className="h-12 w-64 bg-gray-700/50 rounded-full mx-auto animate-pulse" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div className="aspect-square bg-gray-800/50 rounded-3xl animate-pulse" />
            <div className="aspect-square bg-gray-800/50 rounded-3xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden" id="socials">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-orange-900/10 to-amber-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Share2 size={12} />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">Social Access</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join the movement. Follow exclusive behind-the-scenes content, artist takeovers, and announcements on our official channels.
          </p>

          <div className="max-w-md mx-auto mt-8 relative">
            <input
              type="text"
              placeholder="Search social content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
            <Search className="absolute right-3 top-3.5 text-gray-500" size={18} />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <InstagramCard />
          <TikTokCard />
        </div>
      </div>
    </section>
  );
};