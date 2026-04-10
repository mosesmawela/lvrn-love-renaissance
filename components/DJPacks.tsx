import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
    Download, Music, FileAudio, Send, Check, Loader2, Upload, X, Headphones,
    Mail, Instagram, Twitter, Search, Play, Pause, Disc, Zap,
    ArrowRight, Clock, Sparkles, Copy, ExternalLink, FolderOpen, Folder,
    Layers, ChevronRight, Volume2
} from 'lucide-react';
import { DJ_PACKS } from '../constants';
import { GlassCard } from './GlassCard';

interface DJPacksProps {
    onNavigate?: (pageId: string) => void;
}

const ARTISTS_LIST = ['All', ...Array.from(new Set(DJ_PACKS.map(p => p.artist)))];

const FOLDER_COLORS = [
    { primary: '#FF6B35', secondary: '#FF8C42', accent: '#FFA62B', glow: 'rgba(255, 107, 53, 0.3)' },
    { primary: '#E84393', secondary: '#FD79A8', accent: '#FDCB6E', glow: 'rgba(232, 67, 147, 0.3)' },
    { primary: '#6C5CE7', secondary: '#A29BFE', accent: '#74B9FF', glow: 'rgba(108, 92, 231, 0.3)' },
    { primary: '#00CEC9', secondary: '#55EFC4', accent: '#81ECEC', glow: 'rgba(0, 206, 201, 0.3)' },
    { primary: '#FDCB6E', secondary: '#F39C12', accent: '#E17055', glow: 'rgba(253, 203, 110, 0.3)' },
    { primary: '#E17055', secondary: '#D63031', accent: '#FF7675', glow: 'rgba(225, 112, 85, 0.3)' },
    { primary: '#0984E3', secondary: '#74B9FF', accent: '#A29BFE', glow: 'rgba(9, 132, 227, 0.3)' },
    { primary: '#00B894', secondary: '#55EFC4', accent: '#FFEAA7', glow: 'rgba(0, 184, 148, 0.3)' },
];

