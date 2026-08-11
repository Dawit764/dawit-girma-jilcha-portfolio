import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, Baby, BookOpen, Code2, Rocket, MapPin, Calendar, Briefcase } from 'lucide-react';

const JourneyCard = ({ item, isEven }: { item: any, isEven: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
    >
      <div 
        className={`relative bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 transition-all duration-700 hover:bg-white/10 text-left w-full cursor-default ${isEven ? 'md:text-left' : 'md:text-left'} rounded-[3rem]`}
      >
        <div className={`flex flex-col mb-4`}>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-primary/90 tracking-widest">
              <Calendar className="w-3.5 h-3.5 mr-2" />
              {item.year}
            </div>
          </div>
          
          <h3 className="text-3xl font-display text-foreground/90 mb-4">{item.title}</h3>
          
          <div className="flex items-center gap-2 text-muted-foreground/80 text-sm mb-6 bg-black/20 px-4 py-2 rounded-full border border-white/5 w-fit">
            {item.iconType === 'location' ? <MapPin className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            <span className="italic font-light">{item.subtitle}</span>
          </div>
          
          <p className="text-muted-foreground/80 leading-relaxed font-light text-base">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

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
      subtitle: "Nekemte, Ethiopia",
      iconType: "location",
      icon: Baby,
      desc: "Developed an early fascination with physical computer components and interactive user grids from a very young age."
    },
    {
      year: "2012 - 2024",
      title: "Bethel Academy",
      subtitle: "Primary & Secondary Foundations",
      iconType: "school",
      icon: BookOpen,
      desc: "Discovered an affinity for mathematics, logic, and self-directed coding while establishing solid analytical foundations."
    },
    {
      year: "2025",
      title: "Addis Ababa University",
      subtitle: "BSc Computer Science",
      iconType: "school",
      icon: GraduationCap,
      desc: "Admitted into Ethiopia's flagship technology institute to formalize knowledge in computational structures."
    },
    {
      year: "Present",
      title: "Practical Acceleration",
      subtitle: "AI & Web Engineering Focus",
      iconType: "work",
      icon: Code2,
      desc: "Building and testing scalable vanilla UI systems, developing custom ML models, and preparing for professional software engineering internships."
    },
    {
      year: "2030 & Beyond",
      title: "Future Vistas",
      subtitle: "Software Architect / AI Specialist",
      iconType: "work",
      icon: Rocket,
      desc: "Aspiring to engineer highly localized intelligent platforms that directly address socio-economic opportunities across Healthcare, Fintech, and Education."
    }
  ];

  return (
    <>
      <section id="journey" className="relative py-32 max-w-[1200px] mx-auto px-6 z-10 overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary/80 text-xs tracking-widest uppercase mb-6">
            Narrative
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-foreground">
            My Journey
          </h2>
        </motion.div>
        
        <div ref={containerRef} className="relative py-10">
          {/* Soft Organic Path */}
          <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10" />
          
          {/* Active Flowing Line */}
          <motion.div 
            className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-0 w-[3px] bg-primary/40 blur-[1px] rounded-full z-10"
            style={{ height: timelineHeight }}
          />
          
          <div className="flex flex-col gap-16 relative z-20">
            {journeyItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = item.icon;
              return (
                <div key={idx} className={`relative flex md:justify-between items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Soft Glowing Node */}
                  <motion.div 
                    initial={{ scale: 0.8, backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}
                    whileInView={{ scale: 1, backgroundColor: "rgba(255,255,255,0.1)", color: "var(--primary)" }}
                    viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute left-[0px] md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center z-30 backdrop-blur-md"
                  >
                    <Icon className="w-5 h-5 opacity-80" />
                  </motion.div>
                  
                  <div className="hidden md:block w-[45%]" />
                  
                  <JourneyCard item={item} isEven={isEven} />
                  
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Roots */}
      <section id="education" className="relative py-32 z-10">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary/80 text-xs tracking-widest uppercase mb-6">
              Academic Foundations
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display text-foreground mb-16">
              Rooted In Science
            </h2>
            
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[4rem] relative overflow-hidden group">
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center mb-10 text-primary/80 transform transition-transform duration-700 group-hover:scale-105">
                  <GraduationCap className="w-10 h-10" />
                </div>
                
                <h3 className="text-3xl font-display text-foreground/90 mb-4">Addis Ababa University</h3>
                <div className="text-sm text-primary/80 font-mono tracking-wider mb-8 bg-black/20 px-6 py-2 rounded-full border border-white/5">
                  BSc in Computer Science (AAIT)
                </div>
                
                <p className="text-muted-foreground/80 text-lg mb-12 max-w-2xl leading-[1.8] font-light">
                  Cultivating a deep understanding of computational structures, advanced algorithms, and machine learning theory at Ethiopia's premier technology institute.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
                  <div className="flex flex-col gap-2 p-6 rounded-[2rem] bg-black/20 border border-white/5 w-full sm:w-1/3">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-mono">Status</span>
                    <span className="text-foreground/80 font-light">Second Year</span>
                  </div>
                  <div className="flex flex-col gap-2 p-6 rounded-[2rem] bg-black/20 border border-white/5 w-full sm:w-1/3">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-mono">Graduation</span>
                    <span className="text-foreground/80 font-light">Class of 2030</span>
                  </div>
                  <div className="flex flex-col gap-2 p-6 rounded-[2rem] bg-black/20 border border-white/5 w-full sm:w-1/3">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-mono">Location</span>
                    <span className="text-foreground/80 font-light">Addis Ababa, ET</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
