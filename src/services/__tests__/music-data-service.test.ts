import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { musicDataService } from '../music-data-service.ts';

describe('MusicDataService.getArtistVideos error handling', () => {
    let originalFetch: typeof globalThis.fetch;
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        vi.stubEnv('VITE_YOUTUBE_API_KEY', 'test-youtube-api-key');
        vi.stubEnv('VITE_SPOTIFY_CLIENT_ID', 'test-spotify-id');

        originalFetch = globalThis.fetch;
        consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        globalThis.fetch = originalFetch;
        consoleWarnSpy.mockRestore();
    });

    it('should return artist specific mock data when fetch throws an error', async () => {
        const fetchError = new Error('Network failure');
        globalThis.fetch = vi.fn().mockRejectedValue(fetchError);

        const result = await musicDataService.getArtistVideos('Summer Walker');

        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
        const fetchCallUrl = vi.mocked(globalThis.fetch).mock.calls[0][0];
        expect(typeof fetchCallUrl === 'string' && fetchCallUrl.includes('youtube')).toBe(true);

        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith('YouTube API fetch failed, falling back to mock data:', fetchError);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0].artist).toBe('Summer Walker');
        expect(result[0].title).toBe('Heart of a Woman');
        expect(result[1].title).toBe('Girls Need Love');
    });

    it('should return 6LACK mock data when fetch throws an error and artist is unknown', async () => {
        const fetchError = new Error('500 Internal Server Error');
        globalThis.fetch = vi.fn().mockRejectedValue(fetchError);

        const result = await musicDataService.getArtistVideos('UnknownArtist');

        // Note: For 'UnknownArtist', there is no config in ARTIST_CONFIG, so it won't even try to fetch
        expect(globalThis.fetch).not.toHaveBeenCalled();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0].artist).toBe('6LACK');
        expect(result[0].title).toBe('Since I Have A Lover');
    });

    it('should return 6LACK mock data when fetch throws an error but no fallback exists for artist', async () => {
        const fetchError = new Error('Fetch failed');
        globalThis.fetch = vi.fn().mockRejectedValue(fetchError);

        // 'Odeal' is in ARTIST_CONFIG but not in MOCK_VIDEOS
        const result = await musicDataService.getArtistVideos('Odeal');

        expect(globalThis.fetch).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
        expect(consoleWarnSpy).toHaveBeenCalledWith('YouTube API fetch failed, falling back to mock data:', fetchError);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0].artist).toBe('6LACK');
        expect(result[0].title).toBe('Since I Have A Lover');
    });
});
