import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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
    <footer className="relative bg-background/50 border-t border-white/5 z-10 pt-16 pb-8 backdrop-blur-3xl">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#home" className="flex items-center gap-3 no-underline group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm text-primary-foreground shadow-lg bg-gradient-to-br from-primary to-[#00d2ff] transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/20">
                D
              </div>
              <div className="font-display text-foreground text-base font-bold tracking-tight">Dawit Girma</div>
            </a>
            <p className="text-muted-foreground text-sm font-medium">
              © {new Date().getFullYear()} Dawit Girma Jilcha. All rights reserved.
            </p>
          </div>
          
          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            {navLinks.map((link) => (
              <Button 
                key={link.name} 
                variant="ghost" 
                size="sm" 
                render={<a href={link.href} />}
                className="text-muted-foreground hover:text-foreground active:scale-[0.98] transition-all duration-300"
              >
                {link.name}
              </Button>
            ))}
          </nav>
          
          {/* Back to top */}
          <Button 
            variant="outline" 
            size="icon" 
            render={<a href="#home" aria-label="Back to top" />}
            className="rounded-xl bg-white/5 border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 hover:-translate-y-1 group active:scale-[0.95]"
          >
            <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          </Button>
          
        </div>

        <Separator className="bg-white/5 mb-8" />
        
        <div className="text-center text-xs text-muted-foreground/60 font-mono">
          DESIGNED WITH <span className="text-primary animate-pulse">❤</span> IN ADDIS ABABA
        </div>
      </div>
    </footer>
  );
}
