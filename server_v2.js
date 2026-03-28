
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000; // New port as requested

// Middleware for parsing JSON
app.use(express.json());

const distPath = path.join(__dirname, 'dist');
console.log('Initializing Server V2...');
// Serve static files
app.use(express.static(distPath));

// API placeholder to confirm server identity
app.get('/api/status', (req, res) => {
    const aiAvailable = !!(process.env.API_KEY || process.env.GEMINI_API_KEY);
    res.json({ status: 'active', server: 'LVRN Server V2', port: PORT, aiAvailable });
});

app.post('/api/chat', async (req, res) => {
    try {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API key not configured.' });
        }

        const { contents, systemInstruction } = req.body;
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
                systemInstruction,
                responseMimeType: 'application/json'
            }
        });

        res.json({ text: response.text });
    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ error: 'Failed to generate content.' });
    }
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
