import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function cleanAndBuild(fsModule = fs, execSyncModule = execSync, dir = __dirname) {
    const distPath = path.join(dir, 'dist');
    const viteCachePath = path.join(dir, 'node_modules', '.vite');

    console.log('Cleaning build artifacts...');

    try {
        if (fsModule.existsSync(distPath)) {
            fsModule.rmSync(distPath, { recursive: true, force: true });
            console.log('Removed dist folder.');
        }
        if (fsModule.existsSync(viteCachePath)) {
            fsModule.rmSync(viteCachePath, { recursive: true, force: true });
            console.log('Removed Vite cache.');
        }
    } catch (e) {
        console.error('Error during cleanup:', e);
    }

    console.log('Starting build...');
    try {
        execSyncModule('npm run build', { stdio: 'inherit' });
        console.log('Build completed successfully.');
    } catch (e) {
        console.error('Build failed:', e);
        process.exit(1);
    }
}

// Automatically run if it's the main module
if (process.argv[1] === __filename) {
    cleanAndBuild();
}
