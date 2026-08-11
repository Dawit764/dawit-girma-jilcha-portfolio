import { ChevronUp } from 'lucide-react';
import Magnetic from './ui/Magnetic';

export default function Footer() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Mission', href: '#mission' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#featured-projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative z-10 pt-32 pb-12 overflow-hidden">
      
      {/* Soft gradient floor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-10 flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Magnetic>
              <a href="#home" className="flex items-center gap-4 no-underline group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg text-primary bg-white/5 border border-white/10 transition-all duration-700 group-hover:bg-white/10 group-hover:scale-105">
                  D
                </div>
                <div className="font-display text-foreground/90 text-lg">Dawit Girma</div>
              </a>
            </Magnetic>
            <p className="text-muted-foreground/60 text-xs font-mono uppercase tracking-widest mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                <a 
                  href={link.href}
                  className="text-muted-foreground/70 hover:text-foreground text-sm font-light transition-colors duration-300"
                >
                  {link.name}
                </a>
              </Magnetic>
            ))}
          </nav>
          
          {/* Back to top */}
          <Magnetic>
            <a 
              href="#home" 
              aria-label="Back to top"
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground/80 hover:text-primary hover:bg-white/10 transition-all duration-500 group"
            >
              <ChevronUp className="w-5 h-5 transition-transform duration-500 group-hover:-translate-y-1" />
            </a>
          </Magnetic>
          
        </div>
        
        <div className="text-center text-[0.65rem] text-muted-foreground/40 font-mono tracking-widest mt-12 uppercase">
          Crafted organically in Addis Ababa
        </div>
      </div>
    </footer>
  );
}
