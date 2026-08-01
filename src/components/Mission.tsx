import { motion } from 'motion/react';
import { HeartPulse, BookOpen, Wallet } from 'lucide-react';

export default function Mission() {
  const focusAreas = [
    {
      title: "Healthcare AI",
      desc: "Developing predictive systems and smart diagnostics to bridge medical accessibility gaps in regional clinics.",
      icon: <HeartPulse className="w-5 h-5" />
    },
    {
      title: "Educational Platforms",
      desc: "Building accessible, localized digital learning tools that empower students and teachers across Ethiopia.",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "Financial Solutions",
      desc: "Creating micro-transaction services and credit assessing tools to drive localized small business trade.",
      icon: <Wallet className="w-5 h-5" />
    }
  ];

  return (
    <section id="mission" className="relative py-[100px] max-w-[1200px] mx-auto px-6 z-10">
      <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3">
        Purpose
      </div>
      
      <h2 className="text-4xl md:text-[2.5rem] font-bold text-white mb-12">
        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Mission</span>
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
        
        {/* Story */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 text-[1.05rem] text-[var(--color-text-muted)] leading-relaxed"
        >
          <p className="font-display text-[1.35rem] text-white leading-[1.5] font-medium">
            "Born in Nekemte in 2006, my journey into technology was sparked by an early, burning curiosity about how computational machines solve problems."
          </p>
          <p>
            I completed my early education at Bethel Academy, where I established a rigorous academic foundation. This natural curiosity and dedication drove me toward Addis Ababa University (AAIT), where I am currently pursuing a BSc in Computer Science, starting my second year.
          </p>
          <p>
            Today, I focus my research and engineering hours at the intersection of web interfaces and intelligent engines. I strongly believe that code shouldn't just run—it must serve a higher, human purpose.
          </p>
          <p className="text-white font-medium">
            My ultimate goal is to become an expert AI engineer who designs and implements meaningful, lightweight software that improves lives, unlocks commercial productivity, and directly contributes to Ethiopia's rapid technological development.
          </p>
        </motion.div>
        
        {/* Focus Areas */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-[1.1rem] font-mono text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">
            Problem Solving Horizons
          </h3>
          
          <div className="flex flex-col gap-4">
            {focusAreas.map((area, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 6 }}
                className="bg-[var(--color-surface)]/45 border border-[var(--color-primary)]/10 p-5 rounded-xl flex gap-4 items-start transition-all duration-300 hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]/25 group"
              >
                <div className="text-[var(--color-primary)] bg-[var(--color-primary)]/5 w-11 h-11 rounded-lg flex items-center justify-center shrink-0">
                  {area.icon}
                </div>
                <div>
                  <h4 className="text-[1.1rem] text-white mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                    {area.title}
                  </h4>
                  <p className="text-[0.9rem] text-[var(--color-text-muted)] leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
