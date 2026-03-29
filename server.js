
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

const distPath = path.join(__dirname, 'dist');
console.log('Serving static files from:', distPath);

// Serve static files from the dist directory
app.use(express.static(distPath));

// AI Proxy Route
app.post('/api/chat', async (req, res) => {
    try {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API Key missing' });
        }

        const ai = new GoogleGenAI({ apiKey });
        const { contents, systemInstruction } = req.body;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json'
            }
        });

        res.json({ text: response.text });
    } catch (error) {
        console.error('AI Proxy Error:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

// Explicit root route
app.get('/', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Handle SPA routing: return index.html for any unknown route
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Keep process alive
process.stdin.resume();
