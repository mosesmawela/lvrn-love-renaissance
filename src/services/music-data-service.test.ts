import test from 'node:test';
import assert from 'node:assert';
import { musicDataService } from './music-data-service.ts';

test('MusicDataService - searchTracks', async (t) => {
    await t.test('returns all tracks when query is empty', async () => {
        const tracks = await musicDataService.searchTracks('6LACK', '');
        // 6LACK has 2 tracks in MOCK_DATA
        assert.strictEqual(tracks.length, 2);
        assert.strictEqual(tracks[0].name, 'PRBLMS');
        assert.strictEqual(tracks[1].name, 'Pretty Little Fears');
    });

    await t.test('returns all tracks when query is not provided', async () => {
        const tracks = await musicDataService.searchTracks('6LACK');
        assert.strictEqual(tracks.length, 2);
    });

    await t.test('filters tracks by name (case-insensitive)', async () => {
        // 'PRBLMS' is the track name
        const tracks1 = await musicDataService.searchTracks('6LACK', 'prblms');
        assert.strictEqual(tracks1.length, 1);
        assert.strictEqual(tracks1[0].name, 'PRBLMS');

        const tracks2 = await musicDataService.searchTracks('6LACK', 'PRETTY');
        assert.strictEqual(tracks2.length, 1);
        assert.strictEqual(tracks2[0].name, 'Pretty Little Fears');
    });

    await t.test('filters tracks by album (case-insensitive)', async () => {
        // 'FREE 6LACK' is the album name for PRBLMS
        const tracks1 = await musicDataService.searchTracks('6LACK', 'free');
        assert.strictEqual(tracks1.length, 1);
        assert.strictEqual(tracks1[0].name, 'PRBLMS');
        assert.strictEqual(tracks1[0].album, 'FREE 6LACK');

        // 'East Atlanta Love Letter' is the album name for Pretty Little Fears
        const tracks2 = await musicDataService.searchTracks('6LACK', 'atlanta');
        assert.strictEqual(tracks2.length, 1);
        assert.strictEqual(tracks2[0].name, 'Pretty Little Fears');
        assert.strictEqual(tracks2[0].album, 'East Atlanta Love Letter');
    });

    await t.test('returns empty array when no tracks match query', async () => {
        const tracks = await musicDataService.searchTracks('6LACK', 'nonexistent song');
        assert.strictEqual(tracks.length, 0);
    });

    await t.test('returns empty array for an unknown artist', async () => {
        const tracks = await musicDataService.searchTracks('Unknown Artist', 'query');
        assert.strictEqual(tracks.length, 0);
    });

    await t.test('returns empty array for an unknown artist with no query', async () => {
        const tracks = await musicDataService.searchTracks('Unknown Artist');
        assert.strictEqual(tracks.length, 0);
    });
});
