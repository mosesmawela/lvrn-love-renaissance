import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Music, FileAudio, Send, Check, Loader2, Upload, X, Headphones, Mail, Instagram, Twitter } from 'lucide-react';
import { DJ_PACKS } from '../constants';

interface DJPacksProps {
    onNavigate?: (pageId: string) => void;
}

const DJPackCard: React.FC<{ pack: typeof DJ_PACKS[0]; index: number }> = ({ pack, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="glass-panel overflow-hidden h-full">
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                    <img 
                        src={pack.coverUrl} 
                        alt={pack.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Track Count Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-xs font-bold text-white rounded">
                        {pack.trackCount} Tracks
                    </div>

                    {/* Play Button on Hover */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/50"
                    >
                        <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                            <Headphones className="w-7 h-7 text-white" />
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-lg font-bold text-[var(--text-color)] mb-1 group-hover:text-orange-500 transition-colors line-clamp-1">
                        {pack.title}
                    </h3>
                    <p className="text-sm text-orange-500 font-medium mb-3">{pack.artist}</p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                            <FileAudio size={12} />
                            {pack.format}
                        </span>
                        <span className="flex items-center gap-1">
                            <Download size={12} />
                            {pack.size}
                        </span>
                    </div>

                    {/* Download Button */}
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Preparing...
                            </>
                        ) : (
                            <>
                                <Download size={14} />
                                Download Pack
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const RemixForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        artistName: '',
        trackTitle: '',
        description: '',
        subscribeEmail: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [fileName, setFileName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setSubmitStatus('success');
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            artistName: '',
            trackTitle: '',
            description: '',
            subscribeEmail: true
        });
        setFileName('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if (submitStatus === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-6"
            >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Submission Received!</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Thank you for submitting your remix. Our team will review it and if selected, we'll announce it and contact you via email for updates.
                </p>
                <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-3 border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                    Submit Another Remix
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-[var(--text-color)] placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="John Smith"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-[var(--text-color)] placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Artist/Producer Name */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Artist / Producer Name *
                    </label>
                    <input
                        type="text"
                        name="artistName"
                        required
                        value={formData.artistName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-[var(--text-color)] placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Your Stage Name"
                    />
                </div>

                {/* Original Track Title */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Original Track Title *
                    </label>
                    <input
                        type="text"
                        name="trackTitle"
                        required
                        value={formData.trackTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-[var(--text-color)] placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="Track you're remixing"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Remix Description
                </label>
                <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-[var(--text-color)] placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="Tell us about your remix approach, key changes, vibes..."
                />
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Upload Your Remix (WAV/MP3) *
                </label>
                <div className="border-2 border-dashed border-white/20 hover:border-orange-500 transition-colors rounded-xl p-8 text-center">
                    {fileName ? (
                        <div className="flex items-center justify-center gap-3">
                            <FileAudio className="w-8 h-8 text-orange-500" />
                            <span className="text-white font-medium">{fileName}</span>
                            <button 
                                type="button"
                                onClick={() => setFileName('')}
                                className="p-1 hover:bg-white/10 rounded"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                            <p className="text-gray-400 text-sm mb-2">
                                Drag and drop your file here, or click to browse
                            </p>
                            <p className="text-gray-500 text-xs">
                                Max file size: 50MB | Formats: WAV, MP3
                            </p>
                            <input 
                                type="file" 
                                accept=".wav,.mp3"
                                className="hidden"
                                id="remix-upload"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setFileName(file.name);
                                }}
                            />
                            <label 
                                htmlFor="remix-upload"
                                className="inline-block mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium cursor-pointer transition-colors"
                            >
                                Browse Files
                            </label>
                        </>
                    )}
                </div>
            </div>

            {/* Email Subscription */}
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="subscribe"
                    checked={formData.subscribeEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, subscribeEmail: e.target.checked }))}
                    className="mt-1 w-4 h-4 accent-orange-500"
                />
                <label htmlFor="subscribe" className="text-sm text-gray-400">
                    I want to subscribe to LVRN updates via email to be notified about remix announcements, new releases, and exclusive opportunities.
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Send size={16} />
                        Submit Remix
                    </>
                )}
            </button>
        </form>
    );
};

export const DJPacks: React.FC<DJPacksProps> = () => {
    const [activeTab, setActiveTab] = useState<'packs' | 'submit'>('packs');

    return (
        <div className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 px-6"
            >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-6 shadow-lg shadow-orange-500/30">
                    <Music className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-[var(--text-color)] tracking-tight mb-4">
                    DJ Packs
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6" />
                <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                    Download exclusive DJ packs and stems from LVRN artists. Submit your remixes for a chance to be featured.
                </p>
            </motion.div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setActiveTab('packs')}
                        className={`px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all ${
                            activeTab === 'packs'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                    >
                        <Download className="inline-block w-4 h-4 mr-2" />
                        Download Packs
                    </button>
                    <button
                        onClick={() => setActiveTab('submit')}
                        className={`px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all ${
                            activeTab === 'submit'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                    >
                        <Send className="inline-block w-4 h-4 mr-2" />
                        Submit Remix
                    </button>
                </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'packs' ? (
                    <motion.div
                        key="packs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-7xl mx-auto px-6"
                    >
                        {/* Packs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {DJ_PACKS.map((pack, index) => (
                                <DJPackCard key={pack.id} pack={pack} index={index} />
                            ))}
                        </div>

                        {/* Info Box */}
                        <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-xl font-bold text-white mb-4">About DJ Packs</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-gray-400 leading-relaxed mb-4">
                                        Our DJ packs include stems, multitracks, and exclusive edits from our artists' catalog. 
                                        These packs are available exclusively for DJs and producers.
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-500">
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-orange-500" />
                                            High-quality WAV files
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-orange-500" />
                                            Separate stems for each track
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-orange-500" />
                                            DJ-friendly edits included
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-gray-400 leading-relaxed mb-4">
                                        Need help with a pack or have questions? Contact our team for support.
                                    </p>
                                    <a 
                                        href="mailto:djpacks@lvrn.com" 
                                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium"
                                    >
                                        <Mail size={16} />
                                        djpacks@lvrn.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="submit"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-2xl mx-auto px-6"
                    >
                        <div className="glass-panel p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">Submit Your Remix</h2>
                                <p className="text-gray-400">
                                    Show us what you've got. Selected remixes will be announced and promoted.
                                </p>
                            </div>
                            <RemixForm />
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm mb-4">Follow us for remix announcements</p>
                            <div className="flex justify-center gap-4">
                                <a href="#" className="p-3 bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 rounded-full transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="p-3 bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 rounded-full transition-colors">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className="p-3 bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 rounded-full transition-colors">
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
