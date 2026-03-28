import { performance } from 'perf_hooks';
import { ARTISTS } from './constants.js'; // Might need to compile or run via tsx

const ARTIST_MAP = ARTISTS.reduce((acc, artist) => {
    acc[artist.name] = artist;
    return acc;
}, {});

function benchmark() {
    const namesToFind = ['6LACK', 'Summer Walker', 'Odeal', 'Genio & GMK', 'NonExistent'];

    // Warmup
    for (let i = 0; i < 10000; i++) {
        namesToFind.map(n => ARTISTS.find(a => a.name === n));
    }

    const startFind = performance.now();
    for (let i = 0; i < 100000; i++) {
        namesToFind.map(n => ARTISTS.find(a => a.name === n));
    }
    const endFind = performance.now();

    // Warmup map
    for (let i = 0; i < 10000; i++) {
        namesToFind.map(n => ARTIST_MAP[n]);
    }

    const startMap = performance.now();
    for (let i = 0; i < 100000; i++) {
        namesToFind.map(n => ARTIST_MAP[n]);
    }
    const endMap = performance.now();

    console.log(`Array.find() took: ${(endFind - startFind).toFixed(2)}ms`);
    console.log(`Map lookup took: ${(endMap - startMap).toFixed(2)}ms`);
    console.log(`Improvement: ${(((endFind - startFind) - (endMap - startMap)) / (endFind - startFind) * 100).toFixed(2)}%`);
}

benchmark();
