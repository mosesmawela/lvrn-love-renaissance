import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Firebase Initialization', () => {
    let originalWarn: typeof console.warn;

    beforeEach(() => {
        originalWarn = console.warn;
        console.warn = vi.fn();
        vi.resetModules();
    });

    afterEach(() => {
        console.warn = originalWarn;
        vi.unstubAllEnvs();
    });

    it('should warn when Firebase API Key is missing', async () => {
        vi.stubEnv('VITE_FIREBASE_API_KEY', '');

        await import('./firebase');

        expect(console.warn).toHaveBeenCalledWith(
            'Firebase API Key is missing or placeholder. Skipping Firebase initialization.'
        );
    });

    it('should warn when Firebase API Key is placeholder', async () => {
        vi.stubEnv('VITE_FIREBASE_API_KEY', 'YOUR_FIREBASE_API_KEY');

        await import('./firebase');

        expect(console.warn).toHaveBeenCalledWith(
            'Firebase API Key is missing or placeholder. Skipping Firebase initialization.'
        );
    });
});
