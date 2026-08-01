import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Mail } from 'lucide-react';

export default function Hero() {
  const words = [
    "Building AI Solutions",
    "Developing Modern Websites",
    "Learning Every Day",
    "Solving Real World Problems"
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }

      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setDisplayText(
        isDeleting
          ? currentWord.substring(0, displayText.length - 1)
          : currentWord.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-[140px] pb-[60px] max-w-[1200px] mx-auto px-6 z-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center w-full">
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/15 px-3.5 py-1.5 rounded-full font-mono text-xs text-[var(--color-primary)] w-fit mb-6">
            <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-pulse" />
            Available for Summer Internships
          </div>
          
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight mb-2 text-white font-display">
            Dawit Girma Jilcha
          </h1>
          
          <div className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] font-medium text-[var(--color-accent)] mb-4">
            Computer Science Student • AI Enthusiast
          </div>
          
          <div className="flex items-center h-9 mb-6">
            <span className="font-mono text-[var(--color-text-muted)] mr-2">Status:</span>
            <span className="font-mono text-[var(--color-primary)] font-medium border-r-2 border-[var(--color-primary)] pr-1 animate-[blink_0.75s_step-end_infinite]">
              {displayText}
            </span>
          </div>
          
          <p className="text-[1.05rem] text-[var(--color-text-muted)] mb-10 max-w-[540px] leading-relaxed">
            I'm a Computer Science student at Addis Ababa University with a passion for Artificial Intelligence and Web Development. I enjoy building technology that addresses challenges in healthcare, education, and finance while continuously improving my skills through real projects.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#featured-projects" 
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-medium transition-all duration-300 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] shadow-[0_4px_20px_rgba(0,245,255,0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,245,255,0.4)]"
            >
              <ChevronRight className="w-5 h-5" />
              View My Work
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-medium transition-all duration-300 bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </a>
          </div>
        </motion.div>
        
        {/* Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center items-center relative"
        >
          <div className="relative w-[380px] h-[380px] rounded-full z-10 bg-[var(--color-surface)] border border-[var(--color-primary)]/10 shadow-[0_15px_60px_rgba(0,245,255,0.12),0_0_80px_rgba(124,58,237,0.08)] flex items-center justify-center group overflow-hidden">
            {/* Glow border on hover */}
            <div className="absolute inset-[-1px] rounded-full bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] opacity-30 blur-[1px] transition-all duration-300 group-hover:opacity-50 group-hover:blur-[2px]" />
            
            <div className="absolute inset-1 rounded-full bg-[var(--color-surface)] z-[2] overflow-hidden">
              <img 
                src="/dawit_girma_portrait.jpg" 
                alt="Dawit Girma Jilcha portrait" 
                className="w-full h-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer" 
              />
            </div>
          </div>
          
          {/* Floating decorations */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute w-[60px] h-[60px] top-[10%] left-[5%] border border-[var(--color-primary)]/20 rounded-xl z-[4]"
          />
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute w-[40px] h-[40px] bottom-[12%] right-[8%] border border-[var(--color-secondary)]/20 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.05),transparent)] z-[4]"
          />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute top-[120%] -left-[10%] font-mono text-[var(--color-accent)] text-xs opacity-40 tracking-widest z-[4]"
          >
            &lt;AI_ENGINEER_IN_TRAINING&gt;
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            className="absolute top-[5%] right-[5%] font-mono text-[var(--color-primary)] text-xs opacity-30 z-[4]"
          >
            AAU_EST_1950
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
