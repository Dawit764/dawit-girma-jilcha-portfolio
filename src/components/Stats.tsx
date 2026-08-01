import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

function Counter({ target, suffix = "" }: { target: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-16 bg-[var(--color-surface)]/50 border-y border-[var(--color-primary)]/10 z-10">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        
        <div className="flex flex-col items-center">
          <Counter target={2} suffix="+" />
          <span className="text-[var(--color-text-muted)] font-medium">Years of Coding</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Counter target={10} suffix="+" />
          <span className="text-[var(--color-text-muted)] font-medium">Projects Built</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Counter target={3} />
          <span className="text-[var(--color-text-muted)] font-medium">Languages Spoken</span>
        </div>
        
        <div className="flex flex-col items-center">
          <Counter target={2030} />
          <span className="text-[var(--color-text-muted)] font-medium">AAU Graduation</span>
        </div>
        
      </div>
    </section>
  );
}
