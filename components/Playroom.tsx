import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { X, Play, Mic, ChevronLeft, Info, AlertCircle, RefreshCw, Loader2, Settings, Radio, Zap, ListMusic, Heart, Search, Volume2, SkipBack, SkipForward, Maximize2, Minimize2, Shuffle, Repeat } from 'lucide-react';
import { Logo } from './Logo';
import { useExperience } from './ExperienceProvider';
import { PLAYROOM_ALBUMS } from '../constants';
import { PlayroomAlbum } from '../types';

interface PlayroomProps {
    onExit: () => void;
}

const PARTICLE_COUNT = 200;
const AUDIO_SMOOTHING = 0.85;
const FFT_SIZE = 2048;

interface RGB { r: number; g: number; b: number }
interface HSV { h: number; s: number; v: number }

class Particle {
    x: number;
    y: number;
    z: number;
    baseSize: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: RGB;
    targetColor: RGB;
    type: 'ambient' | 'signal' | 'energy' | 'swirl';
    angle: number;
    radius: number;
    angularSpeed: number;

    constructor(w: number, h: number, type: 'ambient' | 'signal' | 'energy' | 'swirl' = 'ambient', initialColor?: RGB) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.z = Math.random();
        this.type = type;

        const defaultColor = { r: 255, g: 179, b: 71 };
        this.color = initialColor ? { ...initialColor } : defaultColor;
        this.targetColor = initialColor ? { ...initialColor } : defaultColor;

        if (type === 'ambient') {
            this.baseSize = Math.random() * 2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.maxLife = 500 + Math.random() * 500;
            this.angle = Math.random() * Math.PI * 2;
            this.radius = Math.random() * 50 + 20;
            this.angularSpeed = (Math.random() - 0.5) * 0.02;
        } else if (type === 'signal') {
            this.baseSize = Math.random() * 3 + 1;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.maxLife = 100 + Math.random() * 100;
            this.angle = 0;
            this.radius = 0;
            this.angularSpeed = 0;
        } else if (type === 'swirl') {
            this.x = w / 2 + (Math.random() - 0.5) * 200;
            this.y = h / 2 + (Math.random() - 0.5) * 200;
            this.baseSize = Math.random() * 1.5 + 0.5;
            this.vx = 0;
            this.vy = 0;
            this.maxLife = 200 + Math.random() * 200;
            this.angle = Math.random() * Math.PI * 2;
            this.radius = Math.random() * 150 + 50;
            this.angularSpeed = (Math.random() - 0.5) * 0.05 + 0.02;
        } else {
            this.x = w / 2;
            this.y = h / 2;
            this.baseSize = Math.random() * 4 + 2;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 3;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.maxLife = 40 + Math.random() * 20;
            this.angle = 0;
            this.radius = 0;
            this.angularSpeed = 0;
        }

