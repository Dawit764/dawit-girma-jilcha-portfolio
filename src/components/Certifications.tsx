import { useState, useEffect, useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "certification" && !(_id in path("drafts.**"))] | order(_createdAt asc)`)
      .then((data) => {
        setCertData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching certifications:', error);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="certifications" className="relative py-[100px] flex justify-center items-center h-[500px]">
        <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin" />
      </section>
    );
  }

  if (certData.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="relative py-[100px] overflow-hidden z-10">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3 text-center">
          06 // Micro-Credentials
        </div>
        
        <h2 className="text-4xl md:text-[2.5rem] font-bold text-white mb-16 text-center">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Certifications</span>
        </h2>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 -mx-4 hide-scrollbar scroll-smooth"
        >
          {certData.map((cert) => {
            const cardColor = cert.color || 'var(--color-primary)';

            return (
              <div
                key={cert._id}
                className="relative flex-none w-[85vw] sm:w-[350px] snap-center"
              >
                {/* Glassmorphic Card */}
                <div 
                  className="w-full h-full min-h-[280px] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 bg-[var(--color-surface)] border border-white/10 hover:border-[var(--color-primary)]/50 hover:-translate-y-1"
                >
                  {/* Top Section */}
                  <div className="flex justify-between items-start z-10 relative">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden bg-white/5"
                      style={{ border: `1px solid ${cardColor}40` }}
                    >
                      {cert.logo && cert.logo.asset ? (
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
                      className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest z-10 relative group w-fit transition-all duration-300 hover:opacity-80"
                      style={{ color: cardColor }}
                    >
                      View Credential
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  ) : (
                    <div className="mt-6 h-6" /> // spacer
                  )}

                  {/* Subtle Glow */}
                  <div 
                    className="absolute top-0 right-0 w-[150px] h-[150px] blur-[60px] rounded-full pointer-events-none opacity-[0.15]"
                    style={{ backgroundColor: cardColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls (Hidden on Mobile) */}
        {certData.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-4 hidden md:flex">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 hover:border-[var(--color-primary)]/30 transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 hover:border-[var(--color-primary)]/30 transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
