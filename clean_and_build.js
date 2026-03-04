
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const viteCachePath = path.join(__dirname, 'node_modules', '.vite');

console.log('Cleaning build artifacts...');

try {
    if (fs.existsSync(distPath)) {
        fs.rmSync(distPath, { recursive: true, force: true });
        console.log('Removed dist folder.');
    }
    if (fs.existsSync(viteCachePath)) {
        fs.rmSync(viteCachePath, { recursive: true, force: true });
        console.log('Removed Vite cache.');
    }
} catch (e) {
    console.error('Error during cleanup:', e);
}

console.log('Starting build...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Build completed successfully.');
} catch (e) {
    console.error('Build failed:', e);
    process.exit(1);
}
