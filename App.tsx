import React, { useRef, useState, useEffect, Suspense, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Disc, Users, Briefcase } from 'lucide-react';
import { PHILOSOPHY, SOCIAL_LINKS, ARTISTS, ARTIST_MAP } from './constants';
import { Artist, MerchProduct } from './types';

// Barrel imports for cleaner code organization
import {
  Navbar, Logo, EntryScreen, GlobalPlayer, NotificationContainer,
  ExperienceProvider, useExperience, GlassCard
} from './components';

// Lazy loaded page components
import {
  Hero, NewReleases, Trending, Playlist, Founders, Roster,
  Timeline, Stats, SpotifyFeature, Foundation, AiAssistant,
  SocialHub, BookingHub, BookingForm, Playroom, ArtistProfile,
  MusicVideos, ReleasesPage, TourPage, MerchStore, Artist3DCarousel,
  MeetTheTeam, DJPacks, FeaturedArtists
} from './components';

import type { CartItem } from './components';

// Page Transition Wrapper with reduced motion support
const PageTransition = memo(({ children, pageName }: { children: React.ReactNode; pageName?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="min-h-screen pt-20"
    role="main"
    aria-label={pageName ? `${pageName} page` : 'Page content'}
  >
    {children}
  </motion.div>
));

PageTransition.displayName = 'PageTransition';

// Section Wrapper with accessibility
interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = memo(({ title, subtitle, children, className = "", id }: SectionProps) => {
  return (
    <section
      className={`py-20 px-6 md:px-12 max-w-[1600px] mx-auto relative ${className}`}
      id={id}
      aria-label={title}
    >
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          {subtitle && (
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)]">{subtitle}</span>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-[var(--accent)] to-transparent" />
            </div>
          )}
          {title && (
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-[var(--text-color)] tracking-tight">
              {title}
            </h2>
          )}
        </motion.div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';

const AppContent: React.FC = () => {
  const [showBookingHub, setShowBookingHub] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedBookingArtist, setSelectedBookingArtist] = useState<Artist | null>(null);
  const [inPlayroom, setInPlayroom] = useState(false);

  // Artist Profile View
  const [viewingArtist, setViewingArtist] = useState<Artist | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Experience / Navigation Hook
  const { targetSection, clearNavigation, notifications, removeNotification, showNotification, toggleAudio } = useExperience();

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState('home');

  // Apply Theme Class
  useEffect(() => {
    document.body.className = isDarkMode ? '' : 'theme-light';
  }, [isDarkMode]);

  // Memoized callbacks for better performance
  const toggleTheme = useCallback(() => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    showNotification(`Switched to ${newMode ? 'Dark' : 'Light'} Mode`, "info");
  }, [isDarkMode, showNotification]);

  // Centralized Escape & Global Key Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showBookingForm) {
          handleCloseBookingForm();
        } else if (showBookingHub) {
          setShowBookingHub(false);
        } else if (viewingArtist) {
          setViewingArtist(null);
        } else if (inPlayroom) {
          setInPlayroom(false);
        } else if (isCartOpen) {
          setIsCartOpen(false);
        }
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        if (activePage !== 'artists') {
          handleNavigate('artists');
        }
      }

      if (e.key === 'm' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        toggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showBookingForm, showBookingHub, inPlayroom, viewingArtist, activePage, toggleAudio, isCartOpen]);

  // Handle Global Navigation Events
  useEffect(() => {
    if (targetSection) {
      if (targetSection === 'playroom') {
        setInPlayroom(true);
      } else if (targetSection === 'booking') {
        setShowBookingHub(true);
      } else {
        setInPlayroom(false);
        setShowBookingHub(false);
        setViewingArtist(null);

        const pageMap: Record<string, string> = {
          'hero': 'home',
          'roster': 'artists',
          'playlist': 'radio',
          'about': 'story',
          'socials': 'connect',
          'videos': 'videos',
          'shop': 'shop',
          'releases': 'releases',
          'tour': 'tour'
        };
        setActivePage(pageMap[targetSection] || targetSection);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      clearNavigation();
    }
  }, [targetSection, clearNavigation]);

  const handleNavigate = useCallback((pageId: string) => {
    if (pageId === activePage) return;
    setActivePage(pageId);
    if (pageId !== 'artists') setViewingArtist(null);
    setShowBookingHub(false);
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleOpenBookingHub = useCallback(() => {
    setShowBookingHub(true);
    showNotification("Loading Booking Roster...", "info");
  }, [showNotification]);

  const handleSelectBookingArtist = useCallback((artist: Artist) => {
    setSelectedBookingArtist(artist);
    setShowBookingForm(true);
  }, []);

  const handleCloseBookingForm = useCallback(() => {
    setShowBookingForm(false);
    setSelectedBookingArtist(null);
  }, []);

  // --- Cart Functions with useCallback ---
  const handleAddToCart = useCallback((product: MerchProduct, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => item.cartId === existing.cartId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1, cartId: crypto.randomUUID() }];
    });
  }, []);

  const handleRemoveFromCart = useCallback((cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  // --- Page Renderers ---

  const renderHome = () => (
    <PageTransition>
      <Hero />
      <Trending 
        onViewProfile={(artist) => {
          setViewingArtist(artist);
          handleNavigate('artists');
        }} 
      />
      <Section title="Featured Artists" subtitle="Voices of the Future">
        <div className="mt-8">
          <FeaturedArtists
            artists={ARTISTS.filter(a => a.category === 'Signed' || a.category === 'Management')}
            onSelect={(artist) => {
              setViewingArtist(artist);
              handleNavigate('artists');
            }}
          />
        </div>
      </Section>
    </PageTransition>
  );

  const renderArtists = () => {
    if (viewingArtist) {
      return (
        <ArtistProfile
          artist={viewingArtist}
          onBack={() => setViewingArtist(null)}
          onBook={handleSelectBookingArtist}
        />
      );
    }
    return (
      <PageTransition>
        <Section title="The Roster" subtitle="Voices that define a generation.">
          <Stats />
          <div className="mt-12">
            <Roster onViewProfile={setViewingArtist} />
          </div>
        </Section>
      </PageTransition>
    );
  };

  const renderRadio = () => (
    <PageTransition>
      <Trending 
        onViewProfile={(artist) => {
          setViewingArtist(artist);
          handleNavigate('artists');
        }} 
      />
      <Section title="LVRN Radio" subtitle="On Rotation">
        <Playlist />
      </Section>
    </PageTransition>
  );

  const renderStory = () => (
    <PageTransition>
      <Section title="Our Story" subtitle="Authenticity in an industry of noise.">
        <div className="grid md:grid-cols-12 gap-12 items-start mb-20">
          <div className="md:col-span-8 space-y-6 text-lg text-[var(--text-secondary)] font-light leading-relaxed">
            <p>
              <strong className="text-[var(--text-color)] font-semibold">Love Renaissance (LVRN)</strong> was born in 2012 from a vision to transform the music industry. Founded by five Georgia State University students who turned a rivalry into a revolution, LVRN set out to make genuine emotion cool again.
            </p>
            <p>
              Drawing inspiration from the Harlem Renaissance, we act as a bridge between classic artistic values and the modern digital age. We aren't just a label; it's a creative agency, management firm, and cultural incubator committed to creating opportunities and supporting our community.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[var(--text-color)]/10">
              <div className="flex items-center space-x-3 text-sm text-[var(--text-secondary)]">
                <MapPin className="text-[var(--accent)]" size={20} />
                <span>Atlanta, GA</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-[var(--text-secondary)]">
                <Disc className="text-[var(--accent)]" size={20} />
                <span>Sony Orchard</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-[var(--text-secondary)]">
                <Users className="text-[var(--accent)]" size={20} />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-[var(--text-secondary)]">
                <Briefcase className="text-[var(--accent)]" size={20} />
                <span>$100M+ Valuation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-[var(--text-color)]">The Founders</h3>
          <Founders />
        </div>
      </Section>

      <div className="bg-[var(--text-color)]/[0.01]">
        <Section title="Legacy" subtitle="A history of breaking barriers.">
          <Timeline />
        </Section>
      </div>

      <Section title="Philosophy">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {PHILOSOPHY.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full">
                <h3 className="text-xl font-bold mb-3 text-[var(--text-color)]">{item.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        <SpotifyFeature />
      </Section>

      <div className="bg-gradient-to-b from-[var(--bg-color)] to-[var(--accent)]/5">
        <Foundation />
      </div>
    </PageTransition>
  );

  const renderConnect = () => (
    <PageTransition>
      <SocialHub />
    </PageTransition>
  );

  // New Page Renderers
  const renderVideos = () => (
    <PageTransition>
      <MusicVideos onNavigate={handleNavigate} />
    </PageTransition>
  );

  const renderReleases = () => (
    <PageTransition>
      <ReleasesPage />
    </PageTransition>
  );

  const renderShop = () => (
    <PageTransition>
      <MerchStore
        cart={cart}
        isCartOpen={isCartOpen}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </PageTransition>
  );

  const renderTour = () => (
    <PageTransition>
      <TourPage />
    </PageTransition>
  );

  const renderTeam = () => (
    <PageTransition>
      <MeetTheTeam />
    </PageTransition>
  );

  const renderDJPacks = () => (
    <PageTransition>
      <DJPacks />
    </PageTransition>
  );

  return (
    <div className="min-h-screen text-[var(--text-color)] selection:bg-[var(--accent)]/30 transition-colors duration-300 bg-[var(--bg-color)] font-body">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      <EntryScreen />

      <GlobalPlayer forceMinimize={inPlayroom} />

      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />

      {/* Playroom Overlay */}
      <AnimatePresence>
        {inPlayroom && (
          <Playroom onExit={() => setInPlayroom(false)} />
        )}
      </AnimatePresence>

      <div className={inPlayroom ? 'hidden' : 'block'}>
        {/* Conditionally hide Navbar if viewing specific artist profile or on videos page to avoid clutter */}
        <div className={(viewingArtist || activePage === 'videos') ? 'hidden md:block' : 'block'}>
          <div className={activePage === 'videos' ? 'hidden' : 'block'}>
            <Navbar
              onNavigate={handleNavigate}
              onOpenBookings={handleOpenBookingHub}
              onEnterPlayroom={() => setInPlayroom(true)}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              activeSection={activePage}
              cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
              onOpenCart={() => {
                if (activePage !== 'shop') handleNavigate('shop');
                setTimeout(() => setIsCartOpen(true), 100);
              }}
            />
          </div>
        </div>

        {/* Booking Overlays */}
        <AnimatePresence>
          {showBookingHub && (
            <motion.div
              className="fixed inset-0 z-40 bg-[var(--bg-color)] overflow-y-auto"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <BookingHub
                onSelectArtist={handleSelectBookingArtist}
                onClose={() => setShowBookingHub(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBookingForm && (
            <BookingForm
              onClose={handleCloseBookingForm}
              preSelectedArtist={selectedBookingArtist}
            />
          )}
        </AnimatePresence>

        {/* Main Page Content */}
        <AnimatePresence mode='wait'>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div></div>}>
            <React.Fragment key={activePage}>
              {activePage === 'home' && renderHome()}
              {activePage === 'releases' && renderReleases()}
              {activePage === 'videos' && renderVideos()}
              {activePage === 'artists' && renderArtists()}
              {activePage === 'shop' && renderShop()}
              {activePage === 'tour' && renderTour()}
              {activePage === 'radio' && renderRadio()}
              {activePage === 'story' && renderStory()}
              {activePage === 'connect' && renderConnect()}
              {activePage === 'team' && renderTeam()}
              {activePage === 'djpacks' && renderDJPacks()}
            </React.Fragment>
          </Suspense>
        </AnimatePresence>

        {!viewingArtist && !isCartOpen && (
          <footer className="py-24 border-t border-[var(--text-color)]/10 bg-[var(--bg-color)] text-center relative overflow-hidden mt-12">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-[12vw] leading-none font-bold text-[var(--text-color)] opacity-[0.03] select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">LVRN</h2>
              <Logo className="h-12 w-auto mb-6 text-[var(--text-color)]" />
              <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-8 font-body">
                © {new Date().getFullYear()} Love Renaissance. All rights reserved. <br />
                Redefining culture from Atlanta to the World.
              </p>
              <div className="flex justify-center flex-wrap gap-8 text-[var(--text-muted)]">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent)] transition-colors text-xs uppercase tracking-[0.2em] font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        )}
      </div>

      <div className={inPlayroom ? 'hidden' : 'block'}>
        <AiAssistant />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ExperienceProvider>
      <AppContent />
    </ExperienceProvider>
  );
}