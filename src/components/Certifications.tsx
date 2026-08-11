import { useState, useEffect, useRef } from 'react';
import { Award, ExternalLink, Loader2 } from 'lucide-react';
import { sanityClient, urlFor } from '../sanity';
import { motion } from 'motion/react';

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

  if (loading) {
    return (
      <section id="certifications" className="relative py-32 flex justify-center items-center h-[300px]">
        <Loader2 className="w-8 h-8 text-primary/50 animate-spin" />
      </section>
    );
  }

  if (certData.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="relative py-32 overflow-hidden z-10">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary/80 text-xs tracking-widest uppercase mb-6">
            Credentials
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-foreground">
            Badges of Growth
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certData.map((cert, idx) => {
            return (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between h-[340px] bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-8 md:p-10 overflow-hidden transition-all duration-700 hover:bg-white/10 hover:-translate-y-2"
              >
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-white/10 border border-white/5 backdrop-blur-sm">
                      {cert.logo && cert.logo.asset ? (
                        <img 
                          src={urlFor(cert.logo).width(100).height(100).url()} 
                          alt={cert.issuer} 
                          className="w-full h-full object-cover p-3 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                        />
                      ) : (
                        <Award className="w-6 h-6 text-primary/60" />
                      )}
                    </div>
                    <div className="flex items-center text-[0.65rem] font-mono text-muted-foreground/60 uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                      {cert.date}
                    </div>
                  </div>

                  <p className="text-xs font-mono text-primary/70 mb-4 uppercase tracking-widest">
                    {cert.issuer}
                  </p>
                  <h3 className="text-2xl font-display text-foreground/90 leading-snug">
                    {cert.title}
                  </h3>
                </div>

                {/* Bottom Action */}
                <div className="relative z-10 mt-auto pt-8">
                  {cert.link && (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      View Credential
                      <ExternalLink className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  )}
                </div>
                
                {/* Soft ambient glow */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
