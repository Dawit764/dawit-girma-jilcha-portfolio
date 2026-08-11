import { motion } from 'motion/react';
import { Code2, BrainCircuit, Github, Lightbulb } from 'lucide-react';

const SkillBar = ({ name, percent }: { name: string, percent: number }) => (
  <div className="flex flex-col gap-3">
    <div className="flex justify-between items-center">
      <span className="text-base font-light text-foreground/90">{name}</span>
    </div>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="h-full bg-primary/60 rounded-full"
      />
    </div>
  </div>
);

export default function Skills() {
  const categories = [
    {
      title: "Engineering",
      icon: <Code2 className="w-6 h-6 stroke-[1.5]" />,
      skills: [
        { name: "Python", percent: 85 },
        { name: "JavaScript / ES6+", percent: 90 },
        { name: "Semantic HTML / CSS", percent: 95 },
      ]
    },
    {
      title: "Intelligence",
      icon: <BrainCircuit className="w-6 h-6 stroke-[1.5]" />,
      skills: [
        { name: "Prompt Engineering", percent: 95 },
        { name: "Agentic Systems", percent: 90 },
        { name: "ML Fundamentals", percent: 75 },
      ]
    },
    {
      title: "Workflow",
      icon: <Github className="w-6 h-6 stroke-[1.5]" />,
      skills: [
        { name: "Version Control", percent: 85 },
        { name: "CI / CD pipelines", percent: 80 },
        { name: "Fluid Layouts", percent: 95 },
      ]
    },
    {
      title: "Essence",
      icon: <Lightbulb className="w-6 h-6 stroke-[1.5]" />,
      skills: [
        { name: "Analytical Thinking", percent: 90 },
        { name: "Technical Writing", percent: 85 },
        { name: "Bilingual (En, Am, Om)", percent: 100 },
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-32 max-w-[1200px] mx-auto px-6 z-10">
      <div className="text-center mb-20">
        <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary/80 text-xs tracking-widest uppercase mb-6">
          Capabilities
        </div>
        <h2 className="text-4xl md:text-5xl font-display text-foreground">
          Technical Skills
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col h-full bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-8 transition-transform hover:-translate-y-2"
          >
            <div className="text-primary/70 mb-8">
              {cat.icon}
            </div>
            <h3 className="text-2xl font-display text-foreground/90 mb-10">{cat.title}</h3>
            
            <div className="flex flex-col gap-8 flex-grow">
              {cat.skills.map((skill, sIdx) => (
                <SkillBar key={sIdx} name={skill.name} percent={skill.percent} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
