import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoItem } from '../constants';
import { VideoCard } from './VideoCard';

interface VideoRowProps {
    title: string;
    videos: VideoItem[];
    onSelect: (video: VideoItem) => void;
    isMuted: boolean;
    onToggleMute: () => void;
    myList: string[];
    onToggleList: (video: VideoItem) => void;
}

export const VideoRow: React.FC<VideoRowProps> = ({
    title,
    videos,
    onSelect,
    isMuted,
    onToggleMute,
    myList,
    onToggleList
}) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' 
                ? scrollLeft - clientWidth * 0.8 
                : scrollLeft + clientWidth * 0.8;
            
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (rowRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    if (videos.length === 0) return null;

    return (
        <div className="space-y-2 py-4 group/row overflow-visible">
            <h2 className="text-xl md:text-2xl font-bold text-white px-6 md:px-12 transition-colors duration-300 hover:text-[var(--accent)] cursor-pointer inline-block">
                {title}
            </h2>
            
            <div className="relative group overflow-visible px-6 md:px-12">
                {/* Left Arrow */}
                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-0 bottom-0 z-40 w-12 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                    >
                        <ChevronLeft size={40} className="text-white" />
                    </button>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-0 bottom-0 z-40 w-12 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                    >
                        <ChevronRight size={40} className="text-white" />
                    </button>
                )}

                {/* Row Content */}
                <div
                    ref={rowRef}
                    onScroll={handleScroll}
                    className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth overflow-y-visible"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {videos.map((video) => (
                        <div key={video.id} style={{ scrollSnapAlign: 'start' }}>
                            <VideoCard
                                video={video}
                                onSelect={onSelect}
                                isMuted={isMuted}
                                onToggleMute={onToggleMute}
                                inList={myList.includes(video.id)}
                                onToggleList={onToggleList}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
