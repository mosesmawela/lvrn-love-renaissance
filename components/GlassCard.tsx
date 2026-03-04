import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = true, onClick, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer springs for a "heavier", more premium fluid feel
  const mouseX = useSpring(x, { stiffness: 40, damping: 20, mass: 1 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 20, mass: 1 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (!hoverEffect) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate position relative to center for tilt (range -0.5 to 0.5)
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // 3D Rotation values based on mouse position
  // Reduced rotation for subtlety
  const rotateX = useTransform(mouseY, (val: number) => -val * 12);
  const rotateY = useTransform(mouseX, (val: number) => val * 12);

  // Add perspective to the transform for true 3D depth
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Spotlight gradient position
  const spotlightX = useTransform(mouseX, (val: number) => (val + 0.5) * 100);
  const spotlightY = useTransform(mouseY, (val: number) => (val + 0.5) * 100);

  // Define templates unconditionally at the top level
  const spotlightBg = useMotionTemplate`
    radial-gradient(
      600px circle at ${spotlightX}% ${spotlightY}%,
      rgba(var(--spotlight-rgb), 0.1),
      transparent 80%
    )
  `;

  const borderBg = useMotionTemplate`
    radial-gradient(
        400px circle at ${spotlightX}% ${spotlightY}%,
        rgba(var(--spotlight-rgb), 0.4),
        transparent 40%
    )
  `;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform: hoverEffect ? transform : "none",
      }}
      className={`glass-panel relative group ${className}`}
      {...props}
    >
      {/* Spotlight Overlay */}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 z-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 pointer-events-none rounded-[inherit]"
          style={{
            background: spotlightBg,
            opacity: 'var(--spotlight-opacity, 1)'
          }}
        />
      )}

      {/* Border Glow */}
      {hoverEffect && (
          <motion.div
            className="absolute inset-0 z-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 pointer-events-none rounded-[inherit]"
            style={{
                background: borderBg,
                padding: '1px',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                opacity: 'var(--spotlight-opacity, 1)'
            }}
         />
      )}

      <div className="relative z-10 h-full" style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};