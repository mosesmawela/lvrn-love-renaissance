import React, { useRef, useState, useEffect, lazy, Suspense, memo } from 'react';
const Hero = React.lazy(() => import('./components/Hero').then(m => ({ default: m.Hero })));
const NewReleases = React.lazy(() => import('./components/NewReleases').then(m => ({ default: m.NewReleases })));
const Trending = React.lazy(() => import('./components/Trending').then(m => ({ default: m.Trending })));
const Playlist = React.lazy(() => import('./components/Playlist').then(m => ({ default: m.Playlist })));
const Founders = React.lazy(() => import('./components/Founders').then(m => ({ default: m.Founders })));
const Roster = React.lazy(() => import('./components/Roster').then(m => ({ default: m.Roster })));
const Timeline = React.lazy(() => import('./components/Timeline').then(m => ({ default: m.Timeline })));
const Stats = React.lazy(() => import('./components/Stats').then(m => ({ default: m.Stats })));
const SpotifyFeature = React.lazy(() => import('./components/SpotifyFeature').then(m => ({ default: m.SpotifyFeature })));
const Foundation = React.lazy(() => import('./components/Foundation').then(m => ({ default: m.Foundation })));
const AiAssistant = React.lazy(() => import('./components/AiAssistant').then(m => ({ default: m.AiAssistant })));
const SocialHub = React.lazy(() => import('./components/SocialHub').then(m => ({ default: m.SocialHub })));
const BookingHub = React.lazy(() => import('./components/BookingHub').then(m => ({ default: m.BookingHub })));
const BookingForm = React.lazy(() => import('./components/BookingForm').then(m => ({ default: m.BookingForm })));
const Playroom = React.lazy(() => import('./components/Playroom').then(m => ({ default: m.Playroom })));
const ArtistProfile = React.lazy(() => import('./components/ArtistProfile').then(m => ({ default: m.ArtistProfile })));
const MusicVideos = React.lazy(() => import('./components/MusicVideos').then(m => ({ default: m.MusicVideos })));
const ReleasesPage = React.lazy(() => import('./components/ReleasesPage').then(m => ({ default: m.ReleasesPage })));
const TourPage = React.lazy(() => import('./components/TourPage').then(m => ({ default: m.TourPage })));
const MerchStore = React.lazy(() => import('./components/MerchStore').then(m => ({ default: m.MerchStore })));
const Artist3DCarousel = React.lazy(() => import('./components/Artist3DCarousel').then(m => ({ default: m.Artist3DCarousel })));
const MeetTheTeam = React.lazy(() => import('./components/MeetTheTeam').then(m => ({ default: m.MeetTheTeam })));
const DJPacks = React.lazy(() => import('./components/DJPacks').then(m => ({ default: m.DJPacks })));
import { Navbar } from './components/Navbar';
import { Logo } from './components/Logo';
import { PHILOSOPHY, SOCIAL_LINKS, MerchProduct, ARTISTS } from './constants';
import { GlassCard } from './components/GlassCard';
import { CartItem } from './components/MerchStore';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Disc, Users, Briefcase } from 'lucide-react';
import { Artist } from './types';
import { ExperienceProvider, useExperience } from './components/ExperienceProvider';
import { EntryScreen } from './components/EntryScreen';
import { GlobalPlayer } from './components/GlobalPlayer';
import { NotificationContainer } from './components/Notification';

// Page Transition Wrapper
const PageTransition = memo(({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="min-h-screen pt-20"
  >
    {children}
  </motion.div>
));

// Section Wrapper
const Section = memo(({ title, subtitle, children, className = "" }: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`py-20 px-6 md:px-12 max-w-[1600px] mx-auto relative ${className}`}>
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          {subtitle && (
            <div className="flex items-center gap-4 mb-4">
              <span className="label-text">{subtitle}</span>
              <div className="accent-line" />
            </div>
          )}
          {title && (
            <h2 className="display-heading text-5xl md:text-7xl lg:text-8xl text-[var(--text-color)]">
              {title}
            </h2>
          )}
        </motion.div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

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

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    showNotification(`Switched to ${newMode ? 'Dark' : 'Light'} Mode`, "info");
  };

  const handleNavigate = (pageId: string) => {
    if (pageId === activePage) return;
    setActivePage(pageId);
    setViewingArtist(null);
    setShowBookingHub(false);
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingHub = () => {
    setShowBookingHub(true);
    showNotification("Loading Booking Roster...", "info");
  };

  const handleSelectBookingArtist = (artist: Artist) => {
    setSelectedBookingArtist(artist);
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedBookingArtist(null);
  };

  // --- Cart Functions ---
  const handleAddToCart = (product: MerchProduct, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => item.cartId === existing.cartId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1, cartId: crypto.randomUUID() }];
    });
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // --- Page Renderers ---

  const renderHome = () => (
    <PageTransition>
      <Hero />
      <div className="bg-gradient-to-b from-transparent to-[var(--accent)]/5">
        <NewReleases />
      </div>
      <Section title="Featured Artists" subtitle="Voices of the Future">
        <div className="mt-8">
          <Artist3DCarousel
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
      <Trending />
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
      <MusicVideos />
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
    <div className="min-h-screen text-[var(--text-color)] selection:bg-[var(--accent)]/30 transition-colors duration-300 bg-[var(--bg-color)]">

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
        {/* Conditionally hide Navbar if viewing specific artist profile to avoid clutter */}
        <div className={viewingArtist ? 'hidden md:block' : 'block'}>
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