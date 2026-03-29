import { useState, useEffect, useCallback, TouchEvent } from 'react';

interface MobileDetect {
  isMobile: boolean;
  isTouch: boolean;
  isReducedMotion: boolean;
  isLowPower: boolean;
}

export function useMobileDetect(): MobileDetect {
  const [state, setState] = useState<MobileDetect>({
    isMobile: false,
    isTouch: false,
    isReducedMotion: false,
    isLowPower: false,
  });

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Check for low power mode (battery API)
      const isLowPowerMode = false; // Will be updated if battery API is available

      setState({
        isMobile: isMobileDevice || window.innerWidth < 768,
        isTouch: isTouchDevice,
        isReducedMotion: prefersReducedMotion,
        isLowPower: isLowPowerMode,
      });
    };

    checkMobile();

    // Listen for resize changes
    window.addEventListener('resize', checkMobile);

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setState(prev => ({ ...prev, isReducedMotion: e.matches }));
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return state;
}

// Hook for intersection observer - pause animations when not visible
export function useInViewPause(threshold = 0.1) {
  const [isInView, setIsInView] = useState(true);
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Hook for optimized touch events
export function useTouchOptimizations() {
  const [touchStartY, setTouchStartY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setIsScrolling(false);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
    if (deltaY > 10) {
      setIsScrolling(true);
    }
  }, [touchStartY]);

  const onTouchEnd = useCallback((e: TouchEvent, callback: () => void) => {
    if (!isScrolling) {
      callback();
    }
    setIsScrolling(false);
  }, [isScrolling]);

  return { onTouchStart, onTouchMove, onTouchEnd, isScrolling };
}
