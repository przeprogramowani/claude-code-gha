import { useState, useEffect } from "react";
import { Clock as ClockIcon } from "lucide-react";

interface TimeData {
  time: string;
  date: string;
}

const POLISH_MONTHS = [
  "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
  "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
] as const;

const POLISH_DAYS = [
  "niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"
] as const;

const useClock = (): TimeData => {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date): string => {
    return [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0")
    ].join(":");
  };

  const formatDate = (date: Date): string => {
    const dayName = POLISH_DAYS[date.getDay()];
    const day = date.getDate();
    const monthName = POLISH_MONTHS[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  return {
    time: formatTime(currentTime),
    date: formatDate(currentTime)
  };
};

function Clock() {
  const { time, date } = useClock();

  return (
    <div className="text-black text-lg font-bold min-w-[70px] text-center font-mono flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        <ClockIcon size={18} />
        <span>{time}</span>
      </div>
      <div className="text-xs text-gray-600 font-normal">
        {date}
      </div>
    </div>
  );
}

export default Clock;
