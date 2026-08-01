import { motion } from 'motion/react';
import { Code2, BrainCircuit, Github, Lightbulb } from 'lucide-react';

const SkillBar = ({ name, pill, percent }: { name: string, pill: string, percent: number }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex justify-between items-center">
      <span className="text-[0.95rem] font-medium text-white">{name}</span>
      <span className="font-mono text-[0.7rem] bg-white/5 text-[var(--color-text-muted)] px-2 py-0.5 rounded-full border border-white/5">
        {pill}
      </span>
    </div>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
      />
    </div>
  </div>
);

export default function Skills() {
  const categories = [
    {
      title: "Programming",
      icon: <Code2 className="w-5 h-5" />,
      skills: [
        { name: "Python", pill: "ML Core", percent: 85 },
        { name: "JavaScript", pill: "ES6+", percent: 90 },
        { name: "HTML5", pill: "Semantic", percent: 95 },
        { name: "CSS3", pill: "Flexbox / Grid", percent: 90 },
      ]
    },
    {
      title: "Artificial Intelligence",
      icon: <BrainCircuit className="w-5 h-5" />,
      skills: [
        { name: "Prompt Engineering", pill: "Advanced Context", percent: 95 },
        { name: "AI Developer Tools", pill: "APIs / Agents", percent: 90 },
        { name: "ML Fundamentals", pill: "Supervised", percent: 75 },
      ]
    },
    {
      title: "Development",
      icon: <Github className="w-5 h-5" />,
      skills: [
        { name: "Git & Version Control", pill: "Team Work", percent: 85 },
        { name: "GitHub Workflow", pill: "Actions / CI", percent: 80 },
        { name: "Responsive Web Layout", pill: "Device Agnostic", percent: 95 },
      ]
    },
    {
      title: "Professional",
      icon: <Lightbulb className="w-5 h-5" />,
      skills: [
        { name: "Analytical Thinking", pill: "Problem Solver", percent: 90 },
        { name: "English", pill: "Fluent (C2)", percent: 95 },
        { name: "Amharic & Afan Oromo", pill: "Native", percent: 100 },
        { name: "Technical Writing", pill: "Clear Docs", percent: 85 },
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-[100px] max-w-[1200px] mx-auto px-6 z-10">
      <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3">
        Capabilities
      </div>
      
      <h2 className="text-4xl md:text-[2.5rem] font-bold text-white mb-12">
        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">skills</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-[var(--color-surface)]/45 border border-[var(--color-primary)]/10 rounded-2xl p-8 flex flex-col h-full transition-colors duration-300 hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]/25 hover:shadow-[0_10px_30px_rgba(0,245,255,0.05)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/5 w-10 h-10 rounded-lg flex items-center justify-center">
                {cat.icon}
              </div>
              <h3 className="text-xl text-white font-semibold">{cat.title}</h3>
            </div>
            
            <div className="flex flex-col gap-4 flex-grow">
              {cat.skills.map((skill, sIdx) => (
                <SkillBar key={sIdx} name={skill.name} pill={skill.pill} percent={skill.percent} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
