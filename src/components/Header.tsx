import { useState, useEffect, useContext } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import Magnetic from './ui/Magnetic';
import { LenisContext } from './layout/SmoothScroll';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const lenis = useContext(LenisContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { offset: -100 });
    } else {
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

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
        className="fixed top-0 left-0 right-0 h-[2px] z-[100]"
        style={{ 
          scaleX: scrollYProgress,
          transformOrigin: "0%",
          background: "linear-gradient(90deg, var(--primary), transparent)",
        }}
      />

      <header className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none px-4">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className={`pointer-events-auto flex items-center justify-between transition-all duration-700 ease-out px-6 py-3 rounded-full ${
            isScrolled 
              ? 'bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-[900px]' 
              : 'bg-transparent border-transparent w-full max-w-[1200px]'
          }`}
        >
          <Magnetic>
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-3 no-underline group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg text-primary bg-white/5 border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:scale-105">
                D
              </div>
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-2 items-center bg-white/5 border border-white/5 rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                <a 
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-muted-foreground/80 hover:text-foreground text-sm font-medium transition-colors px-4 py-2 rounded-full hover:bg-white/5"
                >
                  {link.name}
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`h-[1px] w-full bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`h-[1px] w-full bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[1px] w-full bg-current transition-all duration-300 ease-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </motion.div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/90 backdrop-blur-3xl flex flex-col items-center justify-center gap-6 px-6"
          >
            {navLinks.map((link, i) => (
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={link.name} 
                href={link.href}
                className="text-foreground/90 text-3xl font-display font-light"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
