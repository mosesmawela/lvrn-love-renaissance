import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    Users, Mail, Linkedin, Twitter, Instagram, Search, X, Grid, List,
    ChevronDown, Star, MessageCircle, ExternalLink, Sparkles, ArrowRight,
    TrendingUp, Award, Globe, Heart, Zap, Filter, ChevronLeft, ChevronRight
} from 'lucide-react';
import { TEAM_MEMBERS, type TeamMember } from '../constants';
import { GlassCard } from './GlassCard';

interface MeetTheTeamProps {
    onNavigate?: (pageId: string) => void;
}

const DEPARTMENTS = ['All', 'Executive', 'A&R', 'Marketing', 'Operations', 'Creative', 'Publishing', 'Legal', 'Artist'];

const DEPT_COLORS: Record<string, string> = {
    'Executive': 'from-purple-500 to-indigo-600',
    'A&R': 'from-orange-500 to-red-500',
    'Marketing': 'from-blue-500 to-cyan-500',
    'Operations': 'from-emerald-500 to-teal-500',
    'Creative': 'from-pink-500 to-rose-500',
    'Publishing': 'from-amber-500 to-yellow-500',
    'Legal': 'from-slate-500 to-gray-500',
    'Artist': 'from-violet-500 to-purple-500'
};

const DEPT_ICONS: Record<string, React.ReactNode> = {
    'Executive': <Award size={14} />,
    'A&R': <Star size={14} />,
    'Marketing': <TrendingUp size={14} />,
    'Operations': <Globe size={14} />,
    'Creative': <Sparkles size={14} />,
    'Publishing': <MessageCircle size={14} />,
    'Legal': <Zap size={14} />,
    'Artist': <Heart size={14} />
};

const TEAM_STATS = [
    { label: 'Team Members', value: TEAM_MEMBERS.length, icon: Users, color: 'text-orange-500' },
    { label: 'Departments', value: new Set(TEAM_MEMBERS.map(m => m.department)).size, icon: Filter, color: 'text-blue-500' },
    { label: 'Years Active', value: 13, icon: Award, color: 'text-emerald-500' },
    { label: 'Global Reach', value: '20+', icon: Globe, color: 'text-purple-500' }
];

interface TeamCardProps {
    member: TeamMember;
    index: number;
    viewMode: 'grid' | 'list';
    onSelect: (member: TeamMember) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, index, viewMode, onSelect }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const deptColor = DEPT_COLORS[member.department] || 'from-gray-500 to-slate-500';

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = ((e.clientY - centerY) / rect.height) * -8;
        const rotateY = ((e.clientX - centerX) / rect.width) * 8;
        setTilt({ x: rotateX, y: rotateY });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
    }, []);

    if (viewMode === 'list') {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group"
            >
                <button
                    onClick={() => onSelect(member)}
                    className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-left"
                >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0">
                        {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <Users size={20} className="text-gray-600" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">{member.name}</h3>
                        <p className="text-xs text-gray-400 truncate">{member.role}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${deptColor} text-white`}>
                        {member.department}
                    </span>
                    <ArrowRight size={14} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group perspective-[1000px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d'
            }}
        >
            <GlassCard className="!p-0 overflow-hidden relative h-full border-white/10 hover:border-white/20 transition-colors">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${deptColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Top Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${deptColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 p-6 flex flex-col h-full">
                    {/* Avatar */}
                    <div className="relative w-24 h-24 mx-auto mb-5">
                        <div className={`w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                    <Users className="w-10 h-10 text-gray-600" />
                                </div>
                            )}
                        </div>
                        {/* Department Icon Badge */}
                        <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-r ${deptColor} flex items-center justify-center border-2 border-black`}>
                            {DEPT_ICONS[member.department] || <Users size={12} />}
                        </div>
                    </div>

                    {/* Name & Role */}
                    <div className="text-center mb-3">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                            {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
                            {member.role}
                        </p>
                    </div>

                    {/* Bio */}
                    {member.bio && (
                        <p className="text-sm text-gray-400 text-center leading-relaxed flex-1 line-clamp-3">
                            {member.bio}
                        </p>
                    )}

                    {/* Social Links */}
                    <motion.div
                        initial={false}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        className="flex justify-center gap-2 mt-4 pt-4 border-t border-white/5"
                    >
                        {member.email && (
                            <a
                                href={`mailto:${member.email}`}
                                className="p-2 rounded-full bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-400 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Mail size={14} />
                            </a>
                        )}
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Linkedin size={14} />
                            </a>
                        )}
                        {member.twitter && (
                            <a
                                href={member.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white/5 hover:bg-sky-500/20 text-gray-400 hover:text-sky-400 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Twitter size={14} />
                            </a>
                        )}
                        {member.instagram && (
                            <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white/5 hover:bg-pink-500/20 text-gray-400 hover:text-pink-400 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Instagram size={14} />
                            </a>
                        )}
                    </motion.div>

                    {/* View Profile Button */}
                    <motion.button
                        onClick={() => onSelect(member)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r ${deptColor} text-white text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2`}
                    >
                        View Profile <ExternalLink size={12} />
                    </motion.button>
                </div>
            </GlassCard>
        </motion.div>
    );
};

