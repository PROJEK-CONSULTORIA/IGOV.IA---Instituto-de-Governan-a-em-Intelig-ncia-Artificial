import { useEffect, useState } from "react";
import { useReducedMotion } from "./Reveal";

export function Counter({
  value,
  suffix = "",
  duration = 1400,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration, delay, reduced]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
