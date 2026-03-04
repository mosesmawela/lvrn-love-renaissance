import React from 'react';
import { motion } from 'framer-motion';
import {
    Users, Activity, DollarSign, TrendingUp,
    Music, Megaphone, Mic2, Calendar, MapPin
} from 'lucide-react';
import { ArtistAnalytics } from './ArtistAnalytics';

export const Overview: React.FC = () => {
    // Mock Data
    const kpis = [
        { label: 'Total Active Users', value: '842.5k', change: '+12.5%', icon: Users, color: 'text-blue-400' },
        { label: 'Monthly Listeners', value: '24.1M', change: '+5.2%', icon: Music, color: 'text-orange-400' },
        { label: 'Revenue (Today)', value: '$14,205', change: '+8.1%', icon: DollarSign, color: 'text-green-400' },
        { label: 'Conversion Rate', value: '4.2%', change: '+1.2%', icon: TrendingUp, color: 'text-orange-400' },
    ];

    const quickActions = [
        { label: 'Upload Release', icon: Music, color: 'bg-orange-500' },
        { label: 'New Artist', icon: Mic2, color: 'bg-amber-500' },
        { label: 'Schedule Drop', icon: Calendar, color: 'bg-blue-500' },
        { label: 'Create Campaign', icon: Megaphone, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* 1. KPI Strip */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl relative overflow-hidden group hover:border-[var(--accent)]/30 transition-colors"
                    >
                        <div className={`absolute top-0 right-0 p-5 opacity-20 group-hover:opacity-100 transition-opacity duration-500 ${kpi.color}`}>
                            <kpi.icon size={40} />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">{kpi.label}</h3>
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black">{kpi.value}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/5 ${kpi.color.replace('text-', 'text-')}`}>
                                    {kpi.change}
                                </span>
                            </div>
                        </div>

                        {/* Sparkline decoration */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20" />
                    </motion.div>
                ))}
            </section>

            {/* 2. Unified Music Analytics */}
            <section>
                <ArtistAnalytics artistName="6LACK" />
            </section>

            {/* 3. Realtime Activity & Insights */}
            <section className="grid lg:grid-cols-3 gap-8">

                {/* Realtime Graph */}
                <motion.div
                    className="lg:col-span-2 p-8 rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl min-h-[400px] flex flex-col"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Activity className="text-[var(--accent)] animate-pulse" />
                                Live Activity Feed
                            </h3>
                            <p className="text-sm text-[var(--text-muted)]">Real-time listening data across global markets</p>
                        </div>
                        <div className="flex bg-black/20 rounded-lg p-1">
                            {['Global', 'US', 'UK', 'SA'].map(r => (
                                <button key={r} className="px-3 py-1 text-xs font-bold rounded-md hover:bg-white/10 transition-colors">{r}</button>
                            ))}
                        </div>
                    </div>

                    {/* Mock Graph Visual */}
                    <div className="flex-1 w-full bg-gradient-to-b from-[var(--accent)]/5 to-transparent rounded-xl relative overflow-hidden flex items-end justify-between px-2 gap-1">
                        {/* Simulated Bars */}
                        {Array.from({ length: 40 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="flex-1 bg-[var(--accent)] rounded-t-sm opacity-60"
                                initial={{ height: '10%' }}
                                animate={{ height: `${Math.random() * 60 + 20}%` }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    delay: i * 0.05,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Insights & Quick Actions */}
                <div className="space-y-6">

                    {/* Quick Actions */}
                    <motion.div
                        className="p-6 rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {quickActions.map(action => (
                                <button key={action.label} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group text-left">
                                    <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <action.icon size={18} />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider block">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* AI Insights */}
                    <motion.div
                        className="p-6 rounded-[2rem] bg-gradient-to-br from-orange-900/40 to-amber-900/40 border border-[var(--card-border)] backdrop-blur-xl relative overflow-hidden"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-30">
                            <TrendingUp size={60} />
                        </div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                            AI Insights
                        </h3>
                        <div className="space-y-4 relative z-10">
                            <div className="flex gap-3 items-start">
                                <MapPin size={16} className="text-blue-400 mt-1 shrink-0" />
                                <p className="text-sm font-medium text-[var(--text-secondary)]">
                                    <span className="text-white font-bold">Johannesburg</span> is trending. Streams up <span className="text-green-400 font-bold">37%</span> in the last hour.
                                </p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <Music size={16} className="text-orange-400 mt-1 shrink-0" />
                                <p className="text-sm font-medium text-[var(--text-secondary)]">
                                    "Buya Ekhaya" has been added to <span className="text-white font-bold">12 editorial playlists</span> today.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* 3. Recent Roster Activity Table (Simplified for Phase 1) */}
            <section>
                <h3 className="text-xl font-bold mb-6 px-2">Recent Roster Activity</h3>
                <div className="rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--card-border)] text-xs uppercase tracking-wider text-[var(--text-muted)]">
                                <th className="p-6 font-bold">Artist</th>
                                <th className="p-6 font-bold">Track / Release</th>
                                <th className="p-6 font-bold">Status</th>
                                <th className="p-6 font-bold">Streams (24h)</th>
                                <th className="p-6 font-bold text-right">Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <tr key={i} className="border-b border-[var(--card-border)] last:border-0 hover:bg-white/5 transition-colors group">
                                    <td className="p-6 font-bold flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-700" />
                                        Artist Name
                                    </td>
                                    <td className="p-6 text-[var(--text-secondary)]">Song Title - Single</td>
                                    <td className="p-6">
                                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">Live</span>
                                    </td>
                                    <td className="p-6 font-mono text-[var(--text-secondary)]">
                                        42,912 <span className="text-green-400 text-xs">↑</span>
                                    </td>
                                    <td className="p-6 font-mono font-bold text-right">$1,290.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
