import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import AmbientParticles from './canvas/AmbientParticles';

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
      {/* 3D Ambient WebGL Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <AmbientParticles />
          </Suspense>
        </Canvas>
      </div>

      {/* Grid Overlay */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Mouse Glow - Apple Intelligence Vibe */}
      <div 
        className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, color-mix(in oklab, var(--primary) 15%, transparent), transparent 80%)`
        }}
      />

      {/* Blurred Ambient Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full blur-[140px] opacity-[0.15] w-[40vw] h-[40vw] bg-secondary -top-[10vw] -left-[10vw] animate-pulse" style={{ animationDuration: '20s' }} />
        <div className="absolute rounded-full blur-[140px] opacity-[0.15] w-[35vw] h-[35vw] bg-primary -bottom-[10vw] -right-[5vw] animate-pulse" style={{ animationDuration: '25s' }} />
      </div>
    </>
  );
}
