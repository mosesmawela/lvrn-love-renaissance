
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const distPath = path.join(__dirname, 'dist');
console.log('Serving static files from:', distPath);

// Serve static files from the dist directory
app.use(express.static(distPath));

// Explicit root route
app.get('/', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Handle SPA routing: return index.html for any unknown route
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Keep process alive
    process.stdin.resume();
}

export { app };
