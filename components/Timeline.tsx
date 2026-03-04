import React from 'react';
import { motion } from 'framer-motion';
import { MILESTONES } from '../constants';
import { GlassCard } from './GlassCard';

export const Timeline: React.FC = () => {
  return (
    <div className="relative py-10">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="space-y-12">
        {MILESTONES.map((milestone, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Spacer for desktop layout */}
              <div className="hidden md:block w-1/2" />

              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-orange-500 transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <GlassCard className="p-6">
                  <span className="text-4xl font-black text-white/10 absolute -top-4 right-4 md:static md:block md:mb-2 md:text-5xl md:text-white/5 select-none pointer-events-none">
                    {milestone.year}
                  </span>
                  <div className="relative z-10">
                    <span className="md:hidden text-2xl font-bold text-orange-400 block mb-1">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};