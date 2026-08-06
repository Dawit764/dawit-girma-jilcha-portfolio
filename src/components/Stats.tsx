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
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2 drop-shadow-sm">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-16 bg-card/30 backdrop-blur-md border-y border-white/5 z-10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50" />
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center group"
        >
          <Counter target={2} suffix="+" />
          <span className="text-muted-foreground font-medium text-sm md:text-base group-hover:text-primary transition-colors">Years of Coding</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center group"
        >
          <Counter target={10} suffix="+" />
          <span className="text-muted-foreground font-medium text-sm md:text-base group-hover:text-primary transition-colors">Projects Built</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center group"
        >
          <Counter target={3} />
          <span className="text-muted-foreground font-medium text-sm md:text-base group-hover:text-primary transition-colors">Languages Spoken</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center group"
        >
          <Counter target={2030} />
          <span className="text-muted-foreground font-medium text-sm md:text-base group-hover:text-primary transition-colors">AAU Graduation</span>
        </motion.div>
        
      </div>
    </section>
  );
}
