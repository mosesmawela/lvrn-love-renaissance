import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = memo(({ message = 'Loading...' }) => (
  <motion.div
    className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="relative">
      {/* Outer ring */}
      <motion.div
        className="w-16 h-16 border-4 border-[var(--accent)]/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute inset-0 border-4 border-[var(--accent)] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Inner pulse */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-[var(--accent)] rounded-full" />
      </motion.div>
    </div>

    <p className="mt-6 text-sm text-[var(--text-secondary)] uppercase tracking-widest font-medium">
      {message}
    </p>
  </motion.div>
));

PageLoader.displayName = 'PageLoader';

// Section loading placeholder
export const SectionLoader: React.FC = memo(() => (
  <div className="py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
    <div className="animate-pulse space-y-8">
      <div className="h-16 bg-[var(--text-color)]/5 rounded-lg w-1/3" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-64 bg-[var(--text-color)]/5 rounded-2xl" />
        <div className="h-64 bg-[var(--text-color)]/5 rounded-2xl" />
      </div>
    </div>
  </div>
));

SectionLoader.displayName = 'SectionLoader';

// Card skeleton
interface CardSkeletonProps {
  count?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = memo(({ count = 3 }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="h-80 bg-[var(--text-color)]/5 rounded-2xl animate-pulse"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      />
    ))}
  </div>
));

CardSkeleton.displayName = 'CardSkeleton';
