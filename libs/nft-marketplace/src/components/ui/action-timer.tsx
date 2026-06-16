'use client';

import * as React from "react";
import  { padZero, secondsToClock } from '@portfolio/nft-marketplace-utils';

export function ActionTimer({ total = 0 }: { total?: number }) {
	const [remaining, setRemaining] = React.useState(total);

	React.useEffect(() => {
    const end = Date.now() + total * 1000;
    const id = setInterval(() => {
      const left = Math.max(0, Math.round((end - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [total]);

  const time = secondsToClock(remaining);

  return (
    <div className="inline-flex flex-col gap-2.5 p-[1.875rem] rounded bg-bg-secondary/50 text-text">
      <span className="text-caption">Auction ends in:</span>

      <div className="flex items-start gap-2.5 text-h3 font-display">
        <TimeUnit value={time.hours} label="Hours" />
        <span>:</span>
        <TimeUnit value={time.minutes} label="Minutes" />
        <span>:</span>
        <TimeUnit value={time.seconds} label="Seconds" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-bold">{padZero(value)}</span>
      <span className="text-caption font-sans mt-[5px]">{label}</span>
    </div>
  );
}