import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: (e: React.MouseEvent) => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.3,
  onClick
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !innerRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    buttonRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    innerRef.current.style.transform = `translate(${deltaX * 0.5}px, ${deltaY * 0.5}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current || !innerRef.current) return;

    buttonRef.current.style.transform = 'translate(0px, 0px)';
    innerRef.current.style.transform = 'translate(0px, 0px)';
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <span ref={innerRef} className="magnetic-btn-inner flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default MagneticButton;
