import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import { execSync } from 'child_process';

vi.mock('fs', () => {
    return {
        default: {
            existsSync: vi.fn(),
            rmSync: vi.fn(),
        }
    }
});

vi.mock('child_process', () => {
    return {
        execSync: vi.fn()
    }
});

describe('clean_and_build.js', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        // Mock console methods and process.exit to keep test output clean and verify behavior
        vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(process, 'exit').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should remove dist and .vite directories if they exist', async () => {
        fs.existsSync.mockImplementation((path) => {
            if (path.endsWith('dist') || path.endsWith('.vite')) return true;
            return false;
        });

        await import('./clean_and_build.js?update=1');

        expect(fs.rmSync).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenCalledWith('Removed dist folder.');
        expect(console.log).toHaveBeenCalledWith('Removed Vite cache.');
        expect(execSync).toHaveBeenCalledWith('npm run build', { stdio: 'inherit' });
    });

    it('should not attempt to remove directories if they do not exist', async () => {
        fs.existsSync.mockImplementation(() => false);

        await import('./clean_and_build.js?update=2');

        expect(fs.rmSync).not.toHaveBeenCalled();
        expect(console.log).not.toHaveBeenCalledWith('Removed dist folder.');
        expect(console.log).not.toHaveBeenCalledWith('Removed Vite cache.');
        expect(execSync).toHaveBeenCalledWith('npm run build', { stdio: 'inherit' });
    });

    it('should handle errors during directory removal gracefully', async () => {
        fs.existsSync.mockImplementation(() => true);
        const error = new Error('Permission denied');
        fs.rmSync.mockImplementation(() => { throw error; });

        await import('./clean_and_build.js?update=3');

        expect(console.error).toHaveBeenCalledWith('Error during cleanup:', error);
        // Still attempts to build even if cleanup fails
        expect(execSync).toHaveBeenCalledWith('npm run build', { stdio: 'inherit' });
    });

    it('should exit process with code 1 if build fails', async () => {
        fs.existsSync.mockImplementation(() => false);
        const error = new Error('Build failed');
        execSync.mockImplementation(() => { throw error; });

        await import('./clean_and_build.js?update=4');

        expect(console.error).toHaveBeenCalledWith('Build failed:', error);
        expect(process.exit).toHaveBeenCalledWith(1);
    });
});
