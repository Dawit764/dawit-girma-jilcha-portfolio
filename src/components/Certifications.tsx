import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Code2, Cloud, Brain, Database, Shield, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const certData = [
  {
    id: "aws-cp",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2025",
    Icon: Cloud,
    color: "#FF9900", // AWS Orange
    link: "#",
  },
  {
    id: "dl-ai",
    title: "DeepLearning.AI TensorFlow Developer",
    issuer: "Coursera",
    date: "2024",
    Icon: Brain,
    color: "#F76900", // TF Orange
    link: "#",
  },
  {
    id: "meta-frontend",
    title: "Meta Front-End Developer",
    issuer: "Coursera",
    date: "2024",
    Icon: Code2,
    color: "#0668E1", // Meta Blue
    link: "#",
  },
  {
    id: "ibm-data",
    title: "IBM Data Science Professional",
    issuer: "Coursera",
    date: "2023",
    Icon: Database,
    color: "#0f62fe", // IBM Blue
    link: "#",
  },
  {
    id: "google-cyber",
    title: "Google Cybersecurity Professional",
    issuer: "Coursera",
    date: "2023",
    Icon: Shield,
    color: "#34A853", // Google Green
    link: "#",
  }
];

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start in the middle

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % certData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + certData.length) % certData.length);
  };

  const activeCert = certData[currentIndex];

  return (
    <section id="certifications" className="relative py-[100px] overflow-hidden z-10">
      
      {/* Dynamic Ambient Background based on active card */}
      <motion.div 
        className="absolute inset-0 opacity-20 blur-[150px] transition-colors duration-1000 ease-in-out pointer-events-none"
        animate={{ backgroundColor: activeCert.color }}
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
              // Calculate relative position to center
              const offset = (index - currentIndex + certData.length) % certData.length;
              // Normalize offset to handle wrap around smoothly
              let normalizedOffset = offset;
              if (offset > certData.length / 2) {
                normalizedOffset = offset - certData.length;
              }

              const isActive = normalizedOffset === 0;
              const isAdjacent = Math.abs(normalizedOffset) === 1;

              // Do not render cards that are too far away
              if (Math.abs(normalizedOffset) > 2) return null;

              return (
                <motion.div
                  key={cert.id}
                  className="absolute top-1/2 left-1/2 w-[320px] sm:w-[400px] h-[280px] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ originX: 0.5, originY: 0.5 }}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${normalizedOffset * 60}%)`,
                    y: "-50%",
                    scale: isActive ? 1 : 0.8 - Math.abs(normalizedOffset) * 0.1,
                    rotateY: normalizedOffset * -25, // Turn cards towards center
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
                        ? `1px solid ${cert.color}60` 
                        : '1px solid rgba(255, 255, 255, 0.05)',
                      boxShadow: isActive 
                        ? `0 20px 50px -10px rgba(0,0,0,0.5), inset 0 0 30px ${cert.color}20` 
                        : 'none'
                    }}
                  >
                    {/* Top Section */}
                    <div className="flex justify-between items-start z-10 relative">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
                      >
                        <cert.Icon className="w-7 h-7" style={{ color: cert.color }} />
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

                    {/* Bottom Action (Only visible on active) */}
                    <motion.div 
                      className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest z-10 relative cursor-pointer group w-fit"
                      style={{ color: cert.color }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    >
                      View Credential
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </motion.div>

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

        {/* Carousel Controls */}
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
      </div>
    </section>
  );
}
