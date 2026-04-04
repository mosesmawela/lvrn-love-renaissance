// Component barrel exports for cleaner imports
// This file centralizes all component imports for better code organization

import { lazy } from 'react';

// Layout Components - Eager loaded (critical path)
export { Navbar } from './Navbar';
export { Logo } from './Logo';
export { EntryScreen } from './EntryScreen';
export { GlobalPlayer } from './GlobalPlayer';
export { NotificationContainer } from './Notification';
export { ExperienceProvider, useExperience } from './ExperienceProvider';

// UI Components - Eager loaded (shared)
export { GlassCard } from './GlassCard';
export { MediaPlayer } from './MediaPlayer';
export { MagneticButton } from './MagneticButton';
export { TextReveal } from './TextReveal';

// Lazy loaded page components with prefetch hints
export const Hero = lazy(() => import('./Hero').then(m => ({ default: m.Hero })));
export const NewReleases = lazy(() => import('./NewReleases').then(m => ({ default: m.NewReleases })));
export const Trending = lazy(() => import('./Trending').then(m => ({ default: m.Trending })));
export const Playlist = lazy(() => import('./Playlist').then(m => ({ default: m.Playlist })));
export const Founders = lazy(() => import('./Founders').then(m => ({ default: m.Founders })));
export const Roster = lazy(() => import('./Roster').then(m => ({ default: m.Roster })));
export const Timeline = lazy(() => import('./Timeline').then(m => ({ default: m.Timeline })));
export const Stats = lazy(() => import('./Stats').then(m => ({ default: m.Stats })));
export const SpotifyFeature = lazy(() => import('./SpotifyFeature').then(m => ({ default: m.SpotifyFeature })));
export const Foundation = lazy(() => import('./Foundation').then(m => ({ default: m.Foundation })));
export const AiAssistant = lazy(() => import('./AiAssistant').then(m => ({ default: m.AiAssistant })));
export const SocialHub = lazy(() => import('./SocialHub').then(m => ({ default: m.SocialHub })));
export const BookingHub = lazy(() => import('./BookingHub').then(m => ({ default: m.BookingHub })));
export const BookingForm = lazy(() => import('./BookingForm').then(m => ({ default: m.BookingForm })));
export const Playroom = lazy(() => import('./Playroom').then(m => ({ default: m.Playroom })));
export const ArtistProfile = lazy(() => import('./ArtistProfile').then(m => ({ default: m.ArtistProfile })));
export const ArtistSection = lazy(() => import('./ArtistSection').then(m => ({ default: m.ArtistSection })));
export const MusicVideos = lazy(() => import('./MusicVideos').then(m => ({ default: m.MusicVideos })));
export const ReleasesPage = lazy(() => import('./ReleasesPage').then(m => ({ default: m.ReleasesPage })));
export const TourPage = lazy(() => import('./TourPage').then(m => ({ default: m.TourPage })));
export const MerchStore = lazy(() => import('./MerchStore').then(m => ({ default: m.MerchStore })));
export const Artist3DCarousel = lazy(() => import('./Artist3DCarousel').then(m => ({ default: m.Artist3DCarousel })));
export const MeetTheTeam = lazy(() => import('./MeetTheTeam').then(m => ({ default: m.MeetTheTeam })));
export const DJPacks = lazy(() => import('./DJPacks').then(m => ({ default: m.DJPacks })));

// Types
export type { CartItem } from './MerchStore';
