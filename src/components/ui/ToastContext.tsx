import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast as RNToast } from './Toast';

type ToastOptions = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'warning';
  duration?: number;
  action?: { label: string; onPress: () => void };
};

type ToastWithId = ToastOptions & { id: string };

interface ToastContextValue {
  toasts: ToastWithId[];
  showToast: (toast: ToastOptions) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);

  const showToast = (toast: ToastOptions) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {toasts.map((t) => (
        <RNToast
          key={t.id}
          title={t.title}
          description={t.description}
          variant={t.variant}
          duration={t.duration}
          action={t.action}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};
