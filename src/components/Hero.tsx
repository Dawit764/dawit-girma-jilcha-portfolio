import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';


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
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center w-full">
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col order-2 lg:order-1 items-center lg:items-start text-center lg:text-left z-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 px-3.5 py-1.5 rounded-full font-mono text-xs text-primary w-fit mb-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]" />
            Available for Summer Internships
          </div>
          
          <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight mb-3 text-foreground font-display">
            Dawit Girma Jilcha
          </h1>
          
          <div className="font-display text-[clamp(1.1rem,4vw,1.8rem)] font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff] mb-5">
            Computer Science Student &bull; AI Enthusiast
          </div>
          
          <div className="flex items-center justify-center lg:justify-start h-9 mb-7">
            <span className="font-mono text-muted-foreground mr-2 text-sm sm:text-base">Status:</span>
            <span className="font-mono text-primary font-medium border-r-2 border-primary pr-1 animate-[blink_0.75s_step-end_infinite] text-sm sm:text-base">
              {displayText}
            </span>
          </div>
          
          <p className="text-[1rem] sm:text-[1.1rem] text-muted-foreground mb-9 max-w-[540px] leading-relaxed font-light">
            I'm a Computer Science student at Addis Ababa University with a passion for Artificial Intelligence and Web Development. I enjoy building technology that addresses challenges in healthcare, education, and finance while continuously improving my skills through real projects.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Button 
              size="lg" 
              render={<a href="#featured-projects" />}
              className="h-12 px-7 rounded-xl bg-gradient-to-br from-primary to-[#00d2ff] text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
            >
              View My Work
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              render={<a href="#contact" />}
              className="h-12 px-7 rounded-xl bg-white/5 border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 active:scale-[0.98] transition-all duration-300 backdrop-blur-md"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </div>
        </motion.div>
        
        {/* Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center relative w-full h-[350px] sm:h-[450px] lg:h-[500px] order-1 lg:order-2"
        >

          <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full z-10 bg-card border border-white/5 shadow-2xl flex items-center justify-center group overflow-hidden">
            {/* Glow border on hover */}
            <div className="absolute inset-[-1px] rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-md transition-all duration-500 group-hover:opacity-60 group-hover:blur-xl" />
            
            <div className="absolute inset-1 rounded-full bg-card z-[2] overflow-hidden">
              <img 
                src="/dawit_girma_portrait.jpg" 
                alt="Dawit Girma Jilcha portrait" 
                className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                referrerPolicy="no-referrer" 
              />
            </div>
            
            {/* Soft inner shadow for depth */}
            <div className="absolute inset-1 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-[3] pointer-events-none" />
          </div>
          
          {/* Floating decorations */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] top-[5%] lg:top-[10%] left-[10%] lg:left-[5%] border border-primary/20 bg-primary/5 backdrop-blur-md rounded-xl z-[4]"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] bottom-[5%] lg:bottom-[12%] right-[10%] lg:right-[8%] border border-secondary/20 rounded-full bg-secondary/5 backdrop-blur-md z-[4]"
          />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -bottom-[20px] lg:top-[120%] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-[10%] font-mono text-accent text-[0.65rem] sm:text-xs opacity-60 tracking-widest z-[4] whitespace-nowrap bg-background/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5"
          >
            &lt;AI_ENGINEER_IN_TRAINING&gt;
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            className="absolute top-[0%] lg:top-[5%] right-[10%] lg:right-[5%] font-mono text-primary text-[0.65rem] sm:text-xs opacity-50 z-[4] bg-background/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5"
          >
            AAU_EST_1950
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
