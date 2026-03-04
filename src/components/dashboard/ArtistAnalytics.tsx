import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { musicDataService, UnifiedAnalyticsData } from '../../services/music-data-service';
import {
    TrendingUp, Users, Music, Activity, BarChart2,
    Youtube, Apple, Disc, Globe, ChevronRight
} from 'lucide-react';

interface ArtistAnalyticsProps {
    artistName: string;
}

type Platform = 'overview' | 'spotify' | 'apple' | 'youtube';

export const ArtistAnalytics: React.FC<ArtistAnalyticsProps> = ({ artistName }) => {
    const [data, setData] = useState<UnifiedAnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Platform>('overview');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const analytics = await musicDataService.getUnifiedAnalytics(artistName);
            setData(analytics);
            setLoading(false);
        };

        fetchData();
    }, [artistName]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12 bg-[var(--card-bg)] rounded-[2rem] border border-[var(--card-border)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    <span className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-widest">Hydrating Analytics...</span>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const tabs: { label: Platform; icon: any; color: string }[] = [
        { label: 'overview', icon: Globe, color: 'text-orange-400' },
        { label: 'spotify', icon: Music, color: 'text-green-400' },
        { label: 'apple', icon: Apple, color: 'text-pink-400' },
        { label: 'youtube', icon: Youtube, color: 'text-red-400' }
    ];

    const renderOverview = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Total Reach</span>
                    <Globe className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-3xl font-black">{(data.globalMetrics.totalReach / 1000000).toFixed(1)}M</div>
                <p className="text-[10px] text-gray-500 mt-2">Aggregated across all verified channels</p>
            </div>
            <div className="glass-card p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Engagement</span>
                    <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black">{data.globalMetrics.engagementRate}%</div>
                <p className="text-[10px] text-gray-500 mt-2">Platform-weighted average interaction</p>
            </div>
            <div className="glass-card p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-green-400">Growth</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-3xl font-black">+{data.globalMetrics.growthPercentage}%</div>
                <p className="text-[10px] text-gray-500 mt-2">MoM cross-platform audience expansion</p>
            </div>
        </div>
    );

    const renderPlatformStats = (platform: 'spotify' | 'apple' | 'youtube') => {
        const stats = platform === 'spotify' ? data.artist.spotify :
            platform === 'apple' ? data.artist.appleMusic :
                data.artist.youtube;

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-[10px] uppercase font-bold text-gray-500 mb-1">{key}</div>
                            <div className="text-xl font-bold">
                                {typeof value === 'number' ?
                                    (value > 1000000 ? (value / 1000000).toFixed(1) + 'M' : value.toLocaleString()) :
                                    value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="p-8 rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl relative overflow-hidden group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <BarChart2 className="text-orange-500" />
                        Precise Music Data
                    </h2>
                    <p className="text-sm text-[var(--text-muted)]">Real-time performance metrics for {artistName}</p>
                </div>

                <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                    {tabs.map(tab => (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(tab.label)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.label
                                    ? 'bg-orange-500 text-white shadow-lg'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <tab.icon size={14} className={activeTab === tab.label ? 'text-white' : tab.color} />
                            <span className="capitalize">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'overview' ? renderOverview() : renderPlatformStats(activeTab as any)}
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-gray-800" />
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-500">Currently synced with Official DSP Portals</span>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-widest">
                    View Detail Report <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
};
