import { useEffect, useState } from 'react';

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Grid Overlay */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Mouse Glow */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.12), rgba(0, 245, 255, 0.05) 30%, transparent 80%)`
        }}
      />

      {/* Blurred Circles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full blur-[140px] opacity-25 w-[40vw] h-[40vw] bg-[var(--color-secondary)] -top-[10vw] -left-[10vw] animate-pulse" style={{ animationDuration: '20s' }} />
        <div className="absolute rounded-full blur-[140px] opacity-25 w-[35vw] h-[35vw] bg-[var(--color-primary)] -bottom-[10vw] -right-[5vw] animate-pulse" style={{ animationDuration: '25s' }} />
      </div>
    </>
  );
}
