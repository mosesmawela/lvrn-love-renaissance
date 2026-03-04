
import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardApp from './DashboardApp';
import { AuthProvider } from './contexts/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <DashboardApp />
        </AuthProvider>
    </React.StrictMode>,
);
