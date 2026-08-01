import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';

export default function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const journeyItems = [
    {
      year: "2006",
      title: "Early Beginnings",
      subtitle: "Born in Nekemte, Ethiopia",
      desc: "Developed an early fascination with physical computer components and interactive user grids from a very young age."
    },
    {
      year: "2012 - 2024",
      title: "Bethel Academy",
      subtitle: "Primary & Secondary Foundations",
      desc: "Discovered an affinity for mathematics, logic, and self-directed coding while establishing solid analytical foundations."
    },
    {
      year: "2025",
      title: "Addis Ababa University",
      subtitle: "Joined AAIT - BSc Computer Science",
      desc: "Admitted into Ethiopia's flagship technology institute to formalize knowledge in computational structures."
    },
    {
      year: "Present",
      title: "Practical Acceleration",
      subtitle: "AI & Front-End Web Engineering Focus",
      desc: "Building and testing scalable vanilla UI systems, developing custom ML models, and preparing for professional software engineering internships."
    },
    {
      year: "2030 & Beyond",
      title: "Future Vistas",
      subtitle: "Senior Software Architect / AI Specialist",
      desc: "Aspiring to engineer highly localized intelligent platforms that directly address socio-economic opportunities across Healthcare, Fintech, and Education."
    }
  ];

  return (
    <>
      <section id="journey" className="relative py-[100px] max-w-[1200px] mx-auto px-6 z-10">
        <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3">
          04 // Narrative
        </div>
        
        <h2 className="text-4xl md:text-[2.5rem] font-bold text-white mb-20">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Journey</span>
        </h2>
        
        <div ref={containerRef} className="relative pl-8 md:pl-0">
          {/* Timeline Line */}
          <div className="absolute left-[31px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />
          
          <motion.div 
            className="absolute left-[31px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
            style={{ height: timelineHeight }}
          />
          
          <div className="flex flex-col gap-16 relative z-10">
            {journeyItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex md:justify-between items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Indicator Dot */}
                  <div className="absolute left-[-8px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)] z-20" />
                  
                  <div className="hidden md:block w-[45%]" />
                  
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-[45%] pl-8 md:pl-0"
                  >
                    <div className={`bg-[var(--color-surface)]/60 backdrop-blur-sm border border-white/5 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-xl text-left ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                      <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} mb-4`}>
                        <span className="font-mono text-[var(--color-primary)] font-medium mb-2">{item.year}</span>
                        <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                        <span className="text-[0.95rem] text-[var(--color-text-muted)] italic">{item.subtitle}</span>
                      </div>
                      <p className="text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education & Credentials */}
      <section id="education" className="relative py-[100px] bg-gradient-to-b from-transparent to-[var(--color-surface)]/30 border-b border-white/5 z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3 text-center">
            05 // Academic Foundations
          </div>
          
          <h2 className="text-4xl md:text-[2.5rem] font-bold text-white mb-12 text-center">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Credentials</span>
          </h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-hover)] border border-[var(--color-primary)]/20 p-8 md:p-12 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-[80px] group-hover:bg-[var(--color-primary)]/10 transition-colors duration-500" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[var(--color-primary)]/20 text-white">
                <GraduationCap className="w-8 h-8" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-2 font-display">Addis Ababa University</h3>
              <div className="text-xl text-[var(--color-primary)] font-medium mb-6">BSc in Computer Science (AAIT)</div>
              
              <p className="text-[var(--color-text-muted)] text-lg mb-8 max-w-2xl leading-relaxed">
                Enrolled in the flagship computer science program, training in advanced algorithms, database structures, machine learning theory, and hardware designs at the Addis Ababa Institute of Technology.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full border-t border-white/10 pt-8">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono">Current Status</span>
                  <span className="text-white font-medium">Second Year</span>
                </div>
                <div className="flex flex-col gap-1 md:border-l md:border-white/10">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono">Expected Graduation</span>
                  <span className="text-white font-medium">Class of 2030</span>
                </div>
                <div className="flex flex-col gap-1 md:border-l md:border-white/10">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-mono">Location</span>
                  <span className="text-white font-medium">Addis Ababa, ET</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
