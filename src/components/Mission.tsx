import { motion } from 'motion/react';
import { HeartPulse, BookOpen, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
      <div className="font-mono text-[0.8rem] text-primary uppercase tracking-[0.2em] mb-3">
        Purpose
      </div>
      
      <h2 className="text-4xl md:text-[2.5rem] font-bold text-foreground mb-12">
        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff]">Mission</span>
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
        
        {/* Story */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 text-[1.05rem] text-muted-foreground leading-relaxed font-light"
        >
          <p className="font-display text-[1.4rem] text-foreground leading-[1.6] font-medium tracking-tight">
            "Born in Nekemte in 2006, my journey into technology was sparked by an early, burning curiosity about how computational machines solve problems."
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-2" />
          <p>
            I completed my early education at Bethel Academy, where I established a rigorous academic foundation. This natural curiosity and dedication drove me toward Addis Ababa University (AAIT), where I am currently pursuing a BSc in Computer Science, starting my second year.
          </p>
          <p>
            Today, I focus my research and engineering hours at the intersection of web interfaces and intelligent engines. I strongly believe that code shouldn't just run—it must serve a higher, human purpose.
          </p>
          <p className="text-foreground font-medium">
            My ultimate goal is to become an expert AI engineer who designs and implements meaningful, lightweight software that improves lives, unlocks commercial productivity, and directly contributes to Ethiopia's rapid technological development.
          </p>
        </motion.div>
        
        {/* Focus Areas */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-[1.1rem] font-mono text-muted-foreground uppercase tracking-[0.1em] mb-2">
            Problem Solving Horizons
          </h3>
          
          <div className="flex flex-col gap-4">
            {focusAreas.map((area, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="bg-card/40 backdrop-blur-xl border-white/5 shadow-sm transition-all duration-300 hover:bg-card/60 hover:border-primary/20 hover:shadow-[0_8px_30px_-10px_rgba(var(--primary),0.15)] group overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-[#00d2ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-5 flex gap-5 items-start">
                    <div className="text-primary bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-[inset_0_0_10px_rgba(var(--primary),0.1)] group-hover:scale-110 transition-transform duration-500">
                      {area.icon}
                    </div>
                    <div>
                      <h4 className="text-[1.1rem] text-foreground mb-1.5 font-semibold group-hover:text-primary transition-colors duration-300">
                        {area.title}
                      </h4>
                      <p className="text-[0.9rem] text-muted-foreground leading-relaxed font-light">
                        {area.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
