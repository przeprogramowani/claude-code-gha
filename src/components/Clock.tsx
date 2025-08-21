import { useState, useEffect } from "react";
import { Clock as ClockIcon } from "lucide-react";

interface ClockProps {
  className?: string;
}

const POLISH_MONTHS: readonly string[] = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
] as const;

const POLISH_DAYS: readonly string[] = [
  "niedziela",
  "poniedziałek", 
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
] as const;

function formatTime(date: Date): string {
  return date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0") +
    ":" +
    date.getSeconds().toString().padStart(2, "0");
}

function formatDate(date: Date): string {
  return POLISH_DAYS[date.getDay()] + 
    ", " + 
    date.getDate() + 
    " " + 
    POLISH_MONTHS[date.getMonth()] + 
    " " + 
    date.getFullYear();
}

function Clock({ className }: ClockProps) {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateClock = (): void => {
      const now = new Date();
      setTime(formatTime(now));
      setDate(formatDate(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`text-black text-lg font-bold min-w-[70px] text-center font-mono flex flex-col items-center gap-1 ${className || ""}`}>
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
