import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, Baby, BookOpen, Code2, Rocket, MapPin, Calendar, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
        className="w-full h-full"
      >
        <Card 
          className={`relative bg-card/60 backdrop-blur-xl border-white/5 p-2 rounded-[2rem] transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_50px_-15px_rgba(var(--primary),0.2)] text-left w-full cursor-default ${isEven ? 'md:text-left' : 'md:text-right'}`}
        >
          <CardContent className="p-6 md:p-8">
            <div style={{ transform: "translateZ(30px)" }} className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} mb-4`}>
              <Badge variant="secondary" className="flex items-center gap-1.5 mb-4 bg-primary/10 text-primary border-primary/20 backdrop-blur-sm px-3 py-1 text-sm font-mono shadow-sm">
                <Calendar className="w-3.5 h-3.5" />
                {item.year}
              </Badge>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
              
              <div className="flex items-center gap-2 text-muted-foreground text-[0.95rem] mb-5 bg-background/50 px-3.5 py-1.5 rounded-xl border border-white/5 w-fit shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]">
                {item.iconType === 'location' ? <MapPin className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                <span className="italic font-light">{item.subtitle}</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed font-light text-[1.05rem]">{item.desc}</p>
            </div>
          </CardContent>
          
          {/* Glow behind the card on hover */}
          <div 
            className="absolute inset-0 -z-10 bg-gradient-to-br from-primary to-[#00d2ff] rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-700 hover:opacity-10 pointer-events-none"
            style={{ transform: "translateZ(-10px)" }}
          />
        </Card>
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
        <div className="font-mono text-[0.8rem] text-primary uppercase tracking-[0.2em] mb-3 text-center md:text-left">
          04 // Narrative
        </div>
        
        <h2 className="text-4xl md:text-[2.5rem] font-bold text-foreground mb-20 text-center md:text-left">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff]">Journey</span>
        </h2>
        
        <div ref={containerRef} className="relative py-10">
          {/* Base Timeline Line (Dim) */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />
          
          {/* Active Timeline Line (Bright) */}
          <motion.div 
            className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-primary to-[#00d2ff] rounded-full shadow-[0_0_15px_var(--primary)] z-10"
            style={{ height: timelineHeight }}
          />
          
          {/* Glowing Head Particle on Active Line */}
          <motion.div 
            className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 w-[10px] h-[20px] bg-white rounded-full blur-[3px] shadow-[0_0_20px_10px_var(--primary)] z-10"
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
                    initial={{ scale: 0.8, backgroundColor: "var(--background)", borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 0 0px transparent", color: "rgba(255,255,255,0.4)" }}
                    whileInView={{ scale: 1.1, backgroundColor: "var(--card)", borderColor: "var(--primary)", boxShadow: "0 0 30px rgba(var(--primary),0.5)", color: "var(--primary)" }}
                    viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute left-[-2px] md:left-1/2 md:-translate-x-1/2 w-[46px] h-[46px] rounded-full border border-primary/50 flex items-center justify-center z-30 transition-colors bg-card backdrop-blur-md"
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
      <section id="education" className="relative py-[100px] bg-card/20 border-y border-white/5 z-10 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="font-mono text-[0.8rem] text-primary uppercase tracking-[0.2em] mb-3 text-center">
            05 // Academic Foundations
          </div>
          
          <h2 className="text-4xl md:text-[2.5rem] font-bold text-foreground mb-12 text-center tracking-tight">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff]">Credentials</span>
          </h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-card/60 backdrop-blur-2xl border-white/10 p-2 md:p-4 rounded-[2.5rem] relative overflow-hidden group shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
              
              <CardContent className="relative z-10 flex flex-col items-center text-center p-8 md:p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-[#00d2ff] rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-primary/20 text-primary-foreground transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500">
                  <GraduationCap className="w-10 h-10" />
                </div>
                
                <h3 className="text-3xl font-bold text-foreground mb-3 font-display">Addis Ababa University</h3>
                <div className="text-xl text-primary font-medium mb-8 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">BSc in Computer Science (AAIT)</div>
                
                <p className="text-muted-foreground text-lg mb-10 max-w-2xl leading-relaxed font-light">
                  Enrolled in the flagship computer science program, training in advanced algorithms, database structures, machine learning theory, and hardware designs at the Addis Ababa Institute of Technology.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full border-t border-white/5 pt-10">
                  <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-background/30 border border-white/5">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Current Status</span>
                    <span className="text-foreground font-medium">Second Year</span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-background/30 border border-white/5">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Expected Graduation</span>
                    <span className="text-foreground font-medium">Class of 2030</span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-background/30 border border-white/5">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Location</span>
                    <span className="text-foreground font-medium">Addis Ababa, ET</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
}
