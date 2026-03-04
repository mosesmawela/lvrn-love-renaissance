import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ShoppingBag } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onNavigate: (pageId: string) => void;
  onOpenBookings: () => void;
  onEnterPlayroom: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  activeSection: string;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onOpenBookings, 
  onEnterPlayroom,
  isDarkMode,
  onToggleTheme,
  activeSection,
  cartCount = 0,
  onOpenCart
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'releases', label: 'Releases' },
    { id: 'videos', label: 'Videos' },
    { id: 'artists', label: 'Artists' },
    { id: 'team', label: 'Team' },
    { id: 'djpacks', label: 'DJ Packs' },
    { id: 'tour', label: 'Tour' },
    { id: 'shop', label: 'Shop' },
    { id: 'connect', label: 'Connect' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled 
            ? 'bg-[var(--nav-bg)] backdrop-blur-2xl border-b border-[var(--card-border)] py-3 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer z-50 group focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded-lg" 
            onClick={() => onNavigate('home')}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('home')}
            tabIndex={0}
            aria-label="Go to Homepage"
          >
            <Logo className="h-8 w-auto text-[var(--text-color)] transition-transform group-hover:scale-110" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/5 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`relative px-4 py-2 text-xs font-bold transition-colors uppercase tracking-wide rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                      isActive ? 'text-[var(--bg-color)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-color)]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-[var(--text-color)] rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="w-px h-6 bg-[var(--text-color)]/10" role="separator" />

            {/* Icons Group */}
            <div className="flex items-center gap-2">
                {/* Cart Button */}
                <button
                    onClick={onOpenCart}
                    className="relative p-2 rounded-full hover:bg-[var(--text-color)]/5 transition-colors border border-transparent hover:border-[var(--card-border)] group focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    title="View Cart"
                    aria-label="View Shopping Cart"
                >
                    <ShoppingBag size={18} className="text-[var(--text-color)]" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg">
                            {cartCount}
                        </span>
                    )}
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={onToggleTheme}
                    className="p-2 rounded-full hover:bg-[var(--text-color)]/5 transition-colors border border-transparent hover:border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
                    aria-label={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
                >
                    {isDarkMode ? (
                        <Sun size={18} className="text-[var(--text-color)]" />
                    ) : (
                        <Moon size={18} className="text-[var(--text-color)]" />
                    )}
                </button>
            </div>

            <div className="flex items-center gap-3">
               <button 
                onClick={onEnterPlayroom}
                className="px-6 py-3 border border-[var(--text-color)]/20 hover:bg-[var(--text-color)] hover:text-[var(--text-inverse)] text-[var(--text-color)] text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 focus:outline-none"
               >
                 Playroom
               </button>
               <button 
                onClick={onOpenBookings}
                className="btn-luxury text-xs"
               >
                 Bookings
               </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
             {/* Mobile Cart */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-[var(--text-color)]"
                aria-label="View Cart"
            >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </button>
            
            <button 
                className="z-50 p-2 text-[var(--text-color)]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label="Toggle Menu"
            >
                {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[var(--bg-color)] pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => {
                      onNavigate(link.id);
                      setMobileOpen(false);
                    }}
                    className={`text-5xl font-black text-left transition-colors tracking-tighter ${
                      activeSection === link.id 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-color)] to-[var(--text-secondary)]' 
                        : 'text-[var(--text-color)] hover:text-[var(--accent)]'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="h-px bg-[var(--text-color)]/10 w-full" />

              <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Appearance</p>
                  <button 
                    onClick={onToggleTheme}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-color)]"
                  >
                      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                      <span className="text-sm font-bold">{isDarkMode ? 'Light' : 'Dark'}</span>
                  </button>
              </div>

              <div className="flex flex-col gap-4 mt-4 pb-12">
                <button 
                  onClick={() => {
                    onEnterPlayroom();
                    setMobileOpen(false);
                  }}
                  className="w-full py-4 rounded-xl border border-[var(--text-color)]/20 text-[var(--text-color)] font-bold uppercase tracking-widest hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-all"
                >
                  Enter Playroom
                </button>
                <button 
                  onClick={() => {
                    onOpenBookings();
                    setMobileOpen(false);
                  }}
                  className="w-full py-4 rounded-xl bg-[var(--accent)] text-white font-bold uppercase tracking-widest shadow-lg"
                >
                  Book Artist
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};