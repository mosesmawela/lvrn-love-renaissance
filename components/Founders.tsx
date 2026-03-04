import React from 'react';
import { motion } from 'framer-motion';
import { FOUNDERS } from '../constants';
import { GlassCard } from './GlassCard';

export const Founders: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {FOUNDERS.map((founder, index) => (
        <motion.div
          key={founder.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard className="h-full group">
            <div className="space-y-4">
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full group-hover:w-24 transition-all duration-300" />
              <h3 className="text-2xl font-bold text-[var(--text-color)]">{founder.name}</h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">{founder.role}</p>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed group-hover:text-[var(--text-color)] transition-colors">
                {founder.description}
              </p>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};