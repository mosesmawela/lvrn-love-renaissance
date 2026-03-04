export interface Founder {
  name: string;
  role: string;
  description: string;
}

export interface Artist {
  name: string;
  category: 'Signed' | 'Management' | 'Publishing' | 'Africa';
  image?: string;
  description?: string;
  bio?: string;
  quote?: string;
  role?: string;
  bookingRate?: string;
  bookingRegion?: string;
  stats?: {
    followers: string;
    streams: string;
    playlists?: string;
    charts?: string;
    saves?: string;
    shazams?: string;
    creates?: string;
  };
  spotifyId?: string;
  appleMusicId?: string;
  youtubeId?: string;
  spotifyEmbedId?: string;
  appleMusicEmbedId?: string;
  spotifyArtistUrl?: string;
  appleMusicArtistUrl?: string;
  platformLinks?: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
  };
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface PhilosophyItem {
  title: string;
  description: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department: 'Executive' | 'A&R' | 'Marketing' | 'Operations' | 'Creative' | 'Publishing' | 'Legal' | 'Artist';
  image?: string;
  bio?: string;
}

export interface DJPack {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  trackCount: number;
  downloadUrl: string;
  size: string;
  format: string;
}