import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { X, Play, Mic, ChevronLeft, Info, AlertCircle, RefreshCw, Loader2, Settings, Radio, Zap, ListMusic } from 'lucide-react';
import { Logo } from './Logo';
import { useExperience } from './ExperienceProvider';
import { PLAYROOM_ALBUMS, PlayroomAlbum } from '../constants';

interface PlayroomProps {
    onExit: () => void;
}

// --- Configuration ---
const PARTICLE_COUNT = 180;
const AUDIO_SMOOTHING = 0.85;
const FFT_SIZE = 2048;

// --- Types ---
interface RGB { r: number; g: number; b: number }

// --- Particle Engine Class ---
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
    type: 'ambient' | 'signal' | 'energy';

    constructor(w: number, h: number, type: 'ambient' | 'signal' | 'energy' = 'ambient', initialColor?: RGB) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.z = Math.random();
        this.type = type;

        // Default Gold/Warm Palette
        const defaultColor = { r: 255, g: 179, b: 71 };
        this.color = initialColor ? { ...initialColor } : defaultColor;
        this.targetColor = initialColor ? { ...initialColor } : defaultColor;

        if (type === 'ambient') {
            this.baseSize = Math.random() * 2 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.maxLife = 500 + Math.random() * 500;
        } else if (type === 'signal') {
            this.baseSize = Math.random() * 3 + 1;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.maxLife = 100 + Math.random() * 100;
        } else {
            // Energy particles (beat hits)
            this.x = w / 2;
            this.y = h / 2;
            this.baseSize = Math.random() * 4 + 2;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.maxLife = 40 + Math.random() * 20;
        }

        this.life = this.maxLife;
    }

    // Smooth color transition
    updateColor() {
        const lerp = 0.05;
        this.color.r += (this.targetColor.r - this.color.r) * lerp;
        this.color.g += (this.targetColor.g - this.color.g) * lerp;
        this.color.b += (this.targetColor.b - this.color.b) * lerp;
    }

    update(w: number, h: number, energy: { bass: number, mid: number, high: number }, mouse: { x: number, y: number }, isActive: boolean) {
        this.updateColor();

        const speedMult = isActive ? (1 + (energy.mid / 255) * 2) : 0.5;

        this.x += this.vx * speedMult;
        this.y += this.vy * speedMult;
        this.life--;

        // Mouse/Touch Interaction
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 250;

        if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            // Repel
            this.vx += (dx / dist) * force * 0.1;
            this.vy += (dy / dist) * force * 0.1;
        }

        // Wrap for ambient, kill others
        if (this.life <= 0 || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
            if (this.type === 'ambient') {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.life = this.maxLife;
                // Reset velocity dampening
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, energy: { bass: number }, isActive: boolean) {
        const opacity = (this.life / this.maxLife) * this.z * (isActive ? 0.9 : 0.4);
        // Pulse size with bass
        const beatScale = isActive ? (energy.bass / 255) * 3 : 0;
        const scale = Math.max(0.1, this.baseSize * (0.5 + this.z) + beatScale);

        ctx.beginPath();
        ctx.arc(this.x, this.y, scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.floor(this.color.r)}, ${Math.floor(this.color.g)}, ${Math.floor(this.color.b)}, ${opacity})`;
        ctx.fill();
    }
}

// --- Helper Functions ---
const hexToRgb = (hex: string): RGB => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
};

const getResponsiveRadius = (width: number) => {
    if (width < 768) return width * 0.35; // Mobile
    return 350; // Desktop
};

// --- Sub-Components ---

const DraggableAlbum: React.FC<{
    album: PlayroomAlbum;
    index: number;
    total: number;
    radius: number;
    onPlay: (a: PlayroomAlbum) => void;
    onHover: (color: string) => void;
    onLeave: () => void;
    onReposition: (fromIndex: number, toIndex: number) => void;
}> = ({ album, index, total, radius, onPlay, onHover, onLeave, onReposition }) => {
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep;

    // Calculate initial position based on circle
    const initialX = Math.cos(angle) * radius;
    const initialY = Math.sin(angle) * radius * 0.6; // Flattened circle (oval)
    const initialZ = Math.sin(angle) * 100;

    const [isDragging, setIsDragging] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const dragRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const hasMovedRef = useRef(false);

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsSelected(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        hasMovedRef.current = false;
        dragRef.current = { x: 0, y: 0 };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isSelected) return;
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            hasMovedRef.current = true;
        }
        dragRef.current = { x: dx, y: dy };
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsSelected(false);
        if (!hasMovedRef.current) {
            onPlay(album);
        } else {
            // Check for swap with nearby items
            const currentPos = {
                x: initialX + dragRef.current.x,
                y: initialY + dragRef.current.y
            };

            // Simple distance check to find closest item and swap
            for (let i = 0; i < total; i++) {
                if (i === index) continue;
                const otherAngle = i * angleStep;
                const otherX = Math.cos(otherAngle) * radius;
                const otherY = Math.sin(otherAngle) * radius * 0.6;

                const dist = Math.sqrt(
                    Math.pow(currentPos.x - otherX, 2) +
                    Math.pow(currentPos.y - otherY, 2)
                );

                if (dist < 150) {
                    onReposition(index, i);
                    break;
                }
            }
        }
        setTimeout(() => {
            dragRef.current = { x: 0, y: 0 };
        }, 100);
    };

    return (
        <motion.div
            className={`absolute group ${isSelected ? 'z-50' : ''}`}
            style={{
                width: '200px',
                height: '200px',
                marginLeft: '-100px',
                marginTop: '-100px',
                transformStyle: 'preserve-3d',
                cursor: isDragging ? 'grabbing' : isSelected ? 'grabbing' : 'grab',
                zIndex: Math.floor(initialZ + 200)
            }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0, z: 0 }}
            animate={{
                opacity: 1,
                scale: isSelected ? 1.2 : 1,
                x: initialX + dragRef.current.x,
                y: initialY + dragRef.current.y,
                z: isSelected ? 200 : initialZ
            }}
            transition={{
                delay: index * 0.1,
                duration: 0.8,
                type: 'spring',
                bounce: 0.4
            }}

            drag
            dragConstraints={{ left: -800, right: 800, top: -600, bottom: 600 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragStart={() => {
                setIsDragging(true);
                hasMovedRef.current = true;
            }}
            onDragEnd={(e, info) => {
                setIsDragging(false);
                // Check for drag to reposition
                if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
                    for (let i = 0; i < total; i++) {
                        if (i === index) continue;
                        const otherAngle = i * angleStep;
                        const otherX = Math.cos(otherAngle) * radius + info.offset.x;
                        const otherY = Math.sin(otherAngle) * radius * 0.6 + info.offset.y;

                        const dist = Math.sqrt(
                            Math.pow(initialX - otherX, 2) +
                            Math.pow(initialY - otherY, 2)
                        );

                        if (dist < 180) {
                            onReposition(index, i);
                            break;
                        }
                    }
                }
            }}

            whileHover={{ scale: 1.15, zIndex: 1000 }}

            onClick={(e) => {
                if (!isDragging) {
                    onPlay(album);
                }
            }}
            onMouseEnter={() => onHover(album.color)}
            onMouseLeave={onLeave}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onTouchStart={() => onHover(album.color)}
        >
            {/* Inner Float Animation */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotateZ: [0, index % 2 === 0 ? 2 : -2, 0]
                }}
                transition={{
                    duration: 4 + (index % 3),
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: Math.random()
                }}
                className="w-full h-full relative"
            >
                <div className="relative w-full h-full rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 group-hover:border-[var(--accent)] transition-all duration-300 bg-black">
                    <img
                        src={album.coverUrl}
                        alt={album.title}
                        className="w-full h-full object-cover pointer-events-none"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 backdrop-blur-[2px] pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 backdrop-blur-md border border-white/20">
                            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                        </div>
                        <p className="text-xs font-black text-white uppercase tracking-widest mb-1">{album.artist}</p>
                        <p className="text-[10px] text-gray-300 font-mono line-clamp-1">{album.title}</p>
                    </div>
                </div>

                {/* Reflection Effect */}
                <div className="absolute top-full left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-y-[-1] mask-image-gradient pointer-events-none rounded-xl" />
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
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

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

        return () => {
            window.removeEventListener('resize', handleResize);
            stopPlayback(); // Cleanup on unmount
        };
    }, []);

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
                const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
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
            // Clear with slight transparency for trails? No, strict clear for performance/clean look
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // --- 3. Update & Draw Particles ---
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

            // Update Target Color Global
            const target = currentColorRef.current;

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
    }, [isPlaying, micMode, micError]);

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
                const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                ctx = new AudioCtx();
                audioContextRef.current = ctx;
                analyserRef.current = ctx.createAnalyser();
                analyserRef.current.fftSize = FFT_SIZE;
                analyserRef.current.smoothingTimeConstant = AUDIO_SMOOTHING;
            } catch (e) {
                console.error("Failed to create AudioContext", e);
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
        } catch (err: any) {
            console.error("Mic Error", err);
            setMicError(true);

            // Specific Error Handling
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setMicErrorMessage("Permission Denied. Please allow microphone access in your browser address bar.");
                showNotification("Permission Denied", "error");
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
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
                <div className="flex justify-between items-start p-6 md:p-8 pointer-events-auto">
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
                    <button
                        onClick={onExit}
                        className="group p-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all duration-300"
                        aria-label="Exit Playroom"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                    <div className="flex items-center gap-2 pointer-events-auto">
                        <button
                            onClick={isShuffled ? resetAlbumOrder : shuffleAlbums}
                            className="group p-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all duration-300"
                            aria-label={isShuffled ? "Reset Order" : "Shuffle"}
                        >
                            <RefreshCw size={18} className={isShuffled ? "animate-spin-slow" : ""} />
                        </button>
                    </div>
                </div>

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
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0 ${!isMobile ? 'mix-blend-overlay' : ''}`}
                                >
                                    <h2 className={`text-[12vw] font-black text-white/10 tracking-tighter uppercase select-none leading-none ${!isMobile ? 'blur-sm' : ''}`}>LVRN</h2>
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
                                        Drag albums to rearrange • Click to play • Drop near another to swap
                                    </p>
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
                                    {albumOrder.map((originalIndex, displayIndex) => (
                                        <DraggableAlbum
                                            key={PLAYROOM_ALBUMS[originalIndex].id}
                                            album={PLAYROOM_ALBUMS[originalIndex]}
                                            index={displayIndex}
                                            total={PLAYROOM_ALBUMS.length}
                                            radius={radius}
                                            onPlay={playTrack}
                                            onHover={handleColorChange}
                                            onLeave={resetColor}
                                            onReposition={handleReposition}
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

                </div>
            </div>
        </motion.div>
    );
};