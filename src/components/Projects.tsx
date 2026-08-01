import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, ExternalLink, Github } from 'lucide-react';

const PROJECTS_DATA = {
  "paper-bag": {
    id: "paper-bag",
    title: "Paper Bag Business Website",
    tagline: "Eco-Friendly Packaging Digital Showroom",
    badges: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
    problem: "A sustainable packaging startup in Addis Ababa needed a professional digital platform to showcase their environmentally-friendly paper bags, explain bespoke manufacturing options, and convert wholesale orders efficiently.",
    solution: "Developed a stunning, modern business portal incorporating product visualizers, interactive custom-size configurators, and a optimized layout that showcases paper bag models in high fidelity.",
    designProcess: "Designed using a minimalist, sustainable visual language. I focused on clean off-white elements with green-accented dark boards, generous breathing room, structured specifications grids, and fluid scroll-linked item sizing.",
    features: [
      "Interactive Size Configurator: Allows corporate clients to visualize paper bag dimensions (Small, Medium, Large) dynamically in a real-time responsive visual card.",
      "Eco-Impact Counter: Calculates plastic waste saved based on hypothetical paper bag purchase volume to drive customer conversion.",
      "Wholesale Order Portal: A fully integrated, elegant contact form that collects volume demands and outputs precise spec lists.",
      "Fluid Mobile layout: Optimized to ensure quick rendering on lower-speed regional networks across Ethiopia."
    ],
    challenges: "Managing high-resolution product photographs without affecting page loading times. Solved by designing vector illustration overlays and leveraging modern CSS gradients with tiny compressed PNG sprites.",
    lessons: "I learned how to structure a corporate commercial catalog purely using CSS Grid and clean, lightweight flexboxes, proving that premium design doesn't require heavy bloated libraries.",
    gallery: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=600"
    ],
    github: "https://github.com/Dawit764/zelaqi-pack-ethiopia",
    demo: "https://zelaqi-pack-ethiopia.netlify.app/",
    location: "Addis Ababa, Ethiopia",
    client: "Local Sustainable Packaging Startup",
    duration: "4 Weeks"
  },
  "anniversary": {
    id: "anniversary",
    title: "50th Anniversary Interactive Website",
    tagline: "A Bespoke Digital Family Keepsake",
    badges: ["HTML5", "CSS3", "JavaScript", "Animations", "Storytelling"],
    problem: "A family wanted to celebrate a couple's 50th wedding anniversary by bringing together relatives from around the world to view a timeline of historical photographs, quotes, and memories in a unified interactive digital experience.",
    solution: "Created an immersive, sliding digital memory book that combines warm editorial styling, smooth custom canvas slide effects, curated quotes, and dynamic visual galleries.",
    designProcess: "Inspired by premium digital editorial publications. Emphasized delicate serifs, deep cozy lighting, smooth crossfades, and carefully balanced typography grids that feel respectful and timeless.",
    features: [
      "Infinite Memory Carousel: A hand-coded vanilla JS slideshow system supporting swipe, keyboard navigation, and seamless crossfade transitions.",
      "Milestone Timeline: An interactive chronological path mapping the couple's history from 1976 to 2026, featuring lazy-loaded historical photos.",
      "Interactive Memory Wall: Relatives can write and send greetings (persisted client-side) which display on a beautiful glowing masonry message board.",
      "Atmospheric Soundscapes: Implemented safe, user-triggered HTML5 audio controllers for delicate ambient theme music."
    ],
    challenges: "Achieving seamless transitions on standard smartphone browsers with variable performance levels while managing large image asset arrays.",
    lessons: "Perfected techniques for advanced browser memory management, client-side caching of pre-loaded slider elements, and writing custom touch-gesture detectors in pure vanilla JS.",
    gallery: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600"
    ],
    github: "https://github.com/Dawit764/50th-anniversary-digital-album",
    demo: "https://50-th-anniversary-for-my-grandpa.netlify.app/",
    location: "Global Reach",
    client: "Private Family Commemoration",
    duration: "3 Weeks"
  },
  "addis-consult": {
    id: "addis-consult",
    title: "Addis Consult MVP",
    tagline: "Modern Business Consulting Platform",
    badges: ["React", "Tailwind CSS", "Vite", "Framer Motion", "UI/UX"],
    problem: "A growing consulting firm in Addis Ababa needed a professional, high-performance web presence to attract corporate clients, showcase their services, and streamline client inquiries.",
    solution: "Developed a sleek, conversion-optimized landing page and service showcase MVP. The platform features smooth scroll animations, distinct service tiers, and an integrated consultation booking flow.",
    designProcess: "Adopted a corporate yet modern aesthetic using deep blues and crisp whites. Focused heavily on clear typography and micro-interactions to build trust and authority.",
    features: [
      "Dynamic Service Showcase: Interactive cards detailing various consulting domains (Strategy, Finance, IT).",
      "Lead Generation Form: A streamlined contact interface designed to maximize conversion rates.",
      "Performance Optimized: Built on Vite for lightning-fast load times and seamless navigation.",
      "Responsive Layout: Flawless experience across desktop, tablet, and mobile devices."
    ],
    challenges: "Balancing a highly professional corporate look with modern, engaging web animations without making the site feel overwhelming.",
    lessons: "Refined my ability to build component-driven architectures in React and mastered advanced layout techniques using Tailwind CSS grid and flexbox utilities.",
    gallery: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=600"
    ],
    github: "https://github.com/Dawit764/addis-consult-mvp",
    demo: "https://addis-consult-mvp-psi.vercel.app",
    location: "Addis Ababa, Ethiopia",
    client: "Addis Consult",
    duration: "2 Weeks"
  }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<keyof typeof PROJECTS_DATA | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const projectsList = Object.values(PROJECTS_DATA);
  const activeProject = selectedProject ? PROJECTS_DATA[selectedProject] : null;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || selectedProject) return;

    const handleScroll = () => {
      const center = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childEl = child as HTMLElement;
        const childCenter = childEl.offsetLeft + childEl.clientWidth / 2;
        const distance = Math.abs(childCenter - center);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Small delay to ensure layout is calculated before initial check
    setTimeout(handleScroll, 100);
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [projectsList.length, activeIndex, selectedProject]);

  return (
    <section id="featured-projects" className="relative py-[100px] z-10 min-h-screen flex flex-col justify-center">
      
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="max-w-[1200px] mx-auto px-6 mb-12 text-center">
              <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3">
                03 // Creations
              </div>
              
              <h2 className="text-4xl md:text-[2.5rem] font-bold text-white">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Projects</span>
              </h2>
            </div>
            
            {/* Horizontal Cover Flow Container */}
            <div 
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-[10vw] md:px-[25vw] pb-12 pt-4 scrollbar-hide"
              style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projectsList.map((project, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.div 
                    key={project.id}
                    className={`relative flex-shrink-0 w-[80vw] md:w-[50vw] max-w-[700px] h-[500px] snap-center rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 ease-out border border-white/10 ${isActive ? 'scale-100 opacity-100 shadow-[0_0_50px_rgba(0,245,255,0.15)] z-10' : 'scale-[0.85] opacity-30 hover:opacity-50 z-0'}`}
                    onClick={() => setSelectedProject(project.id as keyof typeof PROJECTS_DATA)}
                  >
                    <img 
                      src={project.gallery[0]} 
                      alt={project.title} 
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100'}`}
                      loading="lazy" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/70 to-transparent" />
                    
                    <div className={`absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col items-center text-center transition-all duration-500 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {project.badges.slice(0, 3).map(badge => (
                          <span key={badge} className="px-3 py-1 bg-[var(--color-primary)]/20 backdrop-blur-md text-[var(--color-primary)] text-xs font-mono rounded-full border border-[var(--color-primary)]/30">
                            {badge}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">{project.title}</h3>
                      <p className="text-[var(--color-text-muted)] leading-relaxed mb-8 line-clamp-2 max-w-lg">
                        {project.tagline}
                      </p>
                      
                      <button 
                        className="inline-flex items-center gap-2 text-[var(--color-background)] font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-8 py-3 rounded-full transition-transform hover:scale-105 shadow-lg shadow-[var(--color-primary)]/20"
                      >
                        Explore Project
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Scroll indicators */}
            <div className="flex justify-center gap-3 mt-4">
              {projectsList.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-[var(--color-primary)]' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-[1200px] mx-auto px-6 w-full"
          >
            <div className="bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-primary)]/20 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
              <button 
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 text-[var(--color-primary)] font-mono text-sm hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Showcase
              </button>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject?.badges.map(badge => (
                  <span key={badge} className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-mono rounded-full border border-[var(--color-primary)]/20">
                    {badge}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">{activeProject?.title}</h1>
              <p className="text-xl md:text-2xl text-[var(--color-primary)] mb-8 font-display">{activeProject?.tagline}</p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <a href={activeProject?.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] hover:shadow-[0_8px_30px_rgba(0,245,255,0.4)] transition-all hover:scale-105">
                  <ExternalLink className="w-5 h-5" /> Launch Live Demo
                </a>
                <a href={activeProject?.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white hover:scale-105">
                  <Github className="w-5 h-5" /> View Source Code
                </a>
              </div>
              
              <img src={activeProject?.gallery[0]} alt={activeProject?.title} className="w-full h-auto rounded-3xl mb-12 border border-white/10 shadow-2xl object-cover max-h-[600px]" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-8 bg-[var(--color-background)]/50 rounded-3xl border border-white/5">
                <div><span className="block text-sm text-[var(--color-text-muted)] mb-1 uppercase tracking-wider font-mono">Client</span><span className="text-white font-medium text-lg">{activeProject?.client}</span></div>
                <div><span className="block text-sm text-[var(--color-text-muted)] mb-1 uppercase tracking-wider font-mono">Duration</span><span className="text-white font-medium text-lg">{activeProject?.duration}</span></div>
                <div><span className="block text-sm text-[var(--color-text-muted)] mb-1 uppercase tracking-wider font-mono">Location</span><span className="text-white font-medium text-lg">{activeProject?.location}</span></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">The Challenge</h3>
                  <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-10">{activeProject?.problem}</p>
                  
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">The Solution</h3>
                  <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">{activeProject?.solution}</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Key Features</h3>
                  <ul className="flex flex-col gap-4">
                    {activeProject?.features.map((feature, i) => (
                      <li key={i} className="flex gap-4 text-[var(--color-text-muted)] text-lg leading-relaxed p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-[var(--color-primary)] shrink-0">▹</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  );
}
