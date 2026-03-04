import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthProvider';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeView: string;
    setActiveView: (view: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeView, setActiveView }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                activeView={activeView}
                setActiveView={setActiveView}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'}`}>

                {/* Top Header / Command Bar */}
                <header className="h-20 border-b border-[var(--card-border)] bg-[var(--bg-color)]/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
                    {/* Context/Title */}
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold capitalize text-[var(--text-color)]">
                            {activeView.replace('-', ' ')}
                        </h2>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6">
                        {/* Search */}
                        <div className="relative hidden md:block group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search roster, tracks, data..."
                                className="bg-[var(--input-bg)] border border-[var(--input-border)] rounded-full pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                            />
                            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--text-muted)] border border-[var(--card-border)] rounded px-1.5 py-0.5">⌘K</kbd>
                        </div>

                        <div className="h-6 w-px bg-[var(--card-border)]" />

                        {/* Notifications */}
                        <button className="relative p-2 text-[var(--text-muted)] hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                        </button>

                        {/* Profile */}
                        <div className="flex items-center gap-3 pl-2 cursor-pointer group relative">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold leading-tight">{user?.email?.split('@')[0] || 'Admin'}</p>
                                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-amber-900 border-2 border-[var(--card-border)] flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-[var(--accent)]/50 transition-shadow">
                                {user?.email?.[0].toUpperCase() || 'A'}
                            </div>

                            {/* Dropdown (Simple for now) */}
                            <div className="absolute top-full right-0 mt-2 w-48 bg-[#0a0a0a] border border-[var(--card-border)] rounded-xl shadow-2xl p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                                <button onClick={signOut} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg flex items-center gap-2">
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {children}
                </main>

            </div>
        </div>
    );
};
