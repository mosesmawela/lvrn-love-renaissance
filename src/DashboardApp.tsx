
import React, { useState } from 'react';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Overview } from './components/dashboard/OverviewNew';
import { useAuth } from './contexts/AuthProvider';

// Placeholder for future modules
const PlaceholderModule = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center opacity-50">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-widest">{title}</h2>
        <p className="text-sm font-mono border border-[var(--card-border)] px-4 py-2 rounded-full">Module under construction</p>
    </div>
);

const DashboardApp = () => {
    const [activeView, setActiveView] = useState('overview');

    const renderContent = () => {
        switch (activeView) {
            case 'overview': return <Overview />;
            case 'roster': return <PlaceholderModule title="Artists & Roster" />;
            case 'content': return <PlaceholderModule title="Music & Content" />;
            case 'playlists': return <PlaceholderModule title="Playlists & Editorial" />;
            case 'analytics': return <PlaceholderModule title="User Analytics" />;
            case 'finance': return <PlaceholderModule title="Revenue & Finance" />;
            case 'marketing': return <PlaceholderModule title="Marketing & Rollouts" />;
            case 'community': return <PlaceholderModule title="Community & Fans" />;
            case 'access': return <PlaceholderModule title="Access & Membership" />;
            case 'live': return <PlaceholderModule title="Live Activity" />;
            case 'notifications': return <PlaceholderModule title="Notifications" />;
            case 'admin': return <PlaceholderModule title="Admin Permissions" />;
            case 'settings': return <PlaceholderModule title="Settings" />;
            default: return <Overview />;
        }
    };

    return (
        <DashboardLayout activeView={activeView} setActiveView={setActiveView}>
            {renderContent()}
        </DashboardLayout>
    );
};

export default DashboardApp;
