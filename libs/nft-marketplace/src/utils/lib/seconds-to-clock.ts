export function secondsToClock(total: number) {
  const safe = Math.max(0, Math.floor(total));
  return {
    hours:   Math.floor(safe / 3600),
    minutes: Math.floor((safe % 3600) / 60),
    seconds: safe % 60,
  };
}