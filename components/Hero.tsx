import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowDown, ExternalLink, Play, Pause } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { useExperience } from './ExperienceProvider';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

// Floating particle component for atmospheric effect
const FloatingParticle: React.FC<{ delay: number; x: string; size: number }> = ({ delay, x, size }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x,
      width: size,
      height: size,
      background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)',
      filter: 'blur(1px)',
    }}
    initial={{ y: '110vh', opacity: 0 }}
    animate={{
      y: '-10vh',
      opacity: [0, 0.6, 0.6, 0],
    }}
    transition={{
      y: { duration: 20 + Math.random() * 10, repeat: Infinity, ease: 'linear', delay },
      opacity: { duration: 20 + Math.random() * 10, repeat: Infinity, ease: 'easeInOut', delay },
    }}
  />
);

// Magnetic button wrapper component
const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ children, className = '', onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    setPosition({ x: deltaX, y: deltaY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

// Video background with loading state
const VideoBackground: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Loading placeholder */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-purple-900/20"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1 }}
      />

      <iframe
        src="https://www.youtube.com/embed/zneGWJroa_Y?autoplay=1&mute=1&loop=1&playlist=zneGWJroa_Y&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1"
        className={`absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 object-cover scale-110 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-30 md:opacity-40' : 'opacity-0'
        } ${isPaused ? '[animation-play-state:paused]' : ''}`}
        allow="autoplay; encrypted-media"
        title="LVRN TV Background Video"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Multi-layer gradient overlays for depth */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

      {/* Radial vignette for focus */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Bottom fade for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
    </div>
  );
};

export const Hero: React.FC = () => {
  const { showNotification } = useExperience();
  const linktreeUrl = SOCIAL_LINKS.find((l) => l.name === 'Linktree')?.url || '#';
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollY } = useScroll();

  // Smooth spring animations for scroll
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Enhanced scroll animations for Logo with smoother transitions
  const rotate = useTransform(scrollY, [0, 600], [0, 180]);
  const scale = useTransform(scrollY, [0, 600], [1, 5]);
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 0.4, 0]);
  const blur = useTransform(scrollY, [0, 400], [0, 20]);
  const filter = useTransform(blur, (v) => `blur(${v}px) var(--logo-filter)`);

  // Additional parallax layers
  const yOffset = useTransform(scrollY, [0, 600], [0, 100]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse tracking for subtle parallax on background elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / innerWidth);
    mouseY.set((clientY - innerHeight / 2) / innerHeight);
  }, [mouseX, mouseY]);

  const backgroundX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const backgroundY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  // GSAP typewriter effect
  useEffect(() => {
    if (!textRef.current) return;

    const phrases = [
      'Redefining the sound of the future through authentic expression.',
      'Leading the next wave of global creative culture.',
      'Authentic expression and cultural rebirth.',
      'Love Renaissance: Where culture meets creation.',
    ];

    const cursor = document.createElement('span');
    cursor.innerHTML = '●';
    cursor.className = 'ml-2 text-orange-500 inline-block';
    cursor.style.fontSize = '0.8em';
    cursor.style.verticalAlign = 'middle';
    textRef.current.parentElement?.appendChild(cursor);

    // Blinking cursor animation
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    const timeline = gsap.timeline({ repeat: -1 });

    phrases.forEach((phrase) => {
      // Type out
      timeline.to(textRef.current, {
        duration: phrase.length * 0.05,
        text: {
          value: phrase,
          delimiter: '',
        },
        ease: 'none',
      });

      // Pause
      timeline.to({}, { duration: 2.5 });

      // Delete
      timeline.to(textRef.current, {
        duration: phrase.length * 0.02,
        text: {
          value: '',
          delimiter: '',
        },
        ease: 'none',
      });

      // Shorter pause before next
      timeline.to({}, { duration: 0.5 });
    });

    return () => {
      timeline.kill();
      cursor.remove();
    };
  }, []);

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    showNotification('Opening Linktree in new tab...', 'info');
    setTimeout(() => {
      window.open(linktreeUrl, '_blank');
    }, 500);
  };

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: i * 1.5,
    x: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Video Background with loading states */}
      <VideoBackground />

      {/* Animated Background Elements with mouse parallax */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ x: backgroundX, y: backgroundY }}
      >
        {/* Blob 1 - Orange/Amber with enhanced animation */}
        <motion.div
          className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full blur-[150px] mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.9) 0%, rgba(234,88,12,0) 70%)',
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        {/* Blob 2 - Warm Tone */}
        <motion.div
          className="absolute bottom-[-20%] right-[-20%] w-[90vw] h-[90vw] rounded-full blur-[150px] mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(251,146,60,0.9) 0%, rgba(249,115,22,0) 70%)',
          }}
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        {/* Subtle purple accent blob */}
        <motion.div
          className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full blur-[120px] mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, 30, -20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            delay={particle.delay}
            x={particle.x}
            size={particle.size}
          />
        ))}

        {/* Grid Pattern Overlay with fade */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--text-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--text-color) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* Main Logo Animation - Fixed position with scroll transforms */}
      <motion.div
        className="fixed top-1/2 left-1/2 z-[1] pointer-events-none origin-center"
        style={{
          x: '-50%',
          y: '-50%',
          rotate,
          scale,
          opacity,
          filter,
        }}
      >
        <img
          src="https://ik.imagekit.io/mosesmawela/LOGO/logo.svg?updatedAt=1769936404900"
          alt="LVRN - Love Renaissance Logo"
          className="w-[280px] h-[280px] md:w-[450px] md:h-[450px] object-contain"
        />
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-end min-h-screen pb-32"
        style={{ opacity: contentOpacity, y: yOffset }}
      >
        {/* Entrance animation wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* SEO H1 - Visually Hidden */}
          <h1 className="sr-only">
            LVRN - Love Renaissance | Leading Creative Agency & Record Label
          </h1>

          {/* Spacer to push content below the central logo */}
          <div className="h-[200px] md:h-[300px]" />

          {/* Typewriter text with enhanced container */}
          <motion.div
            className="mb-10 w-full flex justify-center min-h-[120px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <p
                ref={textRef}
                className="text-xl md:text-2xl lg:text-3xl leading-tight text-center max-w-3xl text-[var(--text-color)]/90 font-light tracking-wide"
              >
                {/* Text populated via GSAP */}
              </p>
            </div>
          </motion.div>

          {/* CTA Button with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton onClick={handleConnect} className="btn-luxury group">
              <span className="relative z-10 flex items-center gap-3">
                Connect
                <ExternalLink
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-white/20 to-orange-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </MagneticButton>
          </motion.div>

          {/* Quick stats or tagline */}
          <motion.div
            className="mt-8 flex items-center gap-6 text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <span className="hidden sm:inline">Atlanta</span>
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
            <span>Global</span>
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
            <span className="hidden sm:inline">Since 2012</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator with enhanced animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.span
          className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.3em]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="text-[var(--text-color)]/30 w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Side decorative elements */}
      <motion.div
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--text-muted)] to-transparent" />
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]"
          style={{ writingMode: 'vertical-lr' }}
        >
          Love Renaissance
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--text-muted)] to-transparent" />
      </motion.div>

      {/* Right side decorative */}
      <motion.div
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent" />
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]"
          style={{ writingMode: 'vertical-lr' }}
        >
          Est. 2012
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent" />
      </motion.div>
    </section>
  );
};
