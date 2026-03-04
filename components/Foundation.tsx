import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Mic2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

const ENTITIES = [
  {
    title: "LVRN Cares",
    subtitle: "The Foundation",
    description: "Our philanthropic arm dedicated to mental health access and community empowerment. We believe in holistic support for artists and the community alike.",
    link: "https://www.instagram.com/lvrncares/",
    icon: Heart,
    color: "from-orange-600/20 to-amber-900/20",
    hoverBorder: "hover:border-orange-500/50"
  },
  {
    title: "LVRN Studios",
    subtitle: "The Creative Hub",
    description: "A sanctuary for creativity in Atlanta. Our state-of-the-art facility provides a home for local talent to develop without leaving the city.",
    link: "https://www.instagram.com/lvrn.studios/",
    icon: Mic2,
    color: "from-blue-600/20 to-indigo-900/20",
    hoverBorder: "hover:border-blue-500/50"
  }
];

export const Foundation: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 text-[var(--text-color)]"
          >
            Community & Culture
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
          >
            Building ecosystems that support the artist, the person, and the city.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {ENTITIES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                <GlassCard className={`h-full group transition-all duration-500 border border-[var(--text-color)]/10 ${item.hoverBorder}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 flex flex-col h-full p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 rounded-2xl bg-[var(--text-color)]/5 border border-[var(--text-color)]/10 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-8 h-8 text-[var(--text-color)]" />
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-color)] transition-colors" />
                    </div>

                    <h3 className="text-3xl font-bold mb-2 text-[var(--text-color)]">{item.title}</h3>
                    <p className="text-[var(--accent)] font-medium uppercase tracking-wider text-sm mb-4">{item.subtitle}</p>
                    <p className="text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-color)] transition-colors">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};