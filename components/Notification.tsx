import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X, RotateCcw } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContainerProps {
  notifications: NotificationItem[];
  removeNotification: (id: string) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode='popLayout'>
        {notifications.map((note) => (
          <NotificationToast key={note.id} note={note} onDismiss={() => removeNotification(note.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NotificationToast: React.FC<{ note: NotificationItem; onDismiss: () => void }> = ({ note, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const variants = {
    initial: { opacity: 0, x: 50, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 50, scale: 0.9, transition: { duration: 0.2 } }
  };

  const getIcon = () => {
    switch (note.type) {
      case 'success': return <CheckCircle2 size={18} className="text-green-500" />;
      case 'error': return <AlertCircle size={18} className="text-red-500" />;
      default: return <Info size={18} className="text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (note.type) {
      case 'success': return 'border-green-500/50';
      case 'error': return 'border-red-500/50';
      default: return 'border-blue-500/50';
    }
  };

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`pointer-events-auto min-w-[320px] max-w-sm bg-black/90 backdrop-blur-xl border ${getBorderColor()} rounded-lg p-4 shadow-2xl flex items-start gap-3`}
      role="alert"
    >
      <div className="mt-0.5 shrink-0">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white leading-tight">{note.message}</p>
        {note.action && (
            <button 
                onClick={() => { note.action?.onClick(); onDismiss(); }}
                className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)] hover:text-white transition-colors flex items-center gap-1"
            >
                <RotateCcw size={10} /> {note.action.label}
            </button>
        )}
      </div>
      <button onClick={onDismiss} className="text-gray-500 hover:text-white transition-colors shrink-0" aria-label="Dismiss notification">
        <X size={14} />
      </button>
    </motion.div>
  );
};