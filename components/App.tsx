import React, { useRef, useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { NewReleases } from './components/NewReleases';
import { Trending } from './components/Trending';
import { Playlist } from './components/Playlist';
import { Founders } from './components/Founders';
import { Roster } from './components/Roster';
import { Timeline } from './components/Timeline';
import { Stats } from './components/Stats';
import { SpotifyFeature } from './components/SpotifyFeature';
import { Foundation } from './components/Foundation';
import { AiAssistant } from './components/AiAssistant';
import { SocialHub } from './components/SocialHub';
import { Logo } from './components/Logo';
import { PHILOSOPHY, SOCIAL_LINKS } from './constants';
import { GlassCard } from './components/GlassCard';
import { BookingHub } from './components/BookingHub';
import { BookingForm } from './components/BookingForm';
import { Playroom } from './components/Playroom';
import { MeetTheTeam } from './MeetTheTeam';
import { DJPacks } from './DJPacks';
import { ArtistProfile } from './components/ArtistProfile'; // Import the new profile component
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Disc, Users, Briefcase, ArrowUp } from 'lucide-react';
import { Artist } from './types';
import { ExperienceProvider, useExperience } from './components/ExperienceProvider';
import { EntryScreen } from './components/EntryScreen';
import { GlobalPlayer } from './components/GlobalPlayer';
import { NotificationContainer } from './components/Notification';

// Page Transition Wrapper
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="min-h-screen pt-20" // Add padding top for fixed navbar
  >
    {children}
  </motion.div>
);

// Section Wrapper (kept for consistent spacing within pages)
const Section: React.FC<{
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`py-12 px-6 md:px-12 max-w-7xl mx-auto relative ${className}`}>
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {title && <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-[var(--text-color)]">{title}</h2>}
          {subtitle && (
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-transparent rounded-full mb-4" />
          )}
          {subtitle && <p className="text-xl text-[var(--text-secondary)] max-w-2xl">{subtitle}</p>}
        </motion.div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [showBookingHub, setShowBookingHub] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedBookingArtist, setSelectedBookingArtist] = useState<Artist | null>(null);
  const [inPlayroom, setInPlayroom] = useState(false);

  // New State for Artist Profile View
  const [viewingArtist, setViewingArtist] = useState<Artist | null>(null);

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
      // Escape Logic
      if (e.key === 'Escape') {
        if (showBookingForm) {
          handleCloseBookingForm();
        } else if (showBookingHub) {
          setShowBookingHub(false);
        } else if (viewingArtist) {
          setViewingArtist(null); // Close profile on Esc
        } else if (inPlayroom) {
          setInPlayroom(false);
        }
      }

      // Global Shortcuts (Cmd+K is handled in Roster, but we need to ensure Roster is visible)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        // If not on artists page, navigate there
        if (activePage !== 'artists') {
          handleNavigate('artists');
        }
      }

      // Audio Toggle
      if (e.key === 'm' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        toggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showBookingForm, showBookingHub, inPlayroom, viewingArtist, activePage, toggleAudio]);

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
        setViewingArtist(null); // Reset artist view on nav

        // Map legacy section IDs to new Page IDs
        const pageMap: Record<string, string> = {
          'hero': 'home',
          'roster': 'artists',
          'playlist': 'radio',
          'about': 'story',
          'socials': 'connect'
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
    setViewingArtist(null); // Ensure we exit profile view
    setShowBookingHub(false);
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

  // --- Page Renderers ---

  const renderHome = () => (
    <PageTransition>
      <Hero />
      <div className="bg-gradient-to-b from-transparent to-[var(--accent)]/5">
        <NewReleases />
      </div>
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
          <React.Fragment key={activePage}>
            {activePage === 'home' && renderHome()}
            {activePage === 'artists' && renderArtists()}
            {activePage === 'radio' && renderRadio()}
            {activePage === 'story' && renderStory()}
            {activePage === 'connect' && renderConnect()}
          </React.Fragment>
        </AnimatePresence>

        {!viewingArtist && (
          <footer className="py-12 border-t border-[var(--text-color)]/10 bg-[var(--bg-color)] text-center relative overflow-hidden mt-12">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <Logo className="h-8 w-auto mb-4 text-[var(--text-color)] opacity-90" />
              <h2 className="text-4xl font-black mb-6 tracking-tighter text-[var(--text-color)]">LVRN</h2>
              <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-8">
                © {new Date().getFullYear()} Love Renaissance. All rights reserved. <br />
                Redefining culture from Atlanta to the World.
              </p>
              <div className="flex justify-center flex-wrap gap-6 text-[var(--text-secondary)]">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--text-color)] transition-colors text-sm uppercase tracking-wider"
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