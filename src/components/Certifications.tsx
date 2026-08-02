import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Award, Code2, Cloud, Brain, Database, Shield, ChevronRight } from 'lucide-react';

const certData = [
  {
    id: "aws-cp",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2025",
    Icon: Cloud,
    color: "#FF9900", // AWS Orange
    size: 110,
    xOffset: "15%",
    yOffset: "10%",
    delay: 0
  },
  {
    id: "dl-ai",
    title: "DeepLearning.AI TensorFlow Developer",
    issuer: "Coursera",
    date: "2024",
    Icon: Brain,
    color: "#F76900", // TF Orange
    size: 130,
    xOffset: "40%",
    yOffset: "35%",
    delay: 0.5
  },
  {
    id: "meta-frontend",
    title: "Meta Front-End Developer",
    issuer: "Coursera",
    date: "2024",
    Icon: Code2,
    color: "#0668E1", // Meta Blue
    size: 100,
    xOffset: "70%",
    yOffset: "15%",
    delay: 1.2
  },
  {
    id: "ibm-data",
    title: "IBM Data Science Professional",
    issuer: "Coursera",
    date: "2023",
    Icon: Database,
    color: "#0f62fe", // IBM Blue
    size: 120,
    xOffset: "20%",
    yOffset: "60%",
    delay: 0.8
  },
  {
    id: "google-cyber",
    title: "Google Cybersecurity Professional",
    issuer: "Coursera",
    date: "2023",
    Icon: Shield,
    color: "#34A853", // Google Green
    size: 90,
    xOffset: "75%",
    yOffset: "65%",
    delay: 1.5
  }
];

export default function Certifications() {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  return (
    <section id="certifications" className="relative py-[80px] max-w-[1200px] mx-auto px-6 z-10">
      <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3 text-center md:text-right">
        06 // Micro-Credentials
      </div>
      
      <h2 className="text-4xl md:text-[2.5rem] font-bold text-white mb-16 text-center md:text-right">
        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Certifications</span>
      </h2>

      <div className="relative w-full h-[500px] bg-gradient-to-br from-[var(--color-surface)]/50 to-[var(--color-surface-hover)]/30 border border-white/5 rounded-3xl overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]">
        
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--color-primary)]/5 blur-[100px] rounded-full pointer-events-none" />

        {certData.map((cert) => {
          const isHovered = hoveredCert === cert.id;
          const isAnyHovered = hoveredCert !== null;
          
          return (
            <motion.div
              key={cert.id}
              className="absolute z-20"
              style={{
                left: cert.xOffset,
                top: cert.yOffset,
                width: cert.size,
                height: cert.size,
              }}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              animate={{
                y: isHovered ? -10 : [0, -15, 0],
                x: isHovered ? 0 : [0, 10, 0],
                rotate: isHovered ? 0 : [0, 5, -5, 0]
              }}
              transition={{
                y: {
                  duration: isHovered ? 0.3 : 6 + Math.random() * 2,
                  repeat: isHovered ? 0 : Infinity,
                  ease: "easeInOut",
                  delay: isHovered ? 0 : cert.delay
                },
                x: {
                  duration: 8 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: cert.delay
                },
                rotate: {
                  duration: 10 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: cert.delay
                },
                opacity: { duration: 0.8 }
              }}
            >
              {/* The Badge */}
              <motion.div
                onHoverStart={() => setHoveredCert(cert.id)}
                onHoverEnd={() => setHoveredCert(null)}
                className="w-full h-full relative cursor-pointer group"
                animate={{
                  scale: isHovered ? 1.15 : (isAnyHovered ? 0.9 : 1),
                  opacity: isAnyHovered && !isHovered ? 0.5 : 1,
                  filter: isAnyHovered && !isHovered ? "blur(2px)" : "blur(0px)"
                }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
              >
                <div 
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border-[2px] border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isHovered ? cert.color : 'rgba(255,255,255,0.2)',
                    boxShadow: isHovered ? `0 0 30px ${cert.color}40, inset 0 0 20px ${cert.color}20` : '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Internal glare for glass/metal effect */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full" />
                  
                  <cert.Icon 
                    className="relative z-10 transition-all duration-300" 
                    style={{ 
                      width: cert.size * 0.4, 
                      height: cert.size * 0.4,
                      color: isHovered ? cert.color : 'rgba(255,255,255,0.7)'
                    }} 
                  />
                </div>
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[110%] left-1/2 -translate-x-1/2 w-[250px] bg-[var(--color-surface)] border border-white/10 rounded-xl p-4 shadow-2xl z-[100] pointer-events-none"
                    style={{ 
                      boxShadow: `0 20px 40px -10px rgba(0,0,0,0.8), 0 0 20px ${cert.color}20`
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4" style={{ color: cert.color }} />
                      <span className="text-xs uppercase tracking-wider font-mono text-[var(--color-text-muted)]">{cert.issuer}</span>
                    </div>
                    <h4 className="text-white font-bold text-sm leading-tight mb-2">{cert.title}</h4>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                      <span className="text-xs font-mono text-[var(--color-text-muted)]">Issued: {cert.date}</span>
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--color-primary)] flex items-center">
                        Verify <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        
        {/* Helper Text */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-[var(--color-text-muted)] opacity-50 flex items-center gap-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          Hover over badges to view details
        </div>
      </div>
    </section>
  );
}
