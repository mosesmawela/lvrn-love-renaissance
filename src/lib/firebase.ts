
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
let analytics;
let perf;

if (typeof firebaseConfig.apiKey === 'string' && firebaseConfig.apiKey.startsWith('AIza')) {
    try {
        app = initializeApp(firebaseConfig);

        // Initialize Analytics and Performance only in browser environment
        if (typeof window !== 'undefined') {
            isSupported().then((supported) => {
                if (supported) {
                    analytics = getAnalytics(app);
                    perf = getPerformance(app);
                }
            });
        }
    } catch (error) {
        console.warn('Firebase initialization failed:', error);
    }
} else {
    console.warn('Firebase API Key is missing or placeholder. Skipping Firebase initialization.');
}

export { app, analytics, perf };
