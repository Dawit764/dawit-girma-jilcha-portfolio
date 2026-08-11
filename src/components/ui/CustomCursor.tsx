import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div 
      className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[999999] transition-transform duration-100 ease-out items-center justify-center"
      style={{ 
        transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
        width: '32px',
        height: '32px'
      }}
    >
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-300 ${isHovered ? 'scale-150' : 'scale-100'}`}
        style={{
          border: '2px solid var(--primary)',
          backgroundColor: isHovered ? 'rgba(0,200,100,0.2)' : 'transparent',
          opacity: isHovered ? 1 : 0.3
        }}
      />
      <div 
        className={`rounded-full transition-all duration-300 ${isHovered ? 'scale-50' : 'scale-100'}`}
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: 'var(--primary)',
          boxShadow: '0 0 10px var(--primary)',
          opacity: isHovered ? 0.5 : 1
        }}
      />
    </div>
  );
}
