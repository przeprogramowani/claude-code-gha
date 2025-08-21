import { useState, useEffect } from 'react';
import { Clock as ClockIcon } from "lucide-react";

interface ClockProps {
  className?: string;
}

function Clock({ className }: ClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const polishMonths = [
    'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
    'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
  ] as const;

  const polishDays = [
    'niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'
  ] as const;

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('pl-PL', { hour12: false });
  };

  const formatDate = (date: Date): string => {
    const day = polishDays[date.getDay()];
    const dayNum = date.getDate();
    const month = polishMonths[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}, ${dayNum} ${month} ${year}`;
  };

  return (
    <div className={`flex flex-col items-center gap-1 text-gray-900 font-mono ${className || ''}`}>
      <div className="flex items-center gap-2">
        <ClockIcon size={18} />
        <span className="text-lg font-bold" aria-label="Aktualny czas">
          {formatTime(currentTime)}
        </span>
      </div>
      <div className="text-xs text-gray-600 font-normal" aria-label="Aktualna data">
        {formatDate(currentTime)}
      </div>
    </div>
  );
}

export default Clock;