// 3D Folder Component
const Folder3D: React.FC<{
    pack: typeof DJ_PACKS[0];
    index: number;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}> = ({ pack, index, isOpen, onOpen, onClose }) => {
    const colors = FOLDER_COLORS[index % FOLDER_COLORS.length];
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 150, damping: 15 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-[1200px]"
            style={{ perspective: '1200px' }}
        >
            <motion.div
                className="relative w-full cursor-pointer"
                style={{
                    transformStyle: 'preserve-3d',
                    rotateX: isOpen ? 0 : rotateX,
                    rotateY: isOpen ? 0 : rotateY,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={isOpen ? onClose : onOpen}
            >
                {/* Glow Effect */}
                <motion.div
                    className="absolute -inset-4 rounded-3xl blur-xl opacity-0 transition-opacity"
                    style={{ background: colors.glow }}
                    animate={{ opacity: isOpen ? 0.6 : 0.2 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Folder Back */}
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Tab */}
                    <div className="absolute -top-3 left-6 px-4 py-1.5 rounded-t-lg" style={{ background: colors.primary }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{pack.artist}</span>
                    </div>

                    {/* Folder Content Area */}
                    <div className="p-6 pt-8 pb-4" style={{ minHeight: '180px' }}>
                        {/* Cover Image */}
                        <div className="w-full h-32 rounded-xl overflow-hidden mb-4 shadow-lg">
                            <img src={pack.coverUrl} alt={pack.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-black text-white mb-1 line-clamp-1">{pack.title}</h3>
                        <p className="text-xs text-white/70 mb-3">{pack.artist}</p>

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-[10px] text-white/60">
                            <span className="flex items-center gap-1"><Disc size={10} />{pack.trackCount} tracks</span>
                            <span className="flex items-center gap-1"><FileAudio size={10} />{pack.size}</span>
                            <span className="flex items-center gap-1"><Clock size={10} />{new Date(pack.releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>

                    {/* Folder Bottom Edge */}
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})` }} />
                </div>

                {/* Folder Front (opens like a flap) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ rotateX: -90, opacity: 0 }}
                            animate={{ rotateX: 0, opacity: 1 }}
                            exit={{ rotateX: -90, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="absolute inset-0 rounded-2xl overflow-hidden"
                            style={{
                                transformOrigin: 'top center',
                                transformStyle: 'preserve-3d',
                                background: `linear-gradient(180deg, ${colors.secondary}22, #0a0a0a 20%)`,
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${colors.primary}44`,
                            }}
                        >
                            {/* Paper Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

                            {/* Content */}
                            <div className="relative z-10 p-6 pt-10">
                                {/* Track List */}
                                <div className="mb-4">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Contents</h4>
                                    <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                                        {Array.from({ length: Math.min(pack.trackCount, 5) }).map((_, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                                                <span className="text-[10px] text-white/40 w-4">{i + 1}</span>
                                                <span className="truncate">Stem {i + 1} - {pack.artist}</span>
                                                <Volume2 size={10} className="text-white/30 ml-auto" />
                                            </div>
                                        ))}
                                        {pack.trackCount > 5 && (
                                            <p className="text-[10px] text-white/40 pl-6">+{pack.trackCount - 5} more tracks...</p>
                                        )}
                                    </div>
                                </div>

                                {/* Download Button */}
                                <motion.button
                                    onClick={(e) => { e.stopPropagation(); }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 rounded-xl text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                                >
                                    <Download size={14} /> Download Pack ({pack.size})
                                </motion.button>

                                {/* Close Hint */}
                                <p className="text-center text-[10px] text-white/30 mt-2">Click to close folder</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

// Pack Detail Modal
const PackDetailModal: React.FC<{ pack: typeof DJ_PACKS[0]; onClose: () => void }> = ({ pack, onClose }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [copiedLink, setCopiedLink] = useState(false);

    const handleDownload = () => {
        setIsDownloading(true);
        setDownloadProgress(0);
        const interval = setInterval(() => {
            setDownloadProgress(prev => {
                if (prev >= 100) { clearInterval(interval); setIsDownloading(false); return 100; }
                return prev + Math.random() * 15;
            });
        }, 200);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch { /* noop */ }
    };

    const tracks = useMemo(() =>
        Array.from({ length: pack.trackCount }, (_, i) => ({
            num: i + 1,
            title: `${pack.artist} - Track ${i + 1}`,
            duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
            bpm: Math.floor(Math.random() * 40) + 100
        })), [pack]);

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
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl"
            >
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img src={pack.coverUrl} alt={pack.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors">
                        <X size={18} />
                    </button>
                    <div className="absolute bottom-4 left-6 right-6">
                        <span className="px-2 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-[10px] font-bold uppercase tracking-wider text-orange-400">
                            {pack.format}
                        </span>
                    </div>
                </div>

                <div className="px-6 py-6">
                    <h2 className="text-2xl font-black text-white mb-1">{pack.title}</h2>
                    <p className="text-sm text-orange-400 font-semibold mb-4">{pack.artist}</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Disc size={14} /><span>{pack.trackCount} Tracks</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <FileAudio size={14} /><span>{pack.size}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock size={14} /><span>{new Date(pack.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>

                    {/* Waveform */}
                    <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-end justify-center gap-px h-8">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 rounded-full bg-orange-500/60"
                                    animate={{ height: [4, Math.random() * 24 + 8, 4] }}
                                    transition={{ duration: 0.3 + Math.random() * 0.4, repeat: Infinity, repeatType: "reverse", delay: i * 0.02 }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Track List */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Track Listing</h3>
                        <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                            {tracks.map(track => (
                                <div key={track.num} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                    <span className="text-xs text-gray-600 w-6 text-right font-mono">{track.num}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-white truncate group-hover:text-orange-400 transition-colors">{track.title}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-600 font-mono">{track.bpm} BPM</span>
                                    <span className="text-[10px] text-gray-600 font-mono">{track.duration}</span>
                                    <Play size={12} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <motion.button onClick={handleDownload} disabled={isDownloading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-70">
                            {isDownloading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Downloading... {Math.round(downloadProgress)}%</>) : (<><Download size={14} /> Download Pack ({pack.size})</>)}
                        </motion.button>
                        <motion.button onClick={handleCopyLink} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                            {copiedLink ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                        </motion.button>
                    </div>

                    <AnimatePresence>
                        {isDownloading && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4">
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${Math.min(downloadProgress, 100)}%` }} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Animated Counter
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

// Floating Particle
const FloatingParticle: React.FC<{ delay: number; size: number; color: string }> = ({ delay, size, color }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: size, height: size, background: color, filter: `blur(${size / 2}px)` }}
        initial={{ y: '110vh', x: `${Math.random() * 100}%`, opacity: 0 }}
        animate={{ y: '-10vh', opacity: [0, 0.3, 0.3, 0] }}
        transition={{
            y: { duration: 20 + Math.random() * 15, repeat: Infinity, ease: 'linear', delay },
            opacity: { duration: 20 + Math.random() * 15, repeat: Infinity, ease: 'easeInOut', delay },
        }}
    />
);

// Remix Submission Form
const RemixForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', artistName: '', trackTitle: '', description: '', subscribeEmail: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [fileName, setFileName] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setUploadProgress(0);
        const uploadInterval = setInterval(() => {
            setUploadProgress(prev => { if (prev >= 100) { clearInterval(uploadInterval); return 100; } return prev + Math.random() * 20; });
        }, 300);
        await new Promise(resolve => setTimeout(resolve, 2500));
        clearInterval(uploadInterval);
        setUploadProgress(100);
        setIsSubmitting(false);
        setSubmitStatus('success');
        // Redirect to submission website after successful submission
        window.location.href = 'https://lvrn-submiison-website.web.app/';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation(); setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file && (file.name.endsWith('.wav') || file.name.endsWith('.mp3'))) setFileName(file.name);
    };

    if (submitStatus === 'success') {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 px-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Submission Received!</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">Thank you for submitting your remix. Our team will review it and contact you via email.</p>
                <button onClick={() => setSubmitStatus('idle')} className="px-6 py-3 border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                    Submit Another Remix
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors rounded-xl" placeholder="John Smith" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors rounded-xl" placeholder="john@example.com" />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Artist / Producer Name *</label>
                    <input type="text" name="artistName" required value={formData.artistName} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors rounded-xl" placeholder="Your Stage Name" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Original Track Title *</label>
                    <input type="text" name="trackTitle" required value={formData.trackTitle} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors rounded-xl" placeholder="Track you're remixing" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Remix Description</label>
                <textarea name="description" rows={4} value={formData.description} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors resize-none rounded-xl"
                    placeholder="Tell us about your remix approach, key changes, vibes..." />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Upload Your Remix (WAV/MP3) *</label>
                <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragActive ? 'border-orange-500 bg-orange-500/5' : 'border-white/20 hover:border-orange-500/50'} ${fileName ? 'border-green-500/50 bg-green-500/5' : ''}`}
                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {fileName ? (
                        <div className="flex items-center justify-center gap-3">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                <FileAudio className="w-6 h-6 text-green-400" />
                            </motion.div>
                            <div className="text-left">
                                <span className="text-white font-medium text-sm">{fileName}</span>
                                <p className="text-xs text-gray-500">Ready to upload</p>
                            </div>
                            <button type="button" onClick={(e) => { e.stopPropagation(); setFileName(''); }} className="p-1 hover:bg-white/10 rounded">
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                            </motion.div>
                            <p className="text-gray-400 text-sm mb-2">Drag and drop your file here, or click to browse</p>
                            <p className="text-gray-500 text-xs">Max file size: 50MB | Formats: WAV, MP3</p>
                        </>
                    )}
                    <input ref={fileInputRef} type="file" accept=".wav,.mp3" className="hidden"
                        onChange={(e) => { const file = e.target.files?.[0]; if (file) setFileName(file.name); }} />
                </div>
                <AnimatePresence>
                    {isSubmitting && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3">
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${Math.min(uploadProgress, 100)}%` }} />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Uploading... {Math.round(Math.min(uploadProgress, 100))}%</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex items-start gap-3">
                <input type="checkbox" id="subscribe" checked={formData.subscribeEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, subscribeEmail: e.target.checked }))}
                    className="mt-1 w-4 h-4 accent-orange-500 rounded" />
                <label htmlFor="subscribe" className="text-sm text-gray-400">
                    Subscribe to LVRN updates for remix announcements, new releases, and exclusive opportunities.
                </label>
            </div>
            <button type="submit" disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-70 rounded-xl shadow-lg shadow-orange-500/20">
                {isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>) : (<><Send size={16} /> Submit Remix</>)}
            </button>
        </form>
    );
};

