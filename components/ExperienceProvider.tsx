import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { NotificationType, NotificationItem } from './Notification';

interface ExperienceContextType {
  // AI Context
  aiContext: { type: string; data: Record<string, unknown> } | null;
  setAiContext: (context: { type: string; data: Record<string, unknown> } | null) => void;
  
  // Navigation System
  targetSection: string | null;
  navigateTo: (sectionId: string) => void;
  clearNavigation: () => void;

  // Analytics
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => void;
  
  // Audio
  isAudioEnabled: boolean;
  toggleAudio: () => void;
  
  // Entry
  hasEntered: boolean;
  enterExperience: () => void;

  // Notifications
  notifications: NotificationItem[];
  showNotification: (message: string, type?: NotificationType, action?: { label: string, onClick: () => void }) => void;
  removeNotification: (id: string) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [aiContext, setAiContext] = useState<{ type: string; data: Record<string, unknown> } | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Mock Analytics Tracker
  const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    // In a real app, send to GA4/Mixpanel
    // console.log(`[ANALYTICS] ${eventName}`, properties);
  };

  const enterExperience = () => {
    setHasEntered(true);
    trackEvent('session_start');
    setIsAudioEnabled(true); 
  };

  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
    trackEvent('audio_toggle', { enabled: !isAudioEnabled });
  };

  const navigateTo = (sectionId: string) => {
    setTargetSection(sectionId);
    trackEvent('navigation_jump', { target: sectionId });
  };

  const clearNavigation = () => {
    setTargetSection(null);
  };

  const showNotification = useCallback((message: string, type: NotificationType = 'info', action?: { label: string, onClick: () => void }) => {
    const id = crypto.randomUUID();
    setNotifications(prev => [...prev, { id, message, type, action }]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <ExperienceContext.Provider value={{
      aiContext,
      setAiContext,
      targetSection,
      navigateTo,
      clearNavigation,
      trackEvent,
      isAudioEnabled,
      toggleAudio,
      hasEntered,
      enterExperience,
      notifications,
      showNotification,
      removeNotification
    }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
};