import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';

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
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-[1000]"
        style={{ 
          scaleX: scrollYProgress,
          transformOrigin: "0%",
          background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
          boxShadow: "0 0 10px var(--color-primary)"
        }}
      />

      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'bg-[var(--color-background)]/80 backdrop-blur-md py-3 border-b border-white/5' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3 no-underline">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-lg text-[var(--color-background)] shadow-[0_0_15px_rgba(0,245,255,0.3)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
              D
            </div>
            <div className="font-display text-white text-lg font-bold tracking-tight">Dawit Girma</div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[var(--color-text-muted)] text-sm font-medium transition-colors hover:text-white relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 z-[110]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-[var(--color-surface)] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-white text-lg font-medium p-2 rounded-lg hover:bg-white/5"
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
