# LVRN - Love Renaissance Experience

A high-fidelity, interactive web application showcasing the Love Renaissance (LVRN) record label. This project features a cinematic UI, 3D audio visualization, an AI-powered assistant, and a comprehensive booking system.

## Features

*   **Cinematic UI**: Smooth animations, glassmorphism, and particle effects using Framer Motion.
*   **AI Assistant**: Context-aware chat interface powered by Google Gemini 2.5 Flash.
*   **Interactive Playroom**: Audio-reactive visualizer (simulated and microphone input).
*   **Smart Booking System**: Multi-step form with predictive logistics and auto-currency detection.
*   **Global Audio Player**: Persistent audio playback with safety minimizing logic.

## Development

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run locally:
    ```bash
    npm start
    ```

## Deployment on Netlify

This project is optimized for deployment on Netlify.

### 1. Prerequisites
*   A GitHub account.
*   A Netlify account.
*   A Google Gemini API Key (get one at [aistudio.google.com](https://aistudio.google.com)).

### 2. Deployment Steps
1.  Push this code to a new **GitHub repository**.
2.  Log in to **Netlify** and click **"Add new site"** > **"Import from an existing project"**.
3.  Select **GitHub** and choose your repository.
4.  Configure the build settings:
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist` (or `build`, depending on your bundler configuration).

### 3. Environment Variables (Critical)
The AI Assistant requires an API key to function.

1.  Once the site is created (or during setup), go to **Site configuration** > **Environment variables**.
2.  Click **"Add a variable"**.
3.  **Key**: `GEMINI_API_KEY`
4.  **Value**: Your actual Google Gemini API Key.
5.  Trigger a new deploy if you added this after the initial build.

Your LVRN Experience is now live!