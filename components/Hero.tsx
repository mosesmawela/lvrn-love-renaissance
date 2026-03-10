import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { useExperience } from './ExperienceProvider';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export const Hero: React.FC = () => {
  const { showNotification } = useExperience();
  const linktreeUrl = SOCIAL_LINKS.find(l => l.name === 'Linktree')?.url || '#';
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const { scrollY } = useScroll();

  // Scroll Animations for Logo
  const rotate = useTransform(scrollY, [0, 600], [0, 180]);
  const scale = useTransform(scrollY, [0, 600], [1, 5]); // Scale up to become background
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 0.4, 0]); // Fade out slowly
  const blur = useTransform(scrollY, [0, 400], [0, 20]);
  const filter = useTransform(blur, (v) => `blur(${v}px) var(--logo-filter)`);

  useEffect(() => {
    if (!textRef.current) return;

    const phrases = [
      "Redefining the sound of the future through authentic expression.",
      "Leading the next wave of global creative culture.",
      "Authentic expression and cultural rebirth.",
      "Love Renaissance: Where culture meets creation."
    ];

    const cursor = document.createElement('span');
    cursor.textContent = '●';
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
      ease: "power2.inOut"
    });

    const timeline = gsap.timeline({ repeat: -1 });

    phrases.forEach((phrase) => {
      // Type out
      timeline.to(textRef.current, {
        duration: phrase.length * 0.05,
        text: {
          value: phrase,
          delimiter: ""
        },
        ease: "none"
      });

      // Pause
      timeline.to({}, { duration: 2 });

      // Delete
      timeline.to(textRef.current, {
        duration: phrase.length * 0.02,
        text: {
          value: "",
          delimiter: ""
        },
        ease: "none"
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
    showNotification("Opening Linktree in new tab...", "info");
    setTimeout(() => {
      window.open(linktreeUrl, '_blank');
    }, 500);
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fluid Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blob 1 - Orange/Amber */}
        <motion.div
          className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full blur-[150px] mix-blend-screen opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.9) 0%, rgba(234,88,12,0) 70%)' }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        {/* Blob 2 - Warm Tone */}
        <motion.div
          className="absolute bottom-[-20%] right-[-20%] w-[90vw] h-[90vw] rounded-full blur-[150px] mix-blend-screen opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.9) 0%, rgba(249,115,22,0) 70%)' }}
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--text-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--text-color) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main Logo Animation */}
      <motion.div
        className="fixed top-1/2 left-1/2 z-1 pointer-events-none origin-center"
        style={{
          x: "-50%",
          y: "-50%", // Center the fixed element
          rotate,
          scale,
          opacity,
          filter
        }}
      >
        <img
          src="https://ik.imagekit.io/mosesmawela/LOGO/logo.svg?updatedAt=1769936404900"
          alt="LVRN"
          className="w-[280px] h-[280px] md:w-[450px] md:h-[450px] object-contain"
        />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-end min-h-screen pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }} // Custom Ease
          className="flex flex-col items-center text-center w-full"
        >
          {/* Spacer to push content below the central logo */}
          <div className="h-[200px] md:h-[300px]" />

          <div className="mb-10 w-full flex justify-center min-h-[120px]">
            <p
              ref={textRef}
              className="text-2xl md:text-3xl lg:text-4xl leading-tight text-center max-w-3xl"
            >
              {/* Text populated via GSAP */}
            </p>
          </div>

          <motion.button
            onClick={handleConnect}
            className="btn-luxury"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Connect</span>
            <ExternalLink size={16} className="inline-block ml-3 relative z-10" />
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="text-[var(--text-color)]/30 w-6 h-6" />
      </motion.div>
    </section>
  );
};