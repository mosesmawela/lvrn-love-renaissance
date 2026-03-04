
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000; // New port as requested

const distPath = path.join(__dirname, 'dist');
console.log('Initializing Server V2...');
// Serve static files
app.use(express.static(distPath));

// API placeholder to confirm server identity
app.get('/api/status', (req, res) => {
    res.json({ status: 'active', server: 'LVRN Server V2', port: PORT });
});

// Explicit root route
app.get('/', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Serve dashboard.html for dashboard routes
app.get(/^\/dashboard(\/.*)?$/, (req, res) => {
    res.sendFile(path.join(distPath, 'dashboard.html'));
});

// Catch-all route for Main Site SPA
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    🚀 LVRN Server V2 is running!
    👉 Local:   http://localhost:${PORT}
    `);
});

process.stdin.resume();
