import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, Baby, BookOpen, Code2, Rocket, MapPin, Calendar, Briefcase } from 'lucide-react';

const TiltCard = ({ item, isEven }: { item: any, isEven: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="w-full md:w-[45%] pl-12 md:pl-0"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className={`relative bg-[var(--color-surface)]/60 backdrop-blur-sm border border-white/5 p-8 rounded-2xl transition-colors duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-[0_10px_40px_rgba(0,245,255,0.15)] text-left w-full cursor-default ${isEven ? 'md:text-left' : 'md:text-right'}`}
      >
        <div style={{ transform: "translateZ(30px)" }} className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} mb-4`}>
          <div className="flex items-center gap-2 mb-3 bg-white/5 px-3 py-1 rounded-full w-fit">
            <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="font-mono text-[var(--color-primary)] font-medium text-sm">{item.year}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
          
          <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-[0.95rem] mb-4 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 w-fit">
            {item.iconType === 'location' ? <MapPin className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            <span className="italic">{item.subtitle}</span>
          </div>
          
          <p className="text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
        </div>
        
        {/* Glow behind the card on hover */}
        <div 
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl opacity-0 blur-xl transition-opacity duration-500 hover:opacity-10"
          style={{ transform: "translateZ(-10px)" }}
        />
      </motion.div>
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
      <section id="journey" className="relative py-[100px] max-w-[1200px] mx-auto px-6 z-10 overflow-hidden">
        <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3 text-center md:text-left">
          04 // Narrative
        </div>
        
        <h2 className="text-4xl md:text-[2.5rem] font-bold text-white mb-20 text-center md:text-left">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Journey</span>
        </h2>
        
        <div ref={containerRef} className="relative py-10">
          {/* Base Timeline Line (Dim) */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />
          
          {/* Active Timeline Line (Bright) */}
          <motion.div 
            className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full shadow-[0_0_15px_var(--color-primary)] z-10"
            style={{ height: timelineHeight }}
          />
          
          {/* Glowing Head Particle on Active Line */}
          <motion.div 
            className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 w-[10px] h-[20px] bg-white rounded-full blur-[3px] shadow-[0_0_20px_10px_var(--color-primary)] z-10"
            style={{ top: timelineHeight, y: "-100%" }}
          />
          
          <div className="flex flex-col gap-24 relative z-20">
            {journeyItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = item.icon;
              return (
                <div key={idx} className={`relative flex md:justify-between items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Interactive Indicator Dot */}
                  <motion.div 
                    initial={{ scale: 0.8, backgroundColor: "var(--color-background)", borderColor: "rgba(255,255,255,0.2)", boxShadow: "0 0 0px transparent", color: "rgba(255,255,255,0.4)" }}
                    whileInView={{ scale: 1.1, backgroundColor: "var(--color-surface)", borderColor: "var(--color-primary)", boxShadow: "0 0 30px var(--color-primary)", color: "var(--color-primary)" }}
                    viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-[-2px] md:left-1/2 md:-translate-x-1/2 w-[46px] h-[46px] rounded-full border-2 flex items-center justify-center z-30 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  
                  <div className="hidden md:block w-[45%]" />
                  
                  <TiltCard item={item} isEven={isEven} />
                  
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
