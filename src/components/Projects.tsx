import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, ExternalLink, Github, Loader2 } from 'lucide-react';
import { sanityClient, urlFor } from '../sanity';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Project {
  _id: string;
  id?: string;
  title: string;
  tagline: string;
  badges: string[];
  problem: string;
  solution: string;
  designProcess?: string;
  features: string[];
  challenges: string;
  lessons: string;
  gallery: any[];
  github: string;
  demo: string;
  location: string;
  client: string;
  duration: string;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "addis-consult-mvp",
    id: "addis-consult-mvp",
    title: "Corporate Consultancy Portal",
    tagline: "Modern Business Advisory Platform",
    badges: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "i18n"],
    problem: "A consultancy firm in Addis Ababa required a premium digital presence to attract corporate clients, showcase their expertise across various sectors, and provide interactive business tools.",
    solution: "Developed a high-performance, multi-lingual web application using Next.js, featuring interactive market dashboards, a corporate tax estimator, and elegant animations to establish trust and authority.",
    designProcess: "Adopted a premium corporate aesthetic focusing on a crisp blue and white color palette, subtle glassmorphism layers, modern typography, and fluid micro-animations to create a highly professional user experience.",
    features: [
      "Live Market Dashboard: A server-rendered widget fetching real-time global currency exchange rates, beautifully animated with Framer Motion.",
      "Interactive Tax Estimator: A dynamic, client-side calculator that instantly estimates corporate tax obligations based on Ethiopian profit brackets.",
      "Multi-lingual Architecture: Fully integrated routing and translations (English/Amharic) using next-intl for localized accessibility.",
      "Optimized Performance: Leveraged Next.js Server Components and strict caching strategies to ensure lightning-fast page loads."
    ],
    challenges: "Navigating strict TypeScript requirements in the latest Next.js and Vercel AI SDK environments, as well as managing complex Framer Motion variant typings for animated components. Solved by explicitly typing animation variants and refactoring data-fetching architectures.",
    lessons: "Deepened expertise in Next.js Server Components, managing strict TypeScript configurations in a modern React ecosystem, and delivering premium UI/UX without sacrificing performance.",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600"
    ],
    github: "https://github.com/Dawit764/addis-consult-mvp",
    demo: "https://addis-consult-mvp.vercel.app/",
    location: "Addis Ababa, Ethiopia",
    client: "Consultancy Firm",
    duration: "2 Weeks"
  },
  {
    _id: "paper-bag",
    id: "paper-bag",
    title: "Paper Bag Business Website",
    tagline: "Eco-Friendly Packaging Digital Showroom",
    badges: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
    problem: "A sustainable packaging startup in Addis Ababa needed a professional digital platform to showcase their environmentally-friendly paper bags, explain bespoke manufacturing options, and convert wholesale orders efficiently.",
    solution: "Developed a stunning, modern business portal incorporating product visualizers, interactive custom-size configurators, and a optimized layout that showcases paper bag models in high fidelity.",
    designProcess: "Designed using a minimalist, sustainable visual language. I focused on clean off-white elements with green-accented dark boards, generous breathing room, structured specifications grids, and fluid scroll-linked item sizing.",
    features: [
      "Interactive Size Configurator: Allows corporate clients to visualize paper bag dimensions dynamically in a real-time responsive visual card.",
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
  }
];

