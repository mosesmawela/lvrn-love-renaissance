export interface PlatformStats {
    popularity?: number;
    followers?: number;
    listeners?: number;
    plays?: number;
    views?: number;
    subscribers?: number;
    shazams?: number;
}

export interface UnifiedArtist {
    id: string;
    name: string;
    images: { url: string }[];
    spotify: PlatformStats;
    appleMusic: PlatformStats;
    youtube: PlatformStats;
}

export interface UnifiedTrack {
    id: string;
    name: string;
    album: string;
    image: string;
    platform: 'spotify' | 'apple' | 'youtube';
    metrics: PlatformStats;
    previewUrl?: string;
    externalUrl?: string;
}

export interface UnifiedVideo {
    id: string;
    title: string;
    artist: string;
    thumbnail: string;
    embedUrl: string;
    views: string;
    duration: string;
}

export interface UnifiedAnalyticsData {
    artist: UnifiedArtist;
    topTracks: UnifiedTrack[];
    globalMetrics: {
        totalReach: number;
        engagementRate: number;
        growthPercentage: number;
    };
}

const ARTIST_CONFIG: Record<string, { spotifyId?: string; youtubeId?: string; appleId?: string; }> = {
    '6LACK': {
        spotifyId: '4IVAbR2w4JJNJDDRFP3E83',
        youtubeId: 'UCg3p6u5PjCMA',
        appleId: '1016633280'
    },
    'Summer Walker': {
        spotifyId: '57LYzLEk2LcFghVwuWbcuS',
        youtubeId: 'UCsel1mCYFJ8U',
        appleId: '990402287'
    },
    'Odeal': {
        spotifyId: '4Z8vY9vY9vY9vY9vY9vY',
        youtubeId: 'UCwgGa9SgxhJI',
        appleId: '1485652541'
    },
    'Santi': {
        spotifyId: '1X7rsy8S666O_S0oR6J6x6',
        youtubeId: 'UCY2-oF4-vT0',
        appleId: '123456789'
    },
    'CIZA': {
        spotifyId: '71hPkbyih5bdlHVPBgav33',
        youtubeId: 'UC_CIZA_YT_ID',
        appleId: '1472059692'
    },
    'TxC': {
        spotifyId: '25j9xL1MTyuycuB2xy2Q9g',
        youtubeId: 'UC_TXC_YT_ID',
        appleId: '1626508795'
    }
};

