import { useState, useEffect, useRef } from 'react';
import { Award, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { sanityClient, urlFor } from '../sanity';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </section>
    );
  }

  if (certData.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="relative py-[100px] overflow-hidden z-10">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="font-mono text-[0.8rem] text-primary uppercase tracking-[0.2em] mb-3 text-center">
          06 // Micro-Credentials
        </div>
        
        <h2 className="text-4xl md:text-[2.5rem] font-bold text-foreground mb-16 text-center">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff]">Certifications</span>
        </h2>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-4 -mx-4 hide-scrollbar scroll-smooth"
        >
          {certData.map((cert) => {
            const cardColor = cert.color || 'var(--primary)';
            const colorIsHex = cardColor.startsWith('#');

            return (
              <div
                key={cert._id}
                className="relative flex-none w-[85vw] sm:w-[380px] snap-center group"
              >
                <Card 
                  className="w-full h-full min-h-[300px] bg-card/60 backdrop-blur-xl border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col justify-between"
                  style={{ 
                    // dynamically setting border color based on cert color
                    borderColor: colorIsHex ? `${cardColor}30` : `rgba(${cardColor}, 0.2)`
                  }}
                >
                  <CardContent className="p-8 flex flex-col h-full justify-between">
                    {/* Top Section */}
                    <div className="flex justify-between items-start z-10 relative mb-8">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden bg-background/50 backdrop-blur-md shadow-inner"
                        style={{ border: `1px solid ${colorIsHex ? cardColor + '40' : `rgba(${cardColor}, 0.2)`}` }}
                      >
                        {cert.logo && cert.logo.asset ? (
                          <img 
                            src={urlFor(cert.logo).width(100).height(100).url()} 
                            alt={cert.issuer} 
                            className="w-full h-full object-cover scale-[0.8]"
                          />
                        ) : (
                          <Award className="w-8 h-8" style={{ color: colorIsHex ? cardColor : `hsl(var(--primary))` }} />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 bg-background/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-sm">
                        <Award className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{cert.date}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="z-10 relative flex-grow">
                      <p className="text-sm font-mono text-muted-foreground mb-3 uppercase tracking-wider font-medium">
                        {cert.issuer}
                      </p>
                      <h3 className="text-2xl font-bold text-foreground leading-tight tracking-tight">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Bottom Action */}
                    {cert.link ? (
                      <Button
                        variant="link"
                        render={<a href={cert.link} target="_blank" rel="noopener noreferrer" />}
                        className="mt-8 p-0 h-auto justify-start text-sm font-bold uppercase tracking-widest z-10 relative w-fit hover:no-underline group/btn transition-colors duration-300"
                        style={{ color: colorIsHex ? cardColor : `hsl(var(--primary))` }}
                      >
                        View Credential
                        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </Button>
                    ) : (
                      <div className="mt-8 h-6" /> // spacer
                    )}
                  </CardContent>

                  {/* Subtle Glow */}
                  <div 
                    className="absolute top-0 right-0 w-[200px] h-[200px] blur-[80px] rounded-full pointer-events-none opacity-[0.1]"
                    style={{ backgroundColor: colorIsHex ? cardColor : `hsl(var(--primary))` }}
                  />
                </Card>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        {certData.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8 hidden md:flex">
            <Button 
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border-white/10 bg-card/50 backdrop-blur-md text-muted-foreground hover:text-foreground hover:bg-card/80 hover:border-primary/30 transition-all shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="w-12 h-12 rounded-full border-white/10 bg-card/50 backdrop-blur-md text-muted-foreground hover:text-foreground hover:bg-card/80 hover:border-primary/30 transition-all shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