// Member Detail Modal
const MemberModal: React.FC<{ member: TeamMember; onClose: () => void }> = ({ member, onClose }) => {
    const deptColor = DEPT_COLORS[member.department] || 'from-gray-500 to-slate-500';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
                {/* Header Gradient */}
                <div className={`relative h-32 bg-gradient-to-br ${deptColor}`}>
                    <div className="absolute inset-0 bg-black/30" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Avatar */}
                <div className="relative -mt-16 px-8">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#111] shadow-xl">
                        {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <Users size={32} className="text-gray-600" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="px-8 pt-4 pb-8">
                    <h2 className="text-2xl font-black text-white">{member.name}</h2>
                    <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mt-1">{member.role}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${deptColor} text-white`}>
                        {member.department}
                    </span>

                    {member.bio && (
                        <p className="mt-4 text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                    )}

                    {/* Social Links */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
                        {member.email && (
                            <a href={`mailto:${member.email}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs font-bold">
                                <Mail size={14} /> Email
                            </a>
                        )}
                        {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs font-bold">
                                <Linkedin size={14} /> LinkedIn
                            </a>
                        )}
                        {member.twitter && (
                            <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs font-bold">
                                <Twitter size={14} /> Twitter
                            </a>
                        )}
                        {member.instagram && (
                            <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs font-bold">
                                <Instagram size={14} /> Instagram
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const MeetTheTeam: React.FC<MeetTheTeamProps> = () => {
    const [activeDepartment, setActiveDepartment] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [sortBy, setSortBy] = useState<'name' | 'department'>('name');
    const [showFilters, setShowFilters] = useState(false);
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

    const filteredMembers = useMemo(() => {
        let result = TEAM_MEMBERS.filter(member => {
            const matchesDept = activeDepartment === 'All' || member.department === activeDepartment;
            const matchesSearch = !searchQuery ||
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.department.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDept && matchesSearch;
        });

        if (sortBy === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            result.sort((a, b) => a.department.localeCompare(b.department) || a.name.localeCompare(b.name));
        }

        return result;
    }, [activeDepartment, searchQuery, sortBy]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedMember(null);
                setShowFilters(false);
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('team-search')?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]"
                    animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]"
                    animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                />
            </div>

            {/* Hero Section */}
            <motion.div
                style={{ y: heroY, opacity: heroOpacity }}
                className="text-center mb-16 px-6 relative z-10"
            >
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-6 shadow-lg shadow-orange-500/30"
                >
                    <Users className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
                    Meet The <span className="text-orange-500">Team</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full" />
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    The passionate minds behind Love Renaissance. Meet the team that brings culture to the world.
                </p>
            </motion.div>

            {/* Controls Bar */}
            <div className="max-w-7xl mx-auto px-6 mb-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            id="team-search"
                            type="text"
                            placeholder="Search team... (Cmd+K)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
                        <motion.button
                            onClick={() => setViewMode('grid')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            <Grid size={16} />
                        </motion.button>
                        <motion.button
                            onClick={() => setViewMode('list')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            <List size={16} />
                        </motion.button>
                    </div>

                    {/* Sort & Filter Toggle */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={() => setSortBy(sortBy === 'name' ? 'department' : 'name')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                            Sort: {sortBy === 'name' ? 'Name' : 'Dept'} <ChevronDown size={12} />
                        </motion.button>
                        <motion.button
                            onClick={() => setShowFilters(!showFilters)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors flex items-center gap-2 ${
                                showFilters
                                    ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            <Filter size={12} /> Filters
                        </motion.button>
                    </div>
                </div>

                {/* Department Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-4"
                        >
                            <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                                {DEPARTMENTS.map((dept) => (
                                    <motion.button
                                        key={dept}
                                        onClick={() => setActiveDepartment(dept)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                                            activeDepartment === dept
                                                ? `bg-gradient-to-r ${DEPT_COLORS[dept] || 'from-gray-500 to-slate-500'} text-white shadow-lg`
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                        }`}
                                    >
                                        {DEPT_ICONS[dept]}
                                        {dept}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quick Department Pills (always visible) */}
                {!showFilters && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {DEPARTMENTS.slice(0, 5).map((dept) => (
                            <button
                                key={dept}
                                onClick={() => setActiveDepartment(dept)}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                                    activeDepartment === dept
                                        ? `bg-gradient-to-r ${DEPT_COLORS[dept] || 'from-gray-500 to-slate-500'} text-white`
                                        : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 border border-white/10'
                                }`}
                            >
                                {dept}
                            </button>
                        ))}
                        {DEPARTMENTS.length > 5 && (
                            <button
                                onClick={() => setShowFilters(true)}
                                className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 border border-white/10"
                            >
                                +{DEPARTMENTS.length - 4} more
                            </button>
                        )}
                    </div>
                )}

                {/* Results Count */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-gray-500">
                        Showing <span className="text-white font-bold">{filteredMembers.length}</span> of {TEAM_MEMBERS.length} members
                    </p>
                    {activeDepartment !== 'All' && (
                        <button
                            onClick={() => setActiveDepartment('All')}
                            className="text-xs text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1"
                        >
                            <X size={12} /> Clear filter
                        </button>
                    )}
                </div>
            </div>

            {/* Team Grid/List */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {filteredMembers.length > 0 ? (
                    <div className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                            : 'flex flex-col gap-3 max-w-3xl mx-auto'
                    }>
                        {filteredMembers.map((member, index) => (
                            <TeamCard
                                key={member.name}
                                member={member}
                                index={index}
                                viewMode={viewMode}
                                onSelect={setSelectedMember}
                            />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <Search size={48} className="mx-auto mb-4 text-gray-700" />
                        <p className="text-gray-500 text-lg mb-2">No team members found</p>
                        <p className="text-gray-600 text-sm mb-4">Try adjusting your search or filters</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveDepartment('All'); }}
                            className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 text-sm font-bold hover:bg-orange-500/30 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-5xl mx-auto mt-20 px-6 relative z-10"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TEAM_STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -2 }}
                            className="text-center p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors group"
                        >
                            <stat.icon className={`w-6 h-6 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                            <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-1`}>
                                {typeof stat.value === 'number' ? stat.value : stat.value}
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Member Detail Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};