const MOCK_DATA: Record<string, UnifiedAnalyticsData> = {
    '6LACK': {
        artist: {
            id: '1',
            name: '6LACK',
            images: [{ url: 'https://ik.imagekit.io/mosesmawela/Artist%20Roster/6lack' }],
            spotify: { popularity: 82, followers: 2200000, listeners: 15200000 },
            appleMusic: { plays: 24000000, listeners: 8400000, shazams: 1200000 },
            youtube: { views: 850000000, subscribers: 1980000 }
        },
        topTracks: [
            { id: '1a', name: 'PRBLMS', album: 'FREE 6LACK', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop', platform: 'spotify', metrics: { popularity: 85 } },
            { id: '1b', name: 'Pretty Little Fears', album: 'East Atlanta Love Letter', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop', platform: 'apple', metrics: { plays: 1200000 } }
        ],
        globalMetrics: {
            totalReach: 32000000,
            engagementRate: 8.4,
            growthPercentage: 12.5
        }
    },
    'Summer Walker': {
        artist: {
            id: '2',
            name: 'Summer Walker',
            images: [{ url: 'https://ik.imagekit.io/mosesmawela/Summer-Walker.jpg' }],
            spotify: { popularity: 88, followers: 8400000, listeners: 22000000 },
            appleMusic: { plays: 45000000, listeners: 12500000, shazams: 3400000 },
            youtube: { views: 1200000000, subscribers: 2900000 }
        },
        topTracks: [
            { id: '2a', name: 'Playing Games', album: 'Over It', image: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=200&h=200&fit=crop', platform: 'spotify', metrics: { popularity: 92 } },
            { id: '2b', name: 'Girls Need Love', album: 'Last Day of Summer', image: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?w=200&h=200&fit=crop', platform: 'youtube', metrics: { views: 450000000 } }
        ],
        globalMetrics: {
            totalReach: 58000000,
            engagementRate: 9.2,
            growthPercentage: 15.8
        }
    },
    'Odeal': {
        artist: {
            id: '3',
            name: 'Odeal',
            images: [{ url: 'https://ik.imagekit.io/mosesmawela/odeal.jpeg' }],
            spotify: { popularity: 75, followers: 392000, listeners: 4200000 },
            appleMusic: { plays: 15000000, listeners: 3200000, shazams: 450000 },
            youtube: { views: 45000000, subscribers: 356000 }
        },
        topTracks: [
            { id: '3a', name: 'Coffee', album: 'Coffee', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&h=200&fit=crop', platform: 'spotify', metrics: { popularity: 78 } },
            { id: '3b', name: 'Be Easy', album: 'Be Easy', image: 'https://images.unsplash.com/photo-1459749411177-042180ceea72?w=200&h=200&fit=crop', platform: 'apple', metrics: { plays: 850000 } }
        ],
        globalMetrics: {
            totalReach: 12000000,
            engagementRate: 7.5,
            growthPercentage: 8.4
        }
    },
    'CIZA': {
        artist: {
            id: '4',
            name: 'CIZA',
            images: [{ url: 'https://ik.imagekit.io/mosesmawela/Artist%20Roster/Ciza' }],
            spotify: { popularity: 65, followers: 320000, listeners: 1200000 },
            appleMusic: { plays: 8000000, listeners: 1500000, shazams: 856000 },
            youtube: { views: 25000000, subscribers: 150000 }
        },
        topTracks: [
            { id: '4a', name: 'Bank Notification', album: 'Golden Boy Pack', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&h=200&fit=crop', platform: 'spotify', metrics: { popularity: 82 } },
            { id: '4b', name: 'Come Alive', album: 'Golden Boy Pack', image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=200&h=200&fit=crop', platform: 'apple', metrics: { plays: 500000 } }
        ],
        globalMetrics: {
            totalReach: 15000000,
            engagementRate: 8.1,
            growthPercentage: 22.4
        }
    },
    'TxC': {
        artist: {
            id: '5',
            name: 'TxC',
            images: [{ url: 'https://ik.imagekit.io/mosesmawela/Artist%20Roster/TXC' }],
            spotify: { popularity: 70, followers: 680000, listeners: 2100000 },
            appleMusic: { plays: 12000000, listeners: 2500000, shazams: 271000 },
            youtube: { views: 40000000, subscribers: 250000 }
        },
        topTracks: [
            { id: '5a', name: 'Turn Off The Lights', album: 'Turn Off The Lights', image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2e18?w=200&h=200&fit=crop', platform: 'spotify', metrics: { popularity: 75 } },
            { id: '5b', name: 'A Fierce Piano', album: 'A Fierce Piano', image: 'https://images.unsplash.com/photo-1558904541-efa8c1d6b815?w=200&h=200&fit=crop', platform: 'youtube', metrics: { views: 1200000 } }
        ],
        globalMetrics: {
            totalReach: 18000000,
            engagementRate: 7.8,
            growthPercentage: 18.2
        }
    }
};

const MOCK_VIDEOS: Record<string, UnifiedVideo[]> = {
    '6LACK': [
        { id: 'jJvDNyI7hG4', title: 'Since I Have A Lover', artist: '6LACK', thumbnail: 'https://img.youtube.com/vi/jJvDNyI7hG4/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/jJvDNyI7hG4', duration: '4:20', views: '5.1M' },
        { id: 'wgGa9SgxhJI', title: 'PRBLMS', artist: '6LACK', thumbnail: 'https://img.youtube.com/vi/wgGa9SgxhJI/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/wgGa9SgxhJI', duration: '4:06', views: '210M' }
    ],
    'Summer Walker': [
        { id: 'g3p6u5PjCMA', title: 'Heart of a Woman', artist: 'Summer Walker', thumbnail: 'https://img.youtube.com/vi/g3p6u5PjCMA/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/g3p6u5PjCMA', duration: '4:12', views: '2.4M' },
        { id: 'sel1mCYFJ8U', title: 'Girls Need Love', artist: 'Summer Walker', thumbnail: 'https://img.youtube.com/vi/sel1mCYFJ8U/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/sel1mCYFJ8U', duration: '3:42', views: '450M' }
    ],
    'CIZA': [
        { id: 'sel1mCYFJ8U', title: 'ISAKA (6AM)', artist: 'CIZA', thumbnail: 'https://img.youtube.com/vi/sel1mCYFJ8U/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/sel1mCYFJ8U', duration: '4:45', views: '1.2M' }
    ],
    'TxC': [
        { id: '8JZZvo-gJaU', title: 'Nakupenda', artist: 'TxC', thumbnail: 'https://img.youtube.com/vi/8JZZvo-gJaU/maxresdefault.jpg', embedUrl: 'https://www.youtube.com/embed/8JZZvo-gJaU', duration: '4:10', views: '800K' }
    ]
};

class MusicDataService {
    private cache = new Map<string, { data: UnifiedAnalyticsData, timestamp: number }>();
    private CACHE_DURATION = 1000 * 60 * 60; // 1 hour

    async getUnifiedAnalytics(artistName: string): Promise<UnifiedAnalyticsData> {
        const cacheKey = `analytics_${artistName}`;
        const cached = this.cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.data;
        }

        try {
            const spotifyId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;

            if (spotifyId && youtubeKey) {
                console.log(`Fetching real-time data for ${artistName}...`);
                // Actual API implementation would go here
            }
        } catch (error) {
            console.warn('Failed to fetch real-time analytics:', error);
        }

        const data = MOCK_DATA[artistName];
        if (!data) {
            console.warn(`No analytics data found for ${artistName}, returning empty stats.`);
            return {
                artist: { id: '0', name: artistName, images: [], spotify: {}, appleMusic: {}, youtube: {} },
                topTracks: [],
                globalMetrics: { totalReach: 0, engagementRate: 0, growthPercentage: 0 }
            };
        }
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    }

    async searchTracks(artistName: string, query: string = ''): Promise<UnifiedTrack[]> {
        const artistTracks = MOCK_DATA[artistName]?.topTracks || [];
        if (!query) return artistTracks;
        return artistTracks.filter(t =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.album.toLowerCase().includes(query.toLowerCase())
        );
    }

    async getArtistVideos(artistName: string): Promise<UnifiedVideo[]> {
        try {
            const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;
            const config = ARTIST_CONFIG[artistName];

            if (youtubeKey && config?.youtubeId) {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${config.youtubeId}&maxResults=10&order=viewCount&type=video&key=${youtubeKey}`);
                const data = await response.json();

                if (data.items) {
                    return data.items.map((item: { id: { videoId: string }, snippet: { title: string, thumbnails: { high: { url: string } } } }) => ({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        artist: artistName,
                        thumbnail: item.snippet.thumbnails.high.url,
                        embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
                        duration: '0:00',
                        views: 'Latest'
                    }));
                }
            }
        } catch (error) {
            console.warn('YouTube API fetch failed, falling back to mock data:', error);
        }

        return MOCK_VIDEOS[artistName] || MOCK_VIDEOS['6LACK'];
    }
}

export const musicDataService = new MusicDataService();
export type { UnifiedAnalyticsData as ArtistAnalyticsData };
