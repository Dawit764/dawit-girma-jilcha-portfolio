import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Mission', href: '#mission' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#featured-projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Journey', href: '#journey' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-[100]"
        style={{ 
          scaleX: scrollYProgress,
          transformOrigin: "0%",
          background: "linear-gradient(90deg, var(--primary), var(--secondary))",
          boxShadow: "0 0 10px var(--primary)"
        }}
      />

      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-background/60 backdrop-blur-xl py-3 border-b border-white/5 shadow-sm' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3 no-underline group active:scale-[0.98] transition-transform">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-lg text-primary-foreground shadow-lg bg-gradient-to-br from-primary to-[#00d2ff] transition-all duration-300 group-hover:shadow-primary/30 group-hover:-translate-y-0.5">
              D
            </div>
            <div className="font-display text-foreground text-lg font-bold tracking-tight">Dawit Girma</div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-muted-foreground text-sm font-medium transition-colors hover:text-foreground relative group active:scale-[0.98]"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden z-50 active:scale-[0.95] text-foreground hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`h-[2px] w-full bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`h-[2px] w-full bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] w-full bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </div>
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-background/80 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-foreground text-lg font-medium p-3 rounded-xl hover:bg-white/5 active:scale-[0.98] transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </header>
    </>
  );
}