        this.life = this.maxLife;
    }

    updateColor() {
        const lerp = 0.08;
        this.color.r += (this.targetColor.r - this.color.r) * lerp;
        this.color.g += (this.targetColor.g - this.color.g) * lerp;
        this.color.b += (this.targetColor.b - this.color.b) * lerp;
    }

    update(w: number, h: number, energy: { bass: number, mid: number, high: number }, mouse: { x: number, y: number }, isActive: boolean) {
        this.updateColor();

        const speedMult = isActive ? (1 + (energy.mid / 255) * 3) : 0.5;

        if (this.type === 'swirl') {
            this.angle += this.angularSpeed * (1 + energy.bass / 255);
            const centerX = w / 2;
            const centerY = h / 2;
            this.x = centerX + Math.cos(this.angle) * this.radius * (1 + energy.bass / 512);
            this.y = centerY + Math.sin(this.angle) * this.radius * (1 + energy.bass / 512);
        } else {
            this.x += this.vx * speedMult;
            this.y += this.vy * speedMult;
        }
        
        this.life--;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 300;

        if (dist < interactionRadius && dist > 0) {
            const force = (interactionRadius - dist) / interactionRadius;
            this.vx += (dx / dist) * force * 0.15;
            this.vy += (dy / dist) * force * 0.15;
        }

        if (this.life <= 0 || this.x < -50 || this.x > w + 50 || this.y < -50 || this.y > h + 50) {
            if (this.type === 'ambient' || this.type === 'swirl') {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.life = this.maxLife;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.angle = Math.random() * Math.PI * 2;
                this.radius = Math.random() * 50 + 20;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, energy: { bass: number }, isActive: boolean) {
        const opacity = (this.life / this.maxLife) * this.z * (isActive ? 0.9 : 0.4);
        const beatScale = isActive ? (energy.bass / 255) * 4 : 0;
        const scale = Math.max(0.1, this.baseSize * (0.5 + this.z) + beatScale);

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, scale * 2);
        gradient.addColorStop(0, `rgba(${Math.floor(this.color.r)}, ${Math.floor(this.color.g)}, ${Math.floor(this.color.b)}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${Math.floor(this.color.r)}, ${Math.floor(this.color.g)}, ${Math.floor(this.color.b)}, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${Math.floor(this.color.r)}, ${Math.floor(this.color.g)}, ${Math.floor(this.color.b)}, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, scale * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

const hexToRgb = (hex: string): RGB => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 179, b: 71 };
};

const rgbToHsv = (rgb: RGB): HSV => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const s = max === 0 ? 0 : d / max;
    const v = max;
    let h = 0;
    if (max !== min) {
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: h * 360, s: s * 100, v: v * 100 };
};

const hsvToRgb = (hsv: HSV): RGB => {
    const h = hsv.h / 360;
    const s = hsv.s / 100;
    const v = hsv.v / 100;
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const getResponsiveRadius = (width: number) => {
    if (width < 768) return width * 0.3;
    if (width < 1024) return width * 0.35;
    return 380;
};

interface FloatingAlbumProps {
    album: PlayroomAlbum;
    index: number;
    total: number;
    radius: number;
    onPlay: (a: PlayroomAlbum) => void;
    onHover: (color: string) => void;
    onLeave: () => void;
    onReposition: (fromIndex: number, toIndex: number) => void;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
    isPlaying?: boolean;
    mousePosition: { x: number; y: number };
}

const FloatingAlbum: React.FC<FloatingAlbumProps> = ({
    album, index, total, radius, onPlay, onHover, onLeave, onReposition,
    isFavorite, onToggleFavorite, isPlaying, mousePosition
}) => {
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep;
    const initialX = Math.cos(angle) * radius;
    const initialY = Math.sin(angle) * radius * 0.55;
    const initialZ = Math.sin(angle) * 100;

    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [localX, setLocalX] = useState(0);
    const [localY, setLocalY] = useState(0);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const scale = useMotionValue(1);
    const glowIntensity = useMotionValue(0);

    useEffect(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        const deltaX = mousePosition.x - cardX;
        const deltaY = mousePosition.y - cardY;
        
        const rotY = deltaX * 0.02;
        const rotX = -deltaY * 0.02;
        
        rotateX.set(rotX);
        rotateY.set(rotY);
        
        if (isPlaying) {
            glowIntensity.set(1);
        } else if (isHovered) {
            glowIntensity.set(0.6);
        } else {
            glowIntensity.set(0);
        }
    }, [mousePosition, isHovered, isPlaying, rotateX, rotateY, glowIntensity]);

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    const albumColor = hexToRgb(album.color);

    return (
        <motion.div
            ref={cardRef}
            className={`absolute ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
                width: '220px',
                height: '220px',
                marginLeft: '-110px',
                marginTop: '-110px',
                transformStyle: 'preserve-3d',
                zIndex: Math.floor(initialZ + 300),
                perspective: '1000px'
            }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
                opacity: 1,
                scale: isHovered ? 1.15 : (isPlaying ? 1.1 : 1),
                x: initialX + localX,
                y: initialY + localY,
                z: isHovered ? 150 : (isPlaying ? 100 : initialZ)
            }}
            transition={{
                delay: index * 0.08,
                duration: 0.6,
                type: 'spring',
                bounce: 0.3
            }}
            whileHover={{ scale: 1.15 }}
            onMouseEnter={() => {
                setIsHovered(true);
                onHover(album.color);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onLeave();
            }}
            onClick={() => !isDragging && onPlay(album)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    scale
                }}
                className="w-full h-full relative"
                animate={{
                    y: isHovered ? -15 : [0, -8, 0],
                    rotateZ: isHovered ? 0 : (index % 2 === 0 ? 1.5 : -1.5)
                }}
                transition={{
                    y: { duration: 3 + (index % 4), repeat: Infinity, ease: "easeInOut" },
                    rotateZ: { duration: 5 + (index % 3), repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <motion.div
                    className="relative w-full h-full rounded-2xl overflow-hidden"
                    style={{
                        boxShadow: isHovered || isPlaying 
                            ? `0 25px 60px rgba(${albumColor.r}, ${albumColor.g}, ${albumColor.b}, 0.4), 0 0 40px rgba(${albumColor.r}, ${albumColor.g}, ${albumColor.b}, 0.3), inset 0 0 30px rgba(${albumColor.r}, ${albumColor.g}, ${albumColor.b}, 0.1)`
                            : '0 20px 50px rgba(0,0,0,0.5)',
                        border: `2px solid ${isHovered || isPlaying ? album.color : 'rgba(255,255,255,0.1)'}`,
                    }}
                    animate={{
                        borderColor: isPlaying 
                            ? album.color 
                            : (isHovered ? album.color : 'rgba(255,255,255,0.1)')
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="absolute inset-0 bg-black">
                        <img
                            src={album.coverUrl}
                            alt={album.title}
                            className="w-full h-full object-cover transition-transform duration-700"
                            style={{
                                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                            }}
                            loading="eager"
                        />
                    </div>
                    
                    <div className={`absolute inset-0 transition-all duration-300 ${
                        isHovered ? 'bg-black/30' : 'bg-black/10'
                    }`} />

                    {onToggleFavorite && (
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite();
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md z-10 transition-all duration-300 ${
                                isFavorite 
                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' 
                                : 'bg-black/60 text-white/70 hover:text-white hover:bg-black/80'
                            }`}
                        >
                            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                        </motion.button>
                    )}

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md z-10"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.1 }}
                                    className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/20"
                                >
                                    <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                                </motion.div>
                                <p className="text-sm font-black text-white uppercase tracking-widest mb-2">{album.artist}</p>
                                <p className="text-xs text-gray-300 font-medium px-4 text-center line-clamp-2">{album.title}</p>
                                <div className="mt-3 px-3 py-1 rounded-full bg-white/10 text-[10px] text-gray-400 uppercase">
                                    {album.year}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isPlaying && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.div
                                className="h-full"
                                style={{ backgroundColor: album.color }}
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                        </motion.div>
                    )}

                    <motion.div
                        className="absolute -inset-4 rounded-3xl opacity-0"
                        style={{
                            background: `radial-gradient(circle, ${album.color}40 0%, transparent 70%)`
                        }}
                        animate={{ opacity: isHovered || isPlaying ? 0.5 : 0 }}
                    />
                </motion.div>

                <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-32 h-8 rounded-full blur-xl"
                    style={{ backgroundColor: album.color }}
                    animate={{
                        opacity: isHovered ? 0.4 : 0,
                        scale: isHovered ? 1.2 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </motion.div>
    );
};

export const Playroom: React.FC<PlayroomProps> = ({ onExit }) => {
    const { isAudioEnabled, toggleAudio, showNotification } = useExperience();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // States
    const [showWelcome, setShowWelcome] = useState(true);
    const [selectedAlbum, setSelectedAlbum] = useState<PlayroomAlbum | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [micMode, setMicMode] = useState(false);
    const [micError, setMicError] = useState(false);
    const [micErrorMessage, setMicErrorMessage] = useState("We couldn't access your microphone.");
    const [loadingIframe, setLoadingIframe] = useState(false);
    const [radius, setRadius] = useState(350);
    const [albumOrder, setAlbumOrder] = useState<number[]>(PLAYROOM_ALBUMS.map((_, i) => i));
    const [isShuffled, setIsShuffled] = useState(false);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showEqualizer, setShowEqualizer] = useState(false);
    const [visualizerMode, setVisualizerMode] = useState<'particles' | 'waves' | 'spectrum'>('particles');

    // Refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const animationFrameRef = useRef<number>(0);
    const particleSystemRef = useRef<Particle[]>([]);
    const currentColorRef = useRef<RGB>({ r: 255, g: 179, b: 71 }); // Default Gold

    const mouseRef = useRef({ x: -1000, y: -1000 });
    const tiltX = useSpring(0, { stiffness: 100, damping: 30 });
    const tiltY = useSpring(0, { stiffness: 100, damping: 30 });

    // Init Audio Context (Silent Start)
    useEffect(() => {
        if (!isAudioEnabled) toggleAudio();

        // Responsive Radius
        const handleResize = () => setRadius(getResponsiveRadius(window.innerWidth));
        window.addEventListener('resize', handleResize);
        handleResize();

        // Keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (selectedAlbum || micMode || micError) {
                    stopPlayback();
                } else if (!showWelcome) {
                    onExit();
                }
            }
            if (e.key === ' ' && !showWelcome) {
                e.preventDefault();
                if (micMode) {
                    stopPlayback();
                } else if (!selectedAlbum) {
                    playMic();
                }
            }
            if (e.key === 'f' && !showWelcome && selectedAlbum) {
                toggleFavorite(selectedAlbum.id);
            }
            if (e.key === 's' && !showWelcome) {
                setShowSearch(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyDown);
            stopPlayback();
        };
    }, []);

    // Toggle favorite
    const toggleFavorite = (albumId: string) => {
        setFavorites(prev => {
            const newFavs = new Set(prev);
            if (newFavs.has(albumId)) {
                newFavs.delete(albumId);
                showNotification('Removed from favorites', 'info');
            } else {
                newFavs.add(albumId);
                showNotification('Added to favorites', 'success');
            }
            return newFavs;
        });
    };

    // Filtered albums based on search
    const filteredAlbums = useMemo(() => {
        if (!searchQuery) return albumOrder;
        const query = searchQuery.toLowerCase();
        return albumOrder.filter(idx => {
            const album = PLAYROOM_ALBUMS[idx];
            return album.artist.toLowerCase().includes(query) || 
                   album.title.toLowerCase().includes(query);
        });
    }, [albumOrder, searchQuery]);

    // Iframe Timeout Logic
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (loadingIframe) {
            timer = setTimeout(() => {
                setLoadingIframe(false);
                showNotification("Visuals synced (Connection slow)", "info");
            }, 8000); // 8s timeout
        }
        return () => clearTimeout(timer);
    }, [loadingIframe]);

    // --- Visualizer Loop ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Init Particles
        const initParticles = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particleSystemRef.current = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particleSystemRef.current.push(new Particle(canvas.width, canvas.height, 'ambient'));
            }
        };
        initParticles();
        window.addEventListener('resize', initParticles);

        // Audio Analysis Setup - Create if not exists
        if (!audioContextRef.current) {
            try {
                const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                audioContextRef.current = new AudioCtx();
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = FFT_SIZE;
                analyserRef.current.smoothingTimeConstant = AUDIO_SMOOTHING;
            } catch (e) {
                console.error("Audio Context Init Failed", e);
            }
        }

        const bufferLength = analyserRef.current ? analyserRef.current.frequencyBinCount : 1024;
        const dataArray = new Uint8Array(bufferLength);

        // Beat Detection Variables
        let lastBeatTime = 0;

        const render = () => {
            if (!ctx) return;

            let bass = 0, mid = 0, high = 0;
            let isBeat = false;
            const now = Date.now();

            // --- 1. Get Audio Data ---
            if (micMode && analyserRef.current && !micError) {
                analyserRef.current.getByteFrequencyData(dataArray);
                // Simple Frequency Bands
                for (let i = 0; i < bufferLength; i++) {
                    const val = dataArray[i];
                    if (i < 10) bass += val;
                    else if (i < 100) mid += val;
                    else if (i < 500) high += val;
                }
                bass /= 10;
                mid /= 90;
                high /= 400;

                // Beat Detection (Energy > Threshold)
                if (bass > 240 && now - lastBeatTime > 400) {
                    isBeat = true;
                    lastBeatTime = now;
                }

            } else if (isPlaying && !micMode) {
                // --- Simulated Audio Logic ---
                // Create complex waveforms based on time
                const time = now / 1000;

                // Base Rhythm (120 BPM approx)
                const beatPulse = Math.sin(time * Math.PI * 4); // 2Hz = 120bpm
                const subBass = Math.sin(time * 0.5) * 50 + 150;

                // Add some noise/randomness
                const noise = Math.random() * 20;

                // Simulate Bass Kick
                bass = subBass + (beatPulse > 0.8 ? 80 : 0) + noise;
                if (beatPulse > 0.9 && now - lastBeatTime > 500) {
                    isBeat = true;
                    lastBeatTime = now;
                }

                mid = (Math.cos(time * 3) * 0.5 + 0.5) * 100 + 50;
                high = (Math.sin(time * 10) * 0.5 + 0.5) * 80;
            }

            const energy = { bass, mid, high };

            // --- 2. Draw Background ---
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // --- 3. Visualizer Modes ---
            const target = currentColorRef.current;

            if (visualizerMode === 'waves') {
                // Wave visualization
                ctx.save();
                const time = now / 1000;
                const centerY = canvas.height / 2;
                
                for (let wave = 0; wave < 3; wave++) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${target.r}, ${target.g}, ${target.b}, ${0.3 - wave * 0.1})`;
                    ctx.lineWidth = 2 + wave;
                    
                    for (let x = 0; x < canvas.width; x += 5) {
                        const freq = 0.01 + wave * 0.005;
                        const amp = 50 + wave * 30 + (bass / 255) * 50;
                        const y = centerY + Math.sin(x * freq + time * (2 + wave) + wave) * amp;
                        
                        if (x === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                }
                ctx.restore();

            } else if (visualizerMode === 'spectrum') {
                // Spectrum bars
                const barCount = 64;
                const barWidth = canvas.width / barCount;
                
                for (let i = 0; i < barCount; i++) {
                    const height = Math.random() * (150 + bass / 2);
                    const hue = (i / barCount) * 60 + (target.r / 4);
                    ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
                    ctx.fillRect(
                        i * barWidth,
                        canvas.height - height,
                        barWidth - 2,
                        height
                    );
                }
            }

            // --- 4. Update & Draw Particles ---
            const particleTarget = currentColorRef.current;
            ctx.save();

            // Screen Shake on Bass
            if ((isPlaying || micMode) && bass > 200) {
                const shake = (bass - 200) * 0.05;
                ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
            }

            // Spawn Energy Particles on Beat
            if (isBeat) {
                for (let i = 0; i < 5; i++) {
                    particleSystemRef.current.push(new Particle(canvas.width, canvas.height, 'energy', currentColorRef.current));
                }
            }

            // Update Target Color Global - using existing target from section 3
            particleSystemRef.current.forEach((p, index) => {
                // Propagate global target color to particles
                p.targetColor = target;
                p.update(canvas.width, canvas.height, energy, mouseRef.current, isPlaying || micMode);
                p.draw(ctx, energy, isPlaying || micMode);

                // Cull dead particles
                if (p.life <= 0 && p.type !== 'ambient') {
                    particleSystemRef.current.splice(index, 1);
                }
            });

            // Maintain particle count
            if (particleSystemRef.current.length > PARTICLE_COUNT * 2) {
                particleSystemRef.current.splice(0, particleSystemRef.current.length - PARTICLE_COUNT);
            }

            // Connecting Lines (Constellation effect)
            if (isPlaying || micMode) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${target.r}, ${target.g}, ${target.b}, 0.05)`;
                ctx.lineWidth = 0.5;

                for (let i = 0; i < particleSystemRef.current.length; i += 3) {
                    const p1 = particleSystemRef.current[i];
                    for (let j = i + 1; j < particleSystemRef.current.length; j += 5) {
                        const p2 = particleSystemRef.current[j];
                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 100) {
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                        }
                    }
                }
                ctx.stroke();
            }

            ctx.restore();
            animationFrameRef.current = requestAnimationFrame(render);
        };

        render();
        return () => {
            window.removeEventListener('resize', initParticles);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isPlaying, micMode, micError, visualizerMode]);

    // Fullscreen change handler
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // --- Interaction Handlers ---

    const handleMouseMove = useCallback((clientX: number, clientY: number) => {
        mouseRef.current = { x: clientX, y: clientY };

        // Parallax Calculations
        const xPct = (clientX / window.innerWidth) - 0.5;
        const yPct = (clientY / window.innerHeight) - 0.5;

        tiltX.set(xPct * 20); // Max rotation deg
        tiltY.set(yPct * 20);
    }, [tiltX, tiltY]);

    // Combine Mouse and Touch
    const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
        let cx, cy;
        if ('touches' in e) {
            cx = e.touches[0].clientX;
            cy = e.touches[0].clientY;
        } else {
            cx = (e as React.MouseEvent).clientX;
            cy = (e as React.MouseEvent).clientY;
        }
        handleMouseMove(cx, cy);
    };

    const handleColorChange = (hex: string) => {
        currentColorRef.current = hexToRgb(hex);
    };

    const resetColor = () => {
        if (!selectedAlbum) {
            currentColorRef.current = { r: 255, g: 179, b: 71 }; // Default
        } else {
            currentColorRef.current = hexToRgb(selectedAlbum.color);
        }
    };

    // --- Playback Control ---

    const stopPlayback = () => {
        setIsPlaying(false);
        setSelectedAlbum(null);
        setMicMode(false);
        setMicError(false);
        resetColor();

        // Stop Audio Source
        if (sourceNodeRef.current) {
            sourceNodeRef.current.disconnect();
            sourceNodeRef.current = null;
        }

        // IMPORTANT: Stop Media Tracks to release hardware
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
    };

    const playTrack = async (album: PlayroomAlbum) => {
        setShowWelcome(false);
        stopPlayback(); // Ensure previous state is cleared
        // Small delay to allow state reset
        setTimeout(() => {
            setSelectedAlbum(album);
            setLoadingIframe(true);
            setIsPlaying(true);
            handleColorChange(album.color);
            showNotification(`Now playing: ${album.title} - ${album.artist}`, "success");
        }, 50);
    };

    const handleReposition = (fromIndex: number, toIndex: number) => {
        const newOrder = [...albumOrder];
        const [moved] = newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, moved);
        setAlbumOrder(newOrder);
        showNotification("Album position updated", "info");
    };

    const shuffleAlbums = () => {
        const shuffled = [...albumOrder].sort(() => Math.random() - 0.5);
        setAlbumOrder(shuffled);
        setIsShuffled(true);
        showNotification("Albums shuffled!", "info");
    };

    const resetAlbumOrder = () => {
        setAlbumOrder(PLAYROOM_ALBUMS.map((_, i) => i));
        setIsShuffled(false);
        showNotification("Album order reset", "info");
    };

    const playMic = async () => {
        // Clear previous state first
        stopPlayback();

        let ctx = audioContextRef.current;

        // Lazy Init AudioContext
        if (!ctx) {
            try {
                const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                ctx = new AudioCtx();
                audioContextRef.current = ctx;
                analyserRef.current = ctx.createAnalyser();
                analyserRef.current.fftSize = FFT_SIZE;
                analyserRef.current.smoothingTimeConstant = AUDIO_SMOOTHING;
            } catch {
                setMicError(true);
                setMicErrorMessage("Audio System Failure. Your browser may not support this feature.");
                showNotification("System Audio Error", "error");
                return;
            }
        }

        // Ensure Context is Running (Browser Policy requires user gesture)
        if (ctx.state === 'suspended') {
            try {
                await ctx.resume();
            } catch (e) {
                console.error("Failed to resume AudioContext", e);
            }
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            if (!analyserRef.current) throw new Error("Analyser not ready");

            const source = ctx.createMediaStreamSource(stream);
            source.connect(analyserRef.current);

            sourceNodeRef.current = source;
            mediaStreamRef.current = stream; // Store stream for cleanup

            setMicMode(true);
            setMicError(false);
            setIsPlaying(true);

            currentColorRef.current = { r: 255, g: 255, b: 255 }; // White for Mic
            showNotification("Microphone Input Active", "success");
        } catch (err: unknown) {
            console.error("Mic Error", err);
            setMicError(true);

            // Specific Error Handling
            const error = err as Error;
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                setMicErrorMessage("Permission Denied. Please allow microphone access in your browser address bar.");
                showNotification("Permission Denied", "error");
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                setMicErrorMessage("No microphone found. Please check your connection.");
                showNotification("Device Not Found", "error");
            } else {
                setMicErrorMessage("Unable to access microphone. Please try again.");
                showNotification("Audio Error", "error");
            }
        }
    };

    const switchToSimulation = () => {
        // Fallback to a simulation mode (playing "nothing" but running visuals)
        stopPlayback();
        setIsPlaying(true);
        setMicMode(false);
        setMicError(false);
        currentColorRef.current = { r: 100, g: 200, b: 255 }; // Cyan for sim
        showNotification("Switched to Simulation Mode", "info");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black cursor-default overflow-hidden"
            onMouseMove={onPointerMove}
            onTouchMove={onPointerMove}
            ref={containerRef}
        >
            {/* Canvas Layer */}
            <canvas ref={canvasRef} className="absolute inset-0 block z-0 touch-none" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-0" />

            {/* Grid Floor (Perspective Hint) */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(249,115,22,0.05)_100%)] pointer-events-none z-0"
                style={{ perspective: '500px', transformStyle: 'preserve-3d' }}
            >
                <div className="w-full h-full opacity-20" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    transform: 'rotateX(60deg) scale(2)'
                }} />
            </div>

            {/* UI Layer */}
            <div className="absolute inset-0 z-20 flex flex-col pointer-events-none">

                {/* Welcome Screen Overlay */}
                <AnimatePresence>
                    {showWelcome && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl pointer-events-auto"
                        >
                            <div className="max-w-2xl mx-6 text-center">
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mb-8"
                                >
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-6 shadow-lg shadow-orange-500/30">
                                        <Radio className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">PLAYROOM</h2>
                                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6" />
                                </motion.div>

                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-6 mb-10"
                                >
                                    <p className="text-xl text-gray-300 leading-relaxed">
                                        Welcome to <span className="text-orange-500 font-semibold">Playroom</span> — your exclusive gateway to preview unreleased music before it hits the world.
                                    </p>
                                    <p className="text-gray-400 leading-relaxed">
                                        This is LVRN's exclusive listening experience where DJs, producers, and select partners can preview upcoming releases, unreleased tracks, and exclusive edits. Experience the music as intended — before anyone else.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="grid md:grid-cols-2 gap-4 mb-10 text-left"
                                >
                                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                <Radio size={20} className="text-orange-500" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">The Purpose</h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Playroom is a secure environment designed for high-fidelity previews. It's where we test the emotional impact of music before its official release.
                                        </p>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                <Zap size={20} className="text-blue-500" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">Visual Synthesis</h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Our custom visualization engine reacts to frequencies in real-time or through advanced temporal algorithms, creating a unique visual landscape.
                                        </p>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                                <Mic size={20} className="text-purple-500" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">Live Interaction</h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Enable "Live Input" to have the environment react to your physical space. Perfect for studio environments or live listening sessions.
                                        </p>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <ListMusic size={20} className="text-green-500" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">DJ Ready</h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Beyond listening, Playroom serves as a portal for DJs to access elite edits and stems. Check the "DJ Pack" section in the main hub.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    onClick={() => setShowWelcome(false)}
                                    className="btn-luxury text-sm px-10"
                                >
                                    Enter Playroom
                                </motion.button>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="mt-6 text-xs text-gray-500"
                                >
                                    Press ESC anytime to exit
                                </motion.p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header */}
                <div className="flex justify-between items-start p-4 md:p-6 pointer-events-auto">
                    <div className="flex items-center gap-3">
                        <Logo className="h-8 w-auto" style={{ filter: 'invert(1)' }} />
                        <div className="flex flex-col border-l border-white/20 pl-3">
                            <span className="text-xs font-bold text-white uppercase tracking-[0.25em]">Playroom</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
                                <span className="text-[9px] text-gray-400 font-mono">
                                    {isPlaying ? (micMode ? 'LIVE INPUT' : 'SIMULATION MODE') : 'SYSTEM IDLE'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Search & Favorites */}
                    <div className="flex items-center gap-2 pointer-events-auto">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className={`group p-2 rounded-full border transition-all duration-300 ${
                                showSearch 
                                ? 'bg-orange-500 border-orange-500 text-white' 
                                : 'border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-400 hover:text-white'
                            }`}
                            aria-label="Search albums"
                        >
                            <Search size={18} />
                        </button>
                        <button
                            onClick={() => {
                                const favs = [...favorites];
                                if (favs.length > 0) {
                                    showNotification(`${favs.length} favorites`, 'info');
                                }
                            }}
                            className={`group p-2 rounded-full border transition-all duration-300 relative ${
                                favorites.size > 0
                                ? 'bg-red-500 border-red-500 text-white' 
                                : 'border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-400 hover:text-white'
                            }`}
                            aria-label="Favorites"
                        >
                            <Heart size={18} fill={favorites.size > 0 ? 'currentColor' : 'none'} />
                            {favorites.size > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[8px] font-bold rounded-full flex items-center justify-center">
                                    {favorites.size}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={isShuffled ? resetAlbumOrder : shuffleAlbums}
                            className="group p-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all duration-300"
                            aria-label={isShuffled ? "Reset Order" : "Shuffle"}
                        >
                            <RefreshCw size={18} className={isShuffled ? "animate-spin" : ""} />
                        </button>
                        <button
                            onClick={() => setVisualizerMode(prev => {
                                const modes: ('particles' | 'waves' | 'spectrum')[] = ['particles', 'waves', 'spectrum'];
                                const currentIdx = modes.indexOf(prev);
                                return modes[(currentIdx + 1) % modes.length];
                            })}
                            className="group p-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all duration-300"
                            aria-label="Change visualizer"
                        >
                            <Zap size={18} />
                        </button>
                        <button
                            onClick={() => {
                                if (!document.fullscreenElement) {
                                    containerRef.current?.requestFullscreen();
                                    setIsFullscreen(true);
                                } else {
                                    document.exitFullscreen();
                                    setIsFullscreen(false);
                                }
                            }}
                            className="group p-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all duration-300"
                            aria-label="Toggle fullscreen"
                        >
                            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </button>
                    </div>

                    <button
                        onClick={onExit}
                        className="group p-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all duration-300"
                        aria-label="Exit Playroom"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                {/* Search Overlay */}
                <AnimatePresence>
                    {showSearch && !showWelcome && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md pointer-events-auto"
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search artists or albums..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full pl-12 pr-4 py-3 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                            {searchQuery && (
                                <div className="mt-2 text-center text-[10px] text-gray-500">
                                    {filteredAlbums.length} result{filteredAlbums.length !== 1 ? 's' : ''}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Stage */}
                <div className="flex-1 relative flex items-center justify-center perspective-[1200px]">

                    {/* 3D Album Selector */}
                    <AnimatePresence>
                        {!selectedAlbum && !micMode && !micError && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                                transition={{ duration: 0.8 }}
                                className="relative w-full h-full flex items-center justify-center"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Centered Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0 mix-blend-overlay"
                                >
                                    <h2 className="text-[12vw] font-black text-white/10 tracking-tighter uppercase select-none leading-none blur-sm">LVRN</h2>
                                </motion.div>

                                {/* Mic Button */}
                                <motion.button
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    onClick={playMic}
                                    className="absolute bottom-12 md:bottom-20 pointer-events-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105 flex items-center gap-3 backdrop-blur-md"
                                >
                                    <Mic size={16} /> Enable Live Input
                                </motion.button>

                                {/* Hint Text */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none"
                                >
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                                        {searchQuery ? 'Press S to close search' : 'Drag to rearrange • Click to play • F for favorite'}
                                    </p>
                                </motion.div>

                                {/* Keyboard Shortcuts Hint */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none flex gap-4 text-[9px] text-gray-600"
                                >
                                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-400">ESC</kbd> Exit</span>
                                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-400">S</kbd> Search</span>
                                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-400">F</kbd> Favorite</span>
                                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-400">Space</kbd> Mic</span>
                                </motion.div>

                                {/* Parallax Container */}
                                <motion.div
                                    className="relative w-0 h-0"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        rotateX: tiltY,
                                        rotateY: tiltX
                                    }}
                                >
                                    {(searchQuery ? filteredAlbums : albumOrder).map((originalIndex, displayIndex) => (
                                        <FloatingAlbum
                                            key={PLAYROOM_ALBUMS[originalIndex].id}
                                            album={PLAYROOM_ALBUMS[originalIndex]}
                                            index={displayIndex}
                                            total={searchQuery ? filteredAlbums.length : PLAYROOM_ALBUMS.length}
                                            radius={radius}
                                            onPlay={playTrack}
                                            onHover={handleColorChange}
                                            onLeave={resetColor}
                                            onReposition={handleReposition}
                                            isFavorite={favorites.has(PLAYROOM_ALBUMS[originalIndex].id)}
                                            onToggleFavorite={() => toggleFavorite(PLAYROOM_ALBUMS[originalIndex].id)}
                                            isPlaying={selectedAlbum?.id === PLAYROOM_ALBUMS[originalIndex].id}
                                            mousePosition={mouseRef.current}
                                        />
                                    ))}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Active Playback State */}
                    <AnimatePresence mode="wait">
                        {(selectedAlbum || micMode || micError) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-6 z-40 pointer-events-auto"
                            >
                                {selectedAlbum && (
                                    <div className="relative w-full max-w-md bg-black rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5">
                                        {/* Loading Overlay */}
                                        <AnimatePresence>
                                            {loadingIframe && (
                                                <motion.div
                                                    initial={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center text-center p-4"
                                                >
                                                    <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin mb-4" />
                                                    <span className="text-xs font-mono text-gray-500 uppercase">Syncing Visuals...</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <iframe
                                            style={{ borderRadius: '0' }}
                                            src={`${selectedAlbum.spotifyEmbedUrl}${selectedAlbum.spotifyEmbedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                                            width="100%"
                                            height="352"
                                            frameBorder="0"
                                            allowFullScreen
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                            onLoad={() => setLoadingIframe(false)}
                                            className="relative z-10"
                                        />

                                        <div className="p-4 bg-black/90 backdrop-blur-md border-t border-white/5 flex items-start gap-3">
                                            <Info size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider mb-1">
                                                    Audio Reactive Simulation
                                                </p>
                                                <p className="text-[10px] text-gray-500 leading-relaxed">
                                                    Browser security restrictions prevent direct audio analysis from Spotify.
                                                    The visualization engine is running in <span className="text-white">Simulation Mode</span>, generating patterns based on temporal algorithms.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {micMode && (
                                    <div className="text-center mb-12 bg-black/40 p-12 rounded-3xl border border-white/10 backdrop-blur-xl max-w-sm">
                                        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                                            <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping" />
                                            <div className="relative z-10 w-full h-full bg-black rounded-full border border-orange-500/50 flex items-center justify-center">
                                                <Mic className="w-8 h-8 text-orange-500" />
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-black text-white mb-3">Live Input Active</h2>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Play music in your environment. The particle engine is reacting to your microphone input in real-time.
                                        </p>
                                    </div>
                                )}

                                {micError && (
                                    <div className="text-center mb-12 bg-red-950/40 p-12 rounded-3xl border border-red-500/20 backdrop-blur-xl max-w-sm">
                                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                                        <h2 className="text-xl font-bold text-white mb-2">Access Issue</h2>
                                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                            {micErrorMessage}
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            <button
                                                onClick={playMic}
                                                className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-400 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg"
                                            >
                                                <RefreshCw size={14} /> Retry Access
                                            </button>

                                            <div className="flex items-center gap-2 justify-center text-[10px] text-gray-500 uppercase tracking-widest my-1">
                                                <div className="h-px w-8 bg-gray-700"></div> OR <div className="h-px w-8 bg-gray-700"></div>
                                            </div>

                                            <button
                                                onClick={switchToSimulation}
                                                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <Radio size={14} /> Enter Simulation
                                            </button>
                                        </div>

                                        {micErrorMessage.includes("Permission") && (
                                            <div className="mt-6 pt-6 border-t border-white/5 text-left">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Settings size={12} /> How to fix:
                                                </p>
                                                <ol className="text-xs text-gray-500 list-decimal pl-4 space-y-1">
                                                    <li>Click the lock icon 🔒 in your address bar.</li>
                                                    <li>Find "Microphone" and set to "Allow".</li>
                                                    <li>Refresh the page and try again.</li>
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <motion.button
                                    onClick={stopPlayback}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-8 px-8 py-3 rounded-full bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                >
                                    <ChevronLeft size={16} />
                                    {micError ? 'Return to Menu' : 'Select Another Record'}
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mini Player - Always Visible During Playback */}
                    {selectedAlbum && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 bg-black/80 backdrop-blur-xl rounded-full border border-white/10 pointer-events-auto"
                        >
                            <img 
                                src={selectedAlbum.coverUrl} 
                                alt={selectedAlbum.title}
                                className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white truncate max-w-[120px]">{selectedAlbum.artist}</span>
                                <span className="text-[10px] text-gray-400 truncate max-w-[120px]">{selectedAlbum.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleFavorite(selectedAlbum.id)}
                                    className={`p-2 rounded-full transition-colors ${
                                        favorites.has(selectedAlbum.id) 
                                        ? 'text-red-500' 
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <Heart size={14} fill={favorites.has(selectedAlbum.id) ? 'currentColor' : 'none'} />
                                </button>
                                <button
                                    onClick={stopPlayback}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                                <Volume2 size={14} className="text-orange-500" />
                                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-orange-500"
                                        animate={{ width: ['0%', '100%'] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};