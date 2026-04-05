import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
    Users, Mail, Linkedin, Twitter, Instagram, Search, X, Grid, List,
    ChevronDown, Star, MessageCircle, ExternalLink, Sparkles, ArrowRight,
    TrendingUp, Award, Globe, Heart, Zap, Filter, ChevronLeft, ChevronRight,
    Calendar, MapPin, Clock, Quote, Lightbulb, Target, Rocket,
    Play, Pause, Plus, Minus, Eye, EyeOff, Share2, Bookmark
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

const DEPT_GLOW: Record<string, string> = {
    'Executive': 'shadow-purple-500/20',
    'A&R': 'shadow-orange-500/20',
    'Marketing': 'shadow-blue-500/20',
    'Operations': 'shadow-emerald-500/20',
    'Creative': 'shadow-pink-500/20',
    'Publishing': 'shadow-amber-500/20',
    'Legal': 'shadow-slate-500/20',
    'Artist': 'shadow-violet-500/20'
};

const TEAM_VALUES = [
    { icon: <Heart size={20} />, title: 'Culture First', desc: 'We put people and art before everything else.' },
    { icon: <Rocket size={20} />, title: 'Innovation', desc: 'Pushing boundaries in music and creative expression.' },
    { icon: <Target size={20} />, title: 'Excellence', desc: 'Every detail matters. No compromises on quality.' },
    { icon: <Lightbulb size={20} />, title: 'Vision', desc: 'Seeing what others can\'t and making it real.' }
];

const TEAM_QUOTES = [
    { text: "We don't follow trends. We set them.", author: "Tunde Balogun" },
    { text: "Music is the universal language. We're just the translators.", author: "Justice Baiden" },
    { text: "Every artist has a story. Our job is to help tell it.", author: "Sean McNichol" }
];

// Animated counter component
const AnimatedCounter: React.FC<{ target: number; duration?: number; suffix?: string }> = ({ target, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const startTime = Date.now();
                    const animate = () => {
                        const elapsed = (Date.now() - startTime) / 1000;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    animate();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return <div ref={ref}>{count}{suffix}</div>;
};

// Floating particle for ambient effect
const FloatingParticle: React.FC<{ delay: number; size: number; color: string }> = ({ delay, size, color }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
            width: size,
            height: size,
            background: color,
            filter: `blur(${size / 2}px)`,
        }}
        initial={{ y: '110vh', x: `${Math.random() * 100}%`, opacity: 0 }}
        animate={{
            y: '-10vh',
            opacity: [0, 0.4, 0.4, 0],
        }}
        transition={{
            y: { duration: 25 + Math.random() * 15, repeat: Infinity, ease: 'linear', delay },
            opacity: { duration: 25 + Math.random() * 15, repeat: Infinity, ease: 'easeInOut', delay },
        }}
    />
);

// Team Flip Card
const TeamFlipCard: React.FC<{ member: TeamMember; index: number; onSelect: (member: TeamMember) => void }> = ({ member, index, onSelect }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

    const deptColor = DEPT_COLORS[member.department] || 'from-gray-500 to-slate-500';
    const deptGlow = DEPT_GLOW[member.department] || 'shadow-gray-500/20';

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setIsFlipped(false);
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group perspective-[1200px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-[380px] cursor-pointer"
                style={{
                    transformStyle: 'preserve-3d',
                    rotateX,
                    rotateY,
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <GlassCard className={`!p-0 overflow-hidden h-full border-white/10 hover:border-white/20 transition-colors shadow-lg ${deptGlow} hover:shadow-xl`}>
                        {/* Gradient Top */}
                        <div className={`h-24 bg-gradient-to-br ${deptColor} relative`}>
                            <div className="absolute inset-0 bg-black/20" />
                            {/* Department Badge */}
                            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">{member.department}</span>
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="relative -mt-12 px-6">
                            <div className={`w-24 h-24 rounded-2xl overflow-hidden border-4 border-[var(--bg-color)] shadow-xl ${isHovered ? 'scale-105' : ''} transition-transform duration-500`}>
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                        <Users className="w-10 h-10 text-gray-600" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="px-6 pt-4 pb-6">
                            <h3 className="text-xl font-black text-white mb-1 group-hover:text-orange-400 transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-3">
                                {member.role}
                            </p>
                            {member.bio && (
                                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                                    {member.bio}
                                </p>
                            )}

                            {/* Flip Hint */}
                            <div className="flex items-center justify-center gap-2 mt-4 text-gray-600 text-[10px] uppercase tracking-wider">
                                <Eye size={12} />
                                <span>Click to flip</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <GlassCard className={`!p-0 overflow-hidden h-full border-white/10 shadow-lg ${deptGlow}`}>
                        {/* Gradient Header */}
                        <div className={`h-20 bg-gradient-to-br ${deptColor} relative flex items-center justify-center`}>
                            <div className="absolute inset-0 bg-black/20" />
                            <Quote size={32} className="text-white/30" />
                        </div>

                        <div className="px-6 pt-6 pb-6 flex flex-col h-full">
                            <h3 className="text-lg font-black text-white mb-1">{member.name}</h3>
                            <p className="text-xs text-orange-400 uppercase tracking-wider mb-4">{member.role}</p>

                            {member.bio && (
                                <p className="text-sm text-gray-300 leading-relaxed flex-1 italic">
                                    "{member.bio}"
                                </p>
                            )}

                            {/* Social Links */}
                            <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-white/10">
                                {member.email && (
                                    <a href={`mailto:${member.email}`} onClick={(e) => e.stopPropagation()} className="p-2.5 rounded-full bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-400 transition-colors">
                                        <Mail size={16} />
                                    </a>
                                )}
                                {member.linkedin && (
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2.5 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors">
                                        <Linkedin size={16} />
                                    </a>
                                )}
                                {member.twitter && (
                                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2.5 rounded-full bg-white/5 hover:bg-sky-500/20 text-gray-400 hover:text-sky-400 transition-colors">
                                        <Twitter size={16} />
                                    </a>
                                )}
                                {member.instagram && (
                                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2.5 rounded-full bg-white/5 hover:bg-pink-500/20 text-gray-400 hover:text-pink-400 transition-colors">
                                        <Instagram size={16} />
                                    </a>
                                )}
                            </div>

                            <motion.button
                                onClick={(e) => { e.stopPropagation(); onSelect(member); }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r ${deptColor} text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2`}
                            >
                                Full Profile <ExternalLink size={12} />
                            </motion.button>
                        </div>
                    </GlassCard>
                </div>
            </motion.div>
        </motion.div>
    );
};

// List View Row
const TeamListRow: React.FC<{ member: TeamMember; index: number; onSelect: (member: TeamMember) => void }> = ({ member, index, onSelect }) => {
    const deptColor = DEPT_COLORS[member.department] || 'from-gray-500 to-slate-500';

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
        >
            <button
                onClick={() => onSelect(member)}
                className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-left group"
            >
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                    {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <Users size={18} className="text-gray-600" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-orange-400 transition-colors">{member.name}</h3>
                    <p className="text-xs text-gray-400 truncate">{member.role}</p>
                </div>
                <span className={`hidden sm:inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${deptColor} text-white`}>
                    {member.department}
                </span>
                <ArrowRight size={14} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
        </motion.div>
    );
};

// Member Detail Drawer
const MemberDrawer: React.FC<{ member: TeamMember | null; onClose: () => void }> = ({ member, onClose }) => {
    if (!member) return null;

    const deptColor = DEPT_COLORS[member.department] || 'from-gray-500 to-slate-500';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 overflow-y-auto"
                >
                    {/* Header */}
                    <div className={`relative h-48 bg-gradient-to-br ${deptColor}`}>
                        <div className="absolute inset-0 bg-black/30" />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="relative -mt-20 px-8">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-[#0a0a0a] shadow-2xl mb-6">
                            {member.image ? (
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                    <Users size={40} className="text-gray-600" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <h2 className="text-3xl font-black text-white">{member.name}</h2>
                        <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mt-1">{member.role}</p>
                        <span className={`inline-block mt-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${deptColor} text-white`}>
                            {member.department}
                        </span>

                        {member.bio && (
                            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                                <Quote size={16} className="text-orange-400 mb-2 opacity-60" />
                                <p className="text-gray-300 text-sm leading-relaxed italic">{member.bio}</p>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            {member.email && (
                                <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs font-bold">
                                    <Mail size={14} /> Email
                                </a>
                            )}
                            {member.linkedin && (
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs font-bold">
                                    <Linkedin size={14} /> LinkedIn
                                </a>
                            )}
                            {member.twitter && (
                                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs font-bold">
                                    <Twitter size={14} /> Twitter
                                </a>
                            )}
                            {member.instagram && (
                                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs font-bold">
                                    <Instagram size={14} /> Instagram
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export const MeetTheTeam: React.FC<MeetTheTeamProps> = () => {
    const [activeDepartment, setActiveDepartment] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [sortBy, setSortBy] = useState<'name' | 'department'>('name');
    const [showFilters, setShowFilters] = useState(false);
    const [spotlightIndex, setSpotlightIndex] = useState(0);
    const [isAutoSpotlight, setIsAutoSpotlight] = useState(true);
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

    // Particles
    const particles = useMemo(() =>
        Array.from({ length: 12 }, (_, i) => ({
            id: i,
            delay: i * 2,
            size: 2 + Math.random() * 4,
            color: ['rgba(249,115,22,0.3)', 'rgba(168,85,247,0.3)', 'rgba(59,130,246,0.3)'][i % 3]
        })), []);

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

    // Auto spotlight rotation
    useEffect(() => {
        if (!isAutoSpotlight) return;
        const interval = setInterval(() => {
            setSpotlightIndex(prev => (prev + 1) % TEAM_MEMBERS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoSpotlight]);

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
            {/* Ambient Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map(p => (
                    <FloatingParticle key={p.id} delay={p.delay} size={p.size} color={p.color} />
                ))}
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
                    Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Team</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full" />
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    The passionate minds behind Love Renaissance. Meet the team that brings culture to the world.
                </p>
            </motion.div>

            {/* Spotlight Carousel */}
            <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Star size={16} className="text-yellow-400" />
                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Team Spotlight</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={() => setSpotlightIndex(prev => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft size={14} />
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                setIsAutoSpotlight(!isAutoSpotlight);
                                if (!isAutoSpotlight) setSpotlightIndex(prev => (prev + 1) % TEAM_MEMBERS.length);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-2 rounded-lg border transition-colors ${isAutoSpotlight ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
                        >
                            {isAutoSpotlight ? <Pause size={14} /> : <Play size={14} />}
                        </motion.button>
                        <motion.button
                            onClick={() => setSpotlightIndex(prev => (prev + 1) % TEAM_MEMBERS.length)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronRight size={14} />
                        </motion.button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={spotlightIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        {(() => {
                            const member = TEAM_MEMBERS[spotlightIndex];
                            const deptColor = DEPT_COLORS[member.department] || 'from-gray-500 to-slate-500';
                            return (
                                <GlassCard className="!p-8 !bg-white/5 !border-white/10">
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl flex-shrink-0">
                                            {member.image ? (
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                                    <Users size={40} className="text-gray-600" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${deptColor} text-white`}>
                                                    {member.department}
                                                </span>
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Spotlight #{spotlightIndex + 1}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-1">{member.name}</h3>
                                            <p className="text-sm text-orange-400 uppercase tracking-wider mb-3">{member.role}</p>
                                            {member.bio && (
                                                <p className="text-gray-400 text-sm leading-relaxed max-w-lg italic">"{member.bio}"</p>
                                            )}
                                        </div>
                                        <motion.button
                                            onClick={() => setSelectedMember(member)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-6 py-3 rounded-xl bg-gradient-to-r ${deptColor} text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 flex-shrink-0`}
                                        >
                                            View Profile <ArrowRight size={14} />
                                        </motion.button>
                                    </div>
                                </GlassCard>
                            );
                        })()}
                    </motion.div>
                </AnimatePresence>

                {/* Spotlight Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {TEAM_MEMBERS.slice(0, 10).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setSpotlightIndex(i); setIsAutoSpotlight(false); }}
                            className={`w-2 h-2 rounded-full transition-all ${i === spotlightIndex ? 'w-6 bg-orange-500' : 'bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Team Values */}
            <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TEAM_VALUES.map((value, i) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.03, y: -2 }}
                            className="p-4 bg-white/5 border border-white/10 rounded-xl text-center hover:border-white/20 transition-colors group"
                        >
                            <div className="text-orange-400 mb-2 flex justify-center group-hover:scale-110 transition-transform">{value.icon}</div>
                            <h3 className="text-sm font-bold text-white mb-1">{value.title}</h3>
                            <p className="text-[10px] text-gray-500 leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

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
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
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

                    {/* Sort & Filter */}
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
                            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors flex items-center gap-2 ${showFilters ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}
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
                                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeDepartment === dept ? `bg-gradient-to-r ${DEPT_COLORS[dept] || 'from-gray-500 to-slate-500'} text-white shadow-lg` : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}
                                    >
                                        {dept}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quick Pills */}
                {!showFilters && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {DEPARTMENTS.slice(0, 5).map((dept) => (
                            <button
                                key={dept}
                                onClick={() => setActiveDepartment(dept)}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${activeDepartment === dept ? `bg-gradient-to-r ${DEPT_COLORS[dept] || 'from-gray-500 to-slate-500'} text-white` : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 border border-white/10'}`}
                            >
                                {dept}
                            </button>
                        ))}
                        {DEPARTMENTS.length > 5 && (
                            <button onClick={() => setShowFilters(true)} className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 border border-white/10">
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
                        <button onClick={() => setActiveDepartment('All')} className="text-xs text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1">
                            <X size={12} /> Clear filter
                        </button>
                    )}
                </div>
            </div>

            {/* Team Grid/List */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {filteredMembers.length > 0 ? (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-3 max-w-3xl mx-auto'}>
                        {filteredMembers.map((member, index) => (
                            viewMode === 'grid' ? (
                                <TeamFlipCard key={member.name} member={member} index={index} onSelect={setSelectedMember} />
                            ) : (
                                <TeamListRow key={member.name} member={member} index={index} onSelect={setSelectedMember} />
                            )
                        ))}
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                        <Search size={48} className="mx-auto mb-4 text-gray-700" />
                        <p className="text-gray-500 text-lg mb-2">No team members found</p>
                        <p className="text-gray-600 text-sm mb-4">Try adjusting your search or filters</p>
                        <button onClick={() => { setSearchQuery(''); setActiveDepartment('All'); }} className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 text-sm font-bold hover:bg-orange-500/30 transition-colors">
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
                    {[
                        { label: 'Team Members', value: TEAM_MEMBERS.length, icon: Users, color: 'text-orange-500' },
                        { label: 'Departments', value: new Set(TEAM_MEMBERS.map(m => m.department)).size, icon: Filter, color: 'text-blue-500' },
                        { label: 'Years Active', value: 13, icon: Award, color: 'text-emerald-500' },
                        { label: 'Global Reach', value: 20, suffix: '+', icon: Globe, color: 'text-purple-500' }
                    ].map((stat, index) => (
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
                                <AnimatedCounter target={stat.value} suffix={stat.suffix || ''} />
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Team Quote */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto mt-16 px-6 text-center relative z-10"
            >
                <Quote size={32} className="mx-auto mb-4 text-orange-500/30" />
                <AnimatePresence mode="wait">
                    {TEAM_QUOTES.map((quote, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="text-lg text-gray-400 italic leading-relaxed"
                        >
                            "{quote.text}" <span className="text-orange-400 not-italic font-bold">— {quote.author}</span>
                        </motion.p>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Member Detail Drawer */}
            <MemberDrawer member={selectedMember} onClose={() => setSelectedMember(null)} />
        </div>
    );
};
