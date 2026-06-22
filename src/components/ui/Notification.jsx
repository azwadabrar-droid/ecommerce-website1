import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Notification = () => {
  const { notification } = useApp();
  if (!notification) return null;

  const icons = {
    success: <CheckCircle size={18} className="text-green-500" />,
    error: <AlertCircle size={18} className="text-red-500" />,
    info: <Info size={18} className="text-blue-500" />,
  };

  return (
    <div className={`fixed top-20 right-4 z-[100] flex items-center gap-3 bg-white shadow-xl border rounded-lg px-4 py-3 max-w-xs animate-slide-in
      ${notification.type === 'success' ? 'border-green-200' :
        notification.type === 'error' ? 'border-red-200' : 'border-blue-200'}`}>
      {icons[notification.type || 'success']}
      <p className="text-sm text-dark">{notification.message}</p>
    </div>
  );
};

export const SectionHeader = ({ tag, title, className = '' }) => (
  <div className={`mb-8 ${className}`}>
    {tag && (
      <div className="flex items-center gap-3 mb-4">
        <div className="w-4 h-9 bg-primary rounded-sm" />
        <span className="text-primary font-semibold text-sm">{tag}</span>
      </div>
    )}
    {title && <h2 className="text-3xl font-semibold text-dark">{title}</h2>}
  </div>
);

export const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(endTime || 3600 * 3 + 23 * 60 + 19);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex items-end gap-2">
      <span className="text-sm font-medium text-dark mb-1">Days</span>
      <TimeBox value="03" />
      <span className="text-primary font-bold text-2xl mb-1">:</span>
      <TimeBox value={pad(hours)} label="Hours" />
      <span className="text-primary font-bold text-2xl mb-1">:</span>
      <TimeBox value={pad(minutes)} label="Minutes" />
      <span className="text-primary font-bold text-2xl mb-1">:</span>
      <TimeBox value={pad(seconds)} label="Seconds" />
    </div>
  );
};

const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center">
    {label && <span className="text-xs text-dark font-medium mb-1">{label}</span>}
    <div className="flex gap-1">
      {value.split('').map((digit, i) => (
        <div key={i} className="bg-dark text-white font-bold text-xl w-9 h-10 flex items-center justify-center rounded">
          {digit}
        </div>
      ))}
    </div>
  </div>
);

// Hook imports needed
import { useState, useEffect } from 'react';
