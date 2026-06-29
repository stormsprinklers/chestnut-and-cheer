"use client";

import { useEffect, useState } from "react";

function getNextChristmas(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const christmas = new Date(year, 11, 25, 0, 0, 0);
  if (now > christmas) {
    return new Date(year + 1, 11, 25, 0, 0, 0);
  }
  return christmas;
}

function getTimeRemaining(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

export function CountdownTimer() {
  const [target] = useState(getNextChristmas);
  const [time, setTime] = useState(() => getTimeRemaining(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {UNITS.map((unit) => (
        <div
          key={unit}
          className="rounded-2xl border border-accent-gold/30 bg-white px-4 py-6 text-center shadow-sm"
        >
          <div className="font-display text-4xl font-bold text-primary-red tabular-nums sm:text-5xl">
            {String(time[unit]).padStart(2, "0")}
          </div>
          <div className="mt-1 text-sm font-medium capitalize text-chestnut/70">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
}
