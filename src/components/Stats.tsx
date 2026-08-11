import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

function Counter({ target, suffix = "" }: { target: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2500;
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
    <span ref={ref} className="text-5xl md:text-7xl font-display text-foreground/90 mb-4 block">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-24 z-10 my-20">
      <div className="absolute inset-0 bg-primary/5 backdrop-blur-3xl border-y border-white/5" />
      <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center group"
        >
          <Counter target={2} suffix="+" />
          <span className="text-muted-foreground/70 font-light text-sm md:text-base tracking-wide uppercase">Years Coding</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center group"
        >
          <Counter target={10} suffix="+" />
          <span className="text-muted-foreground/70 font-light text-sm md:text-base tracking-wide uppercase">Projects Built</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center group"
        >
          <Counter target={3} />
          <span className="text-muted-foreground/70 font-light text-sm md:text-base tracking-wide uppercase">Languages</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center group"
        >
          <Counter target={2030} />
          <span className="text-muted-foreground/70 font-light text-sm md:text-base tracking-wide uppercase">Graduation</span>
        </motion.div>
        
      </div>
    </section>
  );
}
