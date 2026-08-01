import { ChevronUp } from 'lucide-react';

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
    <footer className="relative bg-[var(--color-surface)]/80 border-t border-[var(--color-primary)]/10 z-10 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#home" className="flex items-center gap-3 no-underline">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm text-[var(--color-background)] shadow-[0_0_15px_rgba(0,245,255,0.3)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
                D
              </div>
              <div className="font-display text-white text-base font-bold tracking-tight">Dawit Girma</div>
            </a>
            <p className="text-[var(--color-text-muted)] text-sm">
              © {new Date().getFullYear()} Dawit Girma Jilcha. All rights reserved.
            </p>
          </div>
          
          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[var(--color-text-muted)] text-sm font-medium transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          {/* Back to top */}
          <a 
            href="#home" 
            aria-label="Back to top"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-background)] transition-all duration-300 hover:-translate-y-1"
          >
            <ChevronUp className="w-5 h-5" />
          </a>
          
        </div>
        
      </div>
    </footer>
  );
}
