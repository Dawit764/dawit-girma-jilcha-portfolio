import { motion } from 'motion/react';
import { ChevronRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Magnetic from './ui/Magnetic';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 lg:pt-36 pb-12 max-w-[1200px] mx-auto px-6 z-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center w-full">
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col order-2 lg:order-1 items-center lg:items-start text-center lg:text-left z-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs text-primary/80 mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]" />
            <span className="tracking-wide uppercase">Available for Internships</span>
          </div>
          
          <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-normal leading-[1.1] tracking-tight mb-4 text-foreground font-display">
            Dawit Girma
          </h1>
          
          <div className="font-sans text-[clamp(1.1rem,3vw,1.5rem)] font-light text-muted-foreground mb-6 italic">
            Computer Science &bull; Creative Developer
          </div>
          
          <p className="text-[1.1rem] sm:text-[1.2rem] text-muted-foreground/80 mb-10 max-w-[540px] leading-relaxed font-light">
            I craft immersive, organic digital experiences that blend aesthetic beauty with technical precision. Exploring the intersection of design, nature, and technology.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            <Magnetic>
              <Button 
                size="lg" 
                render={<a href="#featured-projects" />}
                className="h-14 px-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary transition-all duration-300 backdrop-blur-md border border-primary/20"
              >
                Explore Work
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button 
                size="lg" 
                variant="outline" 
                render={<a href="#contact" />}
                className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
              >
                <Mail className="w-5 h-5 mr-3" />
                Contact Me
              </Button>
            </Magnetic>
          </div>
        </motion.div>
        
        {/* Visuals - Organic Photo */}
        <motion.div 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center relative w-full h-[350px] sm:h-[450px] lg:h-[550px] order-1 lg:order-2"
        >
          <div className="relative w-full h-full max-w-[450px] rounded-[3rem] z-10 bg-card/30 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-lg group">
            <img 
              src="/dawit_girma_portrait.jpg" 
              alt="Dawit Girma Jilcha portrait" 
              className="w-full h-full object-cover object-[center_20%] opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer" 
            />
            {/* Inner soft glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none" />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
