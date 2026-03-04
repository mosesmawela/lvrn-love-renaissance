import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Users, Music, ListMusic, BarChart3,
    DollarSign, Megaphone, Heart, Key, Activity,
    Bell, Shield, Settings, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';

import { Logo } from '../../../components/Logo';


interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isCollapsed, setIsCollapsed }) => {
    const menuItems = [
        { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
        { id: 'roster', label: 'Artists & Roster', icon: Users },
        { id: 'content', label: 'Music & Content', icon: Music },
        { id: 'playlists', label: 'Playlists & Editorial', icon: ListMusic },
        { id: 'analytics', label: 'User Analytics', icon: BarChart3 },
        { id: 'finance', label: 'Revenue & Finance', icon: DollarSign },
        { id: 'marketing', label: 'Marketing & Rollouts', icon: Megaphone },
        { id: 'community', label: 'Community & Fans', icon: Heart },
        { id: 'access', label: 'Access & Membership', icon: Key },
        { id: 'live', label: 'Live Activity', icon: Activity },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'admin', label: 'Admin Permissions', icon: Shield },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <motion.div
            className={`fixed left-0 top-0 h-screen bg-[var(--nav-bg)] backdrop-blur-xl border-r border-[var(--card-border)] z-40 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'}`}
            initial={false}
        >
            {/* Brand Header */}
            <div className="p-6 flex items-center gap-4 border-b border-[var(--card-border)]">
                <Logo className="w-8 h-8 text-[var(--accent)]" />
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col"
                    >
                        <span className="font-black tracking-widest text-lg leading-none">LVRN</span>
                        <span className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase">Control Center</span>
                    </motion.div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
                {menuItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative
                ${isActive ? 'bg-[var(--accent)] text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]' : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'}
              `}
                        >
                            <item.icon size={20} className={`${isActive ? 'text-white' : 'text-[var(--text-secondary)] group-hover:text-white'}`} />

                            {!isCollapsed && (
                                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                            )}

                            {/* Active Indicator */}
                            {isActive && !isCollapsed && (
                                <motion.div layoutId="activeSidebar" className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                            )}

                            {/* Tooltip for collapsed mode */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 backdrop-blur border border-white/10 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Footer / Toggle */}
            <div className="p-4 border-t border-[var(--card-border)]">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-[var(--text-muted)] hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </motion.div>
    );
};
