import { performance } from 'perf_hooks';

// Simulate the class and method we want to test
const MOCK_DATA = {
    '6LACK': {
        topTracks: Array.from({ length: 1000 }, (_, i) => ({
            name: `Track Name ${i} Some Words To Search`,
            album: `Album Name ${i} More Words To Search`
        }))
    }
};

class MusicDataService {
    async searchTracksOriginal(artistName, query = '') {
        const artistTracks = MOCK_DATA[artistName]?.topTracks || [];
        if (!query) return artistTracks;
        return artistTracks.filter(t =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.album.toLowerCase().includes(query.toLowerCase())
        );
    }

    async searchTracksOptimized(artistName, query = '') {
        const artistTracks = MOCK_DATA[artistName]?.topTracks || [];
        if (!query) return artistTracks;
        const lowerQuery = query.toLowerCase();
        return artistTracks.filter(t =>
            t.name.toLowerCase().includes(lowerQuery) ||
            t.album.toLowerCase().includes(lowerQuery)
        );
    }
}

async function runBenchmark() {
    const service = new MusicDataService();
    const ITERATIONS = 10000;

    console.log(`Running ${ITERATIONS} iterations on 1000 tracks...`);

    // Warmup
    for (let i = 0; i < 100; i++) {
        await service.searchTracksOriginal('6LACK', 'Words');
        await service.searchTracksOptimized('6LACK', 'Words');
    }

    // Benchmark Original
    const startOriginal = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        await service.searchTracksOriginal('6LACK', 'Words');
    }
    const endOriginal = performance.now();
    const durationOriginal = endOriginal - startOriginal;

    // Benchmark Optimized
    const startOptimized = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        await service.searchTracksOptimized('6LACK', 'Words');
    }
    const endOptimized = performance.now();
    const durationOptimized = endOptimized - startOptimized;

    console.log(`Original duration: ${durationOriginal.toFixed(2)} ms`);
    console.log(`Optimized duration: ${durationOptimized.toFixed(2)} ms`);
    console.log(`Improvement: ${((durationOriginal - durationOptimized) / durationOriginal * 100).toFixed(2)}%`);
}

runBenchmark().catch(console.error);
