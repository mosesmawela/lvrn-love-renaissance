# LVRN - Love Renaissance Experience

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/)

A premium, interactive digital experience for **Love Renaissance (LVRN)**. This application bridges the gap between music culture and cutting-edge technology, offering fans an immersive journey through the label's vision.

## ✨ Core Pillars

### 🎞️ Cinematic UI/UX
Designed with a luxury aesthetic, featuring glassmorphism, fluid animations (GSAP/Framer Motion), and a dynamic theme system that responds to the user's journey.

### 🤖 Intelligent Engagement
An integrated AI Assistant powered by **Google Gemini**, providing contextual information about artists, releases, and the LVRN universe.

### 🎧 Audio-Reactive Visualization
The "Interactive Playroom" leverages Three.js for real-time 3D audio visualization, creating a visceral connection between the music and the visual space.

### 🛒 Logistic Excellence
A seamless, multi-step booking and commerce system with predictive logistics and global currency adaptation.

---

## 🛠️ Technical Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Vanilla CSS (Design Tokens)
- **Animation**: Framer Motion, GSAP
- **3D Engine**: Three.js
- **Intelligence**: Google Gemini Pro (via API)
- **Backend/Data**: Firebase Hosting, Supabase (Logistics)

---

## 🚀 Getting Started

### Environment Variables Setup
If you are deploying this application, you will need to configure your environment variables:
1.  Go to your hosting provider's **Site configuration** > **Environment variables**.
2.  Click **"Add a variable"**.
3.  **Key**: `GEMINI_API_KEY`
4.  **Value**: Your actual Google Gemini API Key.
5.  Trigger a new deploy if you added this after the initial build.

### Prerequisites

- Node.js (Latest LTS recommended)
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mosesmawela/lvrn-love-renaissance.git
   cd lvrn-love-renaissance
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file or set the following in your environment:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Launch the development server:
   ```bash
   npm run dev
   ```

---

## 🌎 Deployment

The project is optimized for deployment on **Firebase Hosting** or **Netlify**.

### Build
```bash
npm run build
```
The production-ready assets will be generated in the `dist/` directory.

---

## ⚖️ License

Built with love by the LVRN development team. See [LICENSE](LICENSE) for details.

© 2026 Love Renaissance. All rights reserved.