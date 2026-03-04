import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../constants';
import { GlassCard } from './GlassCard';

export const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      {STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <GlassCard className="h-full flex flex-col items-center justify-center p-6 text-center">
            <motion.div 
              className="text-4xl md:text-5xl font-black gradient-text mb-2"
              whileHover={{ scale: 1.1 }}
            >
              {stat.value}{stat.suffix}
            </motion.div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">
              {stat.label}
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};