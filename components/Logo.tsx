import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Logo: React.FC<LogoProps> = ({ className = "", style = {} }) => {
  return (
    <motion.img 
      src="https://ik.imagekit.io/mosesmawela/LOGO/logo.svg?updatedAt=1769936404900" 
      alt="LVRN Logo" 
      className={className}
      style={{ filter: 'var(--logo-filter)', ...style }}
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.8, 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }}
      whileHover={{ 
        scale: 1.1, 
        filter: 'var(--logo-filter) drop-shadow(0 0 10px rgba(168, 85, 247, 0.4))' 
      }}
      whileTap={{ scale: 0.95 }}
      onError={(e) => {
        // Fallback or error handling if needed
        console.warn('Logo image failed to load');
      }}
    />
  );
};