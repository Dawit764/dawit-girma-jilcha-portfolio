import { motion } from 'motion/react';
import { HeartPulse, BookOpen, Wallet } from 'lucide-react';

export default function Mission() {
  const focusAreas = [
    {
      title: "Healthcare",
      desc: "Developing predictive systems and smart diagnostics to bridge medical accessibility gaps.",
      icon: <HeartPulse className="w-6 h-6 stroke-[1.5]" />
    },
    {
      title: "Education",
      desc: "Building accessible, localized digital learning tools that empower students and teachers.",
      icon: <BookOpen className="w-6 h-6 stroke-[1.5]" />
    },
    {
      title: "Finance",
      desc: "Creating micro-transaction services and tools to drive localized small business trade.",
      icon: <Wallet className="w-6 h-6 stroke-[1.5]" />
    }
  ];

  return (
    <section id="mission" className="relative py-32 max-w-[1200px] mx-auto px-6 z-10">
      
      <div className="flex flex-col md:flex-row gap-20 items-start">
        
        {/* Story */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col gap-8 text-lg text-muted-foreground/80 leading-relaxed font-light"
        >
          <div>
            <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary/80 text-xs tracking-widest uppercase mb-6">
              Origin
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-foreground mb-8">
              My Mission
            </h2>
          </div>
          
          <p className="font-display text-2xl md:text-3xl text-foreground/90 leading-[1.4] italic">
            "Born in Nekemte in 2006, my journey into technology was sparked by an early, burning curiosity about how computational machines solve problems."
          </p>
          
          <p>
            I completed my early education at Bethel Academy, where I established a rigorous academic foundation. This natural curiosity and dedication drove me toward Addis Ababa University (AAIT), where I am currently pursuing a BSc in Computer Science, starting my second year.
          </p>
          <p>
            Today, I focus my research and engineering hours at the intersection of web interfaces and intelligent engines. I strongly believe that code shouldn't just run—it must serve a higher, human purpose.
          </p>
          <p className="text-foreground/90 font-normal">
            My ultimate goal is to become an expert AI engineer who designs and implements meaningful, lightweight software that improves lives, unlocks commercial productivity, and directly contributes to Ethiopia's rapid technological development.
          </p>
        </motion.div>
        
        {/* Focus Areas */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full"
        >
          <div className="flex flex-col gap-6">
            {focusAreas.map((area, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-colors hover:bg-white/10"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-l-[2rem]" />
                
                <div className="flex gap-6 items-start">
                  <div className="text-primary/70 shrink-0 mt-1 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary">
                    {area.icon}
                  </div>
                  <div>
                    <h4 className="text-xl text-foreground font-display mb-3">
                      {area.title}
                    </h4>
                    <p className="text-muted-foreground/80 leading-relaxed font-light">
                      {area.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
