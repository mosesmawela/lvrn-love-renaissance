import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Register the custom loader
register('./test-loader.js', pathToFileURL('./'));

// Initialize global dummy env variable
globalThis.__env__ = {
  VITE_SPOTIFY_CLIENT_ID: 'mock_spotify_id',
  VITE_YOUTUBE_API_KEY: 'mock_youtube_key'
};
