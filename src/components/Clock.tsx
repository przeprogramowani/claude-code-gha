import { useState, useEffect, useRef } from 'react';

interface ClockProps {}

function Clock({}: ClockProps) {
  const [time, setTime] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (date: Date): string => {
    return [
      date.getHours().toString().padStart(2, '0'),
      date.getMinutes().toString().padStart(2, '0'),
      date.getSeconds().toString().padStart(2, '0')
    ].join(':');
  };

  useEffect(() => {
    const updateTime = () => {
      setTime(formatTime(new Date()));
    };

    updateTime();

    intervalRef.current = setInterval(updateTime, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="text-black text-lg font-bold min-w-[70px] text-center font-mono"
      aria-label="Current time"
    >
      {time}
    </div>
  );
}

export default Clock;
