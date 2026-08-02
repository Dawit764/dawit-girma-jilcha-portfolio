import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { sanityClient, urlFor } from '../sanity';

interface Certification {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  color?: string;
  logo?: any;
}

export default function Certifications() {
  const [certData, setCertData] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "certification"] | order(_createdAt asc)`)
      .then((data) => {
        setCertData(data);
        // Start in the middle if there are enough items
        if (data.length > 2) setCurrentIndex(Math.floor(data.length / 2));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching certifications:', error);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % certData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + certData.length) % certData.length);
  };

  if (loading) {
    return (
      <section id="certifications" className="relative py-[100px] flex justify-center items-center h-[500px]">
        <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
      </section>
    );
  }

  // If there's no data, we don't render the section (or render a placeholder)
  if (certData.length === 0) {
    return null;
  }

  const activeCert = certData[currentIndex];
  const activeColor = activeCert?.color || '#ffffff'; // Fallback color

  return (
    <section id="certifications" className="relative py-[100px] overflow-hidden z-10">
      
      {/* Dynamic Ambient Background based on active card */}
      <motion.div 
        className="absolute inset-0 opacity-20 blur-[150px] transition-colors duration-1000 ease-in-out pointer-events-none"
        animate={{ backgroundColor: activeColor }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3 text-center">
          06 // Micro-Credentials
        </div>
        
        <h2 className="text-4xl md:text-[2.5rem] font-bold text-white mb-16 text-center">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Certifications</span>
        </h2>

        {/* 3D Carousel Container */}
        <div className="relative h-[450px] w-full flex items-center justify-center [perspective:1000px]">
          
          <AnimatePresence mode="popLayout">
            {certData.map((cert, index) => {
              const offset = (index - currentIndex + certData.length) % certData.length;
              let normalizedOffset = offset;
              if (offset > certData.length / 2) {
                normalizedOffset = offset - certData.length;
              }

              const isActive = normalizedOffset === 0;
              const isAdjacent = Math.abs(normalizedOffset) === 1;
              const cardColor = cert.color || '#ffffff';

              // Do not render cards that are too far away
              if (Math.abs(normalizedOffset) > 2) return null;

              return (
                <motion.div
                  key={cert._id}
                  className="absolute top-1/2 left-1/2 w-[320px] sm:w-[400px] h-[280px] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ originX: 0.5, originY: 0.5 }}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${normalizedOffset * 60}%)`,
                    y: "-50%",
                    scale: isActive ? 1 : 0.8 - Math.abs(normalizedOffset) * 0.1,
                    rotateY: normalizedOffset * -25,
                    zIndex: 50 - Math.abs(normalizedOffset),
                    opacity: isActive ? 1 : isAdjacent ? 0.6 : 0.2,
                    filter: isActive ? 'blur(0px)' : 'blur(4px)',
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 1
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  {/* Glassmorphic Card */}
                  <div 
                    className="w-full h-full rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300"
                    style={{
                      background: isActive 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(20, 20, 20, 0.5)',
                      backdropFilter: 'blur(16px)',
                      border: isActive 
                        ? `1px solid ${cardColor}60` 
                        : '1px solid rgba(255, 255, 255, 0.05)',
                      boxShadow: isActive 
                        ? `0 20px 50px -10px rgba(0,0,0,0.5), inset 0 0 30px ${cardColor}20` 
                        : 'none'
                    }}
                  >
                    {/* Top Section */}
                    <div className="flex justify-between items-start z-10 relative">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden bg-white/10"
                        style={{ border: `1px solid ${cardColor}40` }}
                      >
                        {cert.logo ? (
                          <img 
                            src={urlFor(cert.logo).width(100).height(100).url()} 
                            alt={cert.issuer} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Award className="w-7 h-7" style={{ color: cardColor }} />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        <Award className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                        <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">{cert.date}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="z-10 relative mt-6">
                      <p className="text-sm font-mono text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
                        {cert.issuer}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Bottom Action */}
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest z-10 relative group w-fit transition-all duration-300"
                        style={{ color: cardColor, opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
                      >
                        View Credential
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    ) : (
                      <div className="mt-6 h-6" /> // spacer
                    )}

                    {/* Premium Glare Effect */}
                    {isActive && (
                      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/5 blur-[80px] rounded-full pointer-events-none" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Carousel Controls (only show if > 1 cert) */}
        {certData.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-8">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {certData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex 
                      ? 'w-8 h-2 bg-white' 
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