export default function Projects() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "project" && !(_id in path("drafts.**"))] | order(order asc)`)
      .then((data) => {
        if (data && data.length > 0) {
          setProjectsList(data);
        } else {
          setProjectsList(FALLBACK_PROJECTS);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setProjectsList(FALLBACK_PROJECTS);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || selectedProject || projectsList.length === 0) return;

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
    setTimeout(handleScroll, 100);
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [projectsList.length, activeIndex, selectedProject]);

  if (loading) {
    return (
      <section id="featured-projects" className="relative py-[100px] flex justify-center items-center h-screen z-10">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </section>
    );
  }

  if (projectsList.length === 0) {
    return (
      <section id="featured-projects" className="relative py-[100px] flex flex-col justify-center items-center h-[50vh] z-10">
        <h2 className="text-3xl font-bold text-foreground mb-4">Featured Projects</h2>
        <p className="text-muted-foreground">Check back soon for updates!</p>
      </section>
    );
  }

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
              <div className="font-mono text-[0.8rem] text-primary uppercase tracking-[0.2em] mb-3">
                03 // Creations
              </div>
              
              <h2 className="text-4xl md:text-[2.5rem] font-bold text-foreground">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff]">Projects</span>
              </h2>
            </div>
            
            {/* Horizontal Cover Flow Container */}
            <div 
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-[10vw] md:px-[25vw] pb-12 pt-4 hide-scrollbar"
              style={{ scrollBehavior: 'smooth' }}
            >
              {projectsList.map((project, idx) => {
                const isActive = idx === activeIndex;
                const coverImage = project.gallery && project.gallery.length > 0 
                  ? (typeof project.gallery[0] === 'string' ? project.gallery[0] : urlFor(project.gallery[0]).width(800).url()) 
                  : '';

                return (
                  <motion.div 
                    key={project._id}
                    className={`relative flex-shrink-0 w-[85vw] sm:w-[80vw] md:w-[50vw] max-w-[700px] h-[420px] md:h-[500px] snap-center rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 ease-out border border-white/5 ${isActive ? 'scale-100 opacity-100 shadow-[0_30px_60px_-15px_rgba(var(--primary),0.2)] z-10' : 'scale-[0.85] opacity-30 hover:opacity-50 z-0'}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    {coverImage && (
                      <img 
                        src={coverImage} 
                        alt={project.title} 
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100'}`}
                        loading="lazy" 
                        referrerPolicy="no-referrer" 
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    
                    <div className={`absolute inset-x-0 bottom-0 p-6 md:p-12 flex flex-col items-center text-center transition-all duration-500 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {(project.badges || []).slice(0, 3).map(badge => (
                          <Badge key={badge} variant="secondary" className="px-3 py-1 bg-primary/20 hover:bg-primary/30 backdrop-blur-md text-primary font-mono border border-primary/30 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 drop-shadow-lg">{project.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-2 max-w-lg font-light">
                        {project.tagline}
                      </p>
                      
                      <Button 
                        className="rounded-full px-8 py-6 bg-gradient-to-r from-primary to-[#00d2ff] text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-primary/40 active:scale-[0.98]"
                      >
                        Explore Project
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
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
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out ${idx === activeIndex ? 'w-8 bg-primary shadow-[0_0_10px_var(--primary)]' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1200px] mx-auto px-6 w-full"
          >
            <Card className="bg-card/80 backdrop-blur-2xl border-white/10 rounded-[3rem] p-6 md:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 text-primary font-mono text-sm hover:text-foreground transition-colors mb-8 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 active:scale-[0.95]"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Showcase
              </Button>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {(selectedProject.badges || []).map(badge => (
                  <Badge key={badge} variant="outline" className="px-3 py-1 bg-primary/5 text-primary text-xs font-mono rounded-full border-primary/20 backdrop-blur-md">
                    {badge}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 tracking-tight">{selectedProject.title}</h1>
              <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff] mb-8 font-display">{selectedProject.tagline}</p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                {selectedProject.demo && (
                  <Button size="lg" render={<a href={selectedProject.demo} target="_blank" rel="noreferrer" />} className="rounded-full px-8 h-14 font-bold bg-gradient-to-br from-primary to-[#00d2ff] text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 active:scale-[0.98]">
                    <ExternalLink className="w-5 h-5 mr-2" /> Launch Live Demo
                  </Button>
                )}
                {selectedProject.github && (
                  <Button size="lg" variant="outline" render={<a href={selectedProject.github} target="_blank" rel="noreferrer" />} className="rounded-full px-8 h-14 font-bold bg-white/5 border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-[0.98] backdrop-blur-md">
                    <Github className="w-5 h-5 mr-2" /> View Source Code
                  </Button>
                )}
              </div>
              
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="relative group rounded-[2rem] overflow-hidden mb-12 border border-white/10 shadow-2xl">
                  <img 
                    src={typeof selectedProject.gallery[0] === 'string' ? selectedProject.gallery[0] : urlFor(selectedProject.gallery[0]).width(1200).url()} 
                    alt={selectedProject.title} 
                    className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none rounded-[2rem]" />
                </div>
              )}
              
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-8 bg-background/40 rounded-3xl border border-white/5 backdrop-blur-lg">
                {selectedProject.client && <div><span className="block text-sm text-muted-foreground mb-1 uppercase tracking-wider font-mono">Client</span><span className="text-foreground font-medium text-lg">{selectedProject.client}</span></div>}
                {selectedProject.duration && <div><span className="block text-sm text-muted-foreground mb-1 uppercase tracking-wider font-mono">Duration</span><span className="text-foreground font-medium text-lg">{selectedProject.duration}</span></div>}
                {selectedProject.location && <div><span className="block text-sm text-muted-foreground mb-1 uppercase tracking-wider font-mono">Location</span><span className="text-foreground font-medium text-lg">{selectedProject.location}</span></div>}
              </CardContent>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-2">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">The Challenge</h3>
                  <Separator className="bg-white/10 mb-6" />
                  <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light">{selectedProject.problem}</p>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">The Solution</h3>
                  <Separator className="bg-white/10 mb-6" />
                  <p className="text-muted-foreground text-lg leading-relaxed font-light">{selectedProject.solution}</p>
                </div>
                
                <div>
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <>
                      <h3 className="text-2xl font-bold text-foreground mb-4">Key Features</h3>
                      <Separator className="bg-white/10 mb-6" />
                      <ul className="flex flex-col gap-4">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex gap-4 text-muted-foreground text-lg leading-relaxed p-5 bg-background/40 rounded-2xl border border-white/5 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20">
                            <span className="text-primary shrink-0 mt-1"><ChevronRight className="w-5 h-5" /></span>
                            <span className="font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
              
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  );
}