export const DJPacks: React.FC<DJPacksProps> = () => {
    const [activeTab, setActiveTab] = useState<'packs' | 'submit'>('packs');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterArtist, setFilterArtist] = useState('All');
    const [openFolderIndex, setOpenFolderIndex] = useState<number | null>(null);
    const [selectedPack, setSelectedPack] = useState<typeof DJ_PACKS[0] | null>(null);
    const [viewMode, setViewMode] = useState<'folders' | 'grid' | 'list'>('folders');
    const [sortBy, setSortBy] = useState<'date' | 'tracks' | 'name'>('date');
    const [spotlightIndex, setSpotlightIndex] = useState(0);
    const [isAutoSpotlight, setIsAutoSpotlight] = useState(true);
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

    const particles = useMemo(() =>
        Array.from({ length: 10 }, (_, i) => ({
            id: i, delay: i * 2.5, size: 2 + Math.random() * 3,
            color: ['rgba(249,115,22,0.3)', 'rgba(239,68,68,0.3)', 'rgba(251,146,60,0.3)'][i % 3]
        })), []);

    const filteredPacks = useMemo(() => {
        let result = DJ_PACKS.filter(pack => {
            const matchesArtist = filterArtist === 'All' || pack.artist === filterArtist;
            const matchesSearch = !searchQuery ||
                pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pack.artist.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesArtist && matchesSearch;
        });
        if (sortBy === 'date') result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        else if (sortBy === 'tracks') result.sort((a, b) => b.trackCount - a.trackCount);
        else if (sortBy === 'name') result.sort((a, b) => a.title.localeCompare(b.title));
        return result;
    }, [filterArtist, searchQuery, sortBy]);

    useEffect(() => {
        if (!isAutoSpotlight) return;
        const interval = setInterval(() => setSpotlightIndex(prev => (prev + 1) % DJ_PACKS.length), 5000);
        return () => clearInterval(interval);
    }, [isAutoSpotlight]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setSelectedPack(null); setOpenFolderIndex(null); }
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.getElementById('dj-search')?.focus(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const totalDownloads = DJ_PACKS.length * (Math.floor(Math.random() * 3000) + 2000);
    const totalTracks = DJ_PACKS.reduce((sum, p) => sum + p.trackCount, 0);
    const totalSize = DJ_PACKS.reduce((sum, p) => sum + parseInt(p.size), 0);

    return (
        <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map(p => <FloatingParticle key={p.id} delay={p.delay} size={p.size} color={p.color} />)}
                <motion.div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]"
                    animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
                <motion.div className="absolute bottom-0 left-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-[100px]"
                    animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} />
            </div>

            {/* Hero */}
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center mb-12 px-6 relative z-10">
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-6 shadow-lg shadow-orange-500/30">
                    <Layers className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
                    DJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Packs</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full" />
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Download exclusive DJ packs and stems from LVRN artists. Submit your remixes for a chance to be featured.
                </p>
            </motion.div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 mb-8 relative z-10">
                <div className="flex justify-center gap-2">
                    {(['packs', 'submit'] as const).map(tab => (
                        <motion.button key={tab} onClick={() => setActiveTab(tab)}
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className={`px-8 py-3 font-bold text-sm uppercase tracking-wider transition-all rounded-xl ${
                                activeTab === tab
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}>
                            {tab === 'packs' ? <><Download className="inline-block w-4 h-4 mr-2" /> Download Packs</> : <><Send className="inline-block w-4 h-4 mr-2" /> Submit Remix</>}
                        </motion.button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'packs' ? (
                    <motion.div key="packs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-7xl mx-auto px-6 relative z-10">
                        {/* Spotlight */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={16} className="text-orange-400" />
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Featured Pack</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <motion.button onClick={() => setSpotlightIndex(prev => (prev - 1 + DJ_PACKS.length) % DJ_PACKS.length)}
                                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                        <ChevronRight size={14} className="rotate-180" />
                                    </motion.button>
                                    <motion.button onClick={() => setIsAutoSpotlight(!isAutoSpotlight)}
                                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        className={`p-2 rounded-lg border transition-colors ${isAutoSpotlight ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                        {isAutoSpotlight ? <Pause size={14} /> : <Play size={14} />}
                                    </motion.button>
                                    <motion.button onClick={() => setSpotlightIndex(prev => (prev + 1) % DJ_PACKS.length)}
                                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                        <ChevronRight size={14} />
                                    </motion.button>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div key={spotlightIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
                                    {(() => {
                                        const pack = DJ_PACKS[spotlightIndex];
                                        return (
                                            <GlassCard className="!p-0 !bg-white/5 !border-white/10 overflow-hidden">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="md:w-64 h-48 md:h-auto flex-shrink-0 relative">
                                                        <img src={pack.coverUrl} alt={pack.title} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80 hidden md:block" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent md:hidden" />
                                                    </div>
                                                    <div className="flex-1 p-6 flex flex-col justify-center">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="px-2 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-[10px] font-bold uppercase tracking-wider text-orange-400">{pack.format}</span>
                                                            <span className="text-[10px] text-gray-500">Featured #{spotlightIndex + 1}</span>
                                                        </div>
                                                        <h3 className="text-xl font-black text-white mb-1">{pack.title}</h3>
                                                        <p className="text-sm text-orange-400 mb-3">{pack.artist}</p>
                                                        <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
                                                            <span className="flex items-center gap-1"><Disc size={12} />{pack.trackCount} Tracks</span>
                                                            <span className="flex items-center gap-1"><FileAudio size={12} />{pack.size}</span>
                                                        </div>
                                                        <motion.button onClick={() => setSelectedPack(pack)}
                                                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                            className="self-start px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-500/20">
                                                            <Download size={14} /> Download Pack <ArrowRight size={12} />
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        );
                                    })()}
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex justify-center gap-2 mt-3">
                                {DJ_PACKS.map((_, i) => (
                                    <button key={i} onClick={() => { setSpotlightIndex(i); setIsAutoSpotlight(false); }}
                                        className={`w-2 h-2 rounded-full transition-all ${i === spotlightIndex ? 'w-6 bg-orange-500' : 'bg-white/20 hover:bg-white/40'}`} />
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input id="dj-search" type="text" placeholder="Search packs... (Cmd+K)" value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors" />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><X size={14} /></button>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {/* View Mode Toggle */}
                                <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
                                    <motion.button onClick={() => setViewMode('folders')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className={`p-2 rounded-lg transition-colors ${viewMode === 'folders' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`} title="3D Folders">
                                        <Folder size={16} />
                                    </motion.button>
                                    <motion.button onClick={() => setViewMode('grid')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`} title="Grid">
                                        <Layers size={16} />
                                    </motion.button>
                                    <motion.button onClick={() => setViewMode('list')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`} title="List">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                                    </motion.button>
                                </div>

                                <select value={filterArtist} onChange={(e) => setFilterArtist(e.target.value)}
                                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 focus:outline-none focus:border-orange-500/50 appearance-none cursor-pointer">
                                    {ARTISTS_LIST.map(a => <option key={a} value={a} className="bg-[#111]">{a}</option>)}
                                </select>

                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 focus:outline-none focus:border-orange-500/50 appearance-none cursor-pointer">
                                    <option value="date" className="bg-[#111]">Newest</option>
                                    <option value="tracks" className="bg-[#111]">Most Tracks</option>
                                    <option value="name" className="bg-[#111]">A-Z</option>
                                </select>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 mb-6">
                            Showing <span className="text-white font-bold">{filteredPacks.length}</span> of {DJ_PACKS.length} packs
                        </p>

                        {/* 3D Folders View */}
                        {viewMode === 'folders' && filteredPacks.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                                {filteredPacks.map((pack, index) => {
                                    const originalIndex = DJ_PACKS.indexOf(pack);
                                    return (
                                        <Folder3D
                                            key={pack.id}
                                            pack={pack}
                                            index={index}
                                            isOpen={openFolderIndex === originalIndex}
                                            onOpen={() => setOpenFolderIndex(originalIndex)}
                                            onClose={() => setOpenFolderIndex(null)}
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {/* Grid View */}
                        {viewMode === 'grid' && filteredPacks.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                                {filteredPacks.map((pack, index) => (
                                    <motion.div key={pack.id}
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="group perspective-[1000px]"
                                        onClick={() => setSelectedPack(pack)}
                                    >
                                        <GlassCard className="!p-0 overflow-hidden h-full border-white/10 hover:border-orange-500/30 transition-colors shadow-lg hover:shadow-orange-500/10 cursor-pointer">
                                            <div className="relative h-48 overflow-hidden">
                                                <motion.img src={pack.coverUrl} alt={pack.title} className="w-full h-full object-cover"
                                                    whileHover={{ scale: 1.1 }} transition={{ duration: 0.7 }} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                                <div className="absolute top-3 left-3 flex gap-2">
                                                    <span className="px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-white">{pack.trackCount} Tracks</span>
                                                    <span className="px-2 py-1 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 text-[10px] font-bold text-orange-400">{pack.format.split('/')[0].trim()}</span>
                                                </div>
                                                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                                                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                        className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/40">
                                                        <Headphones className="w-6 h-6 text-white" />
                                                    </motion.div>
                                                </motion.div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="text-base font-bold text-white mb-1 group-hover:text-orange-400 transition-colors line-clamp-1">{pack.title}</h3>
                                                <p className="text-sm text-orange-400 font-medium mb-3">{pack.artist}</p>
                                                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                                    <span className="flex items-center gap-1"><FileAudio size={12} />{pack.size}</span>
                                                    <span className="flex items-center gap-1"><Clock size={12} />{new Date(pack.releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                                </div>
                                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20">
                                                    <Download size={14} /> Download Pack
                                                </motion.button>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* List View */}
                        {viewMode === 'list' && filteredPacks.length > 0 && (
                            <div className="flex flex-col gap-3 max-w-3xl mx-auto mb-16">
                                {filteredPacks.map((pack, index) => (
                                    <motion.div key={pack.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}>
                                        <button onClick={() => setSelectedPack(pack)}
                                            className="w-full flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-left group">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={pack.coverUrl} alt={pack.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-bold text-white truncate group-hover:text-orange-400 transition-colors">{pack.title}</h3>
                                                <p className="text-xs text-gray-400">{pack.artist}</p>
                                            </div>
                                            <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1"><Disc size={12} />{pack.trackCount}</span>
                                                <span className="flex items-center gap-1"><FileAudio size={12} />{pack.size}</span>
                                            </div>
                                            <ArrowRight size={14} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* No Results */}
                        {filteredPacks.length === 0 && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                                <Search size={48} className="mx-auto mb-4 text-gray-700" />
                                <p className="text-gray-500 text-lg mb-2">No packs found</p>
                                <button onClick={() => { setSearchQuery(''); setFilterArtist('All'); }}
                                    className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 text-sm font-bold hover:bg-orange-500/30 transition-colors">
                                    Reset Filters
                                </button>
                            </motion.div>
                        )}

                        {/* Stats */}
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                            {[
                                { label: 'Total Packs', value: DJ_PACKS.length, icon: Disc, color: 'text-orange-500' },
                                { label: 'Total Tracks', value: totalTracks, icon: Music, color: 'text-blue-500' },
                                { label: 'Total Downloads', value: totalDownloads, suffix: '+', icon: Download, color: 'text-emerald-500' },
                                { label: 'Total Size', value: totalSize, suffix: 'MB+', icon: FileAudio, color: 'text-purple-500' }
                            ].map((stat, i) => (
                                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.03, y: -2 }}
                                    className="text-center p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors group">
                                    <stat.icon className={`w-6 h-6 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                                    <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-1`}>
                                        <AnimatedCounter target={stat.value} suffix={stat.suffix || ''} />
                                    </div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Info Box */}
                        <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Zap size={20} className="text-orange-400" /> About DJ Packs
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-gray-400 leading-relaxed mb-4">
                                        Our DJ packs include stems, multitracks, and exclusive edits from our artists' catalog. Available exclusively for DJs and producers.
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-500">
                                        {['High-quality WAV files', 'Separate stems for each track', 'DJ-friendly edits included'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-500" />{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-gray-400 leading-relaxed mb-4">Need help with a pack or have questions? Contact our team for support.</p>
                                    <a href="mailto:djpacks@lvrn.com" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium">
                                        <Mail size={16} /> djpacks@lvrn.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="submit" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto px-6 relative z-10">
                        <GlassCard className="!p-8">
                            <div className="text-center mb-8">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15, stiffness: 200 }}
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-4 shadow-lg shadow-orange-500/30">
                                    <Send className="w-7 h-7 text-white" />
                                </motion.div>
                                <h2 className="text-2xl font-bold text-white mb-2">Submit Your Remix</h2>
                                <p className="text-gray-400">Show us what you've got. Selected remixes will be announced and promoted.</p>
                            </div>
                            <RemixForm />
                        </GlassCard>
                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm mb-4">Follow us for remix announcements</p>
                            <div className="flex justify-center gap-4">
                                {[
                                    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
                                    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
                                    { icon: <Mail size={20} />, href: 'mailto:djpacks@lvrn.com', label: 'Email' }
                                ].map((social, i) => (
                                    <motion.a key={i} href={social.href} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-400 rounded-full transition-colors border border-white/10 hover:border-orange-500/30">
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pack Detail Modal */}
            <AnimatePresence>
                {selectedPack && <PackDetailModal pack={selectedPack} onClose={() => setSelectedPack(null)} />}
            </AnimatePresence>
        </div>
    );
};
