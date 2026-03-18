import test, { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { musicDataService } from './music-data-service.ts';

describe('MusicDataService', () => {
    beforeEach(() => {
        // Clear the cache manually before each test.
        // The service exposes `cache` as private, so we reset it using generic access.
        (musicDataService as any).cache.clear();
    });

    describe('getUnifiedAnalytics', () => {
        it('should return mock data for a known artist', async () => {
            const artistName = '6LACK';
            const data = await musicDataService.getUnifiedAnalytics(artistName);

            assert.ok(data);
            assert.ok(data.artist);
            assert.strictEqual(data.artist.name, artistName);
            assert.ok(data.topTracks.length > 0);
            assert.ok(data.globalMetrics.totalReach > 0);
        });

        it('should return empty stats structure for an unknown artist', async () => {
            const unknownArtist = 'UnknownArtist';
            const data = await musicDataService.getUnifiedAnalytics(unknownArtist);

            assert.ok(data);
            assert.strictEqual(data.artist.id, '0');
            assert.strictEqual(data.artist.name, unknownArtist);
            assert.deepStrictEqual(data.topTracks, []);
            assert.strictEqual(data.globalMetrics.totalReach, 0);
            assert.strictEqual(data.globalMetrics.engagementRate, 0);
            assert.strictEqual(data.globalMetrics.growthPercentage, 0);
        });

        it('should return cached data on subsequent calls for the same artist', async () => {
            const artistName = 'Summer Walker';

            // By injecting fake data directly into the cache with a fresh timestamp, we can test cache hit
            const fakeFreshData = {
                artist: { id: 'test_hit', name: artistName, images: [], spotify: {}, appleMusic: {}, youtube: {} },
                topTracks: [],
                globalMetrics: { totalReach: 123456, engagementRate: 0, growthPercentage: 0 }
            };

            (musicDataService as any).cache.set(`analytics_${artistName}`, {
                data: fakeFreshData,
                timestamp: Date.now()
            });

            // Call the service, which should return the fake cached data since the cache is fresh
            const data = await musicDataService.getUnifiedAnalytics(artistName);

            assert.strictEqual(data.globalMetrics.totalReach, 123456);
            assert.strictEqual(data, fakeFreshData);
        });

        it('should fetch fresh data if cache is expired', async () => {
            const artistName = 'Odeal';

            // First call fetches the data
            await musicDataService.getUnifiedAnalytics(artistName);

            // Manually expire the cache entry by setting timestamp to a very old date
            const cacheEntry = (musicDataService as any).cache.get(`analytics_${artistName}`);
            assert.ok(cacheEntry);

            // Set timestamp to 2 hours ago
            cacheEntry.timestamp = Date.now() - (1000 * 60 * 60 * 2);

            // Mutate cached data properties directly. However, because getUnifiedAnalytics returns
            // MOCK_DATA directly without deep cloning, modifying cacheEntry.data modifies MOCK_DATA.
            // To properly test cache expiration without permanently mutating MOCK_DATA, we can inject a dummy object
            // into the cache for Odeal with an expired timestamp.
            const fakeExpiredData = {
                artist: { id: 'test', name: artistName, images: [], spotify: {}, appleMusic: {}, youtube: {} },
                topTracks: [],
                globalMetrics: { totalReach: 999999, engagementRate: 0, growthPercentage: 0 }
            };

            (musicDataService as any).cache.set(`analytics_${artistName}`, {
                data: fakeExpiredData,
                timestamp: Date.now() - (1000 * 60 * 60 * 2) // 2 hours ago
            });

            // Second call should realize cache is expired and fetch fresh data from MOCK_DATA
            const secondCallData = await musicDataService.getUnifiedAnalytics(artistName);

            // Total reach should NOT be the fake data's 999999, it should be Odeal's actual mock reach (12000000)
            assert.notStrictEqual(secondCallData.globalMetrics.totalReach, 999999);
            assert.strictEqual(secondCallData.globalMetrics.totalReach, 12000000);
        });
    });
});
