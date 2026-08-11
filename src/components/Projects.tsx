import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, ExternalLink, Github, Loader2 } from 'lucide-react';
import { sanityClient, urlFor } from '../sanity';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

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
    demo: "https://addis-consult-mvp-psi.vercel.app",
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (!loading && !selectedProject && scrollRef.current && containerRef.current) {
      const container = containerRef.current;
      const scrollElement = scrollRef.current;

      const getScrollAmount = () => {
        let scrollWidth = scrollElement.scrollWidth;
        return -(scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(scrollElement, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, [loading, selectedProject, projectsList.length]);

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
    <>
      <section ref={containerRef} id="featured-projects" className="relative h-screen z-10 overflow-hidden flex items-center bg-transparent">
        <div className="absolute top-1/4 left-[10vw] z-20 pointer-events-none">
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-display text-foreground drop-shadow-2xl opacity-80 mix-blend-overlay">
            The Trail
          </h2>
          <p className="text-muted-foreground text-lg max-w-sm italic">
            Scroll to walk through recent works
          </p>
        </div>
        
        <div ref={scrollRef} className="flex gap-[15vw] pl-[40vw] pr-[20vw] items-center h-full w-max">
          {projectsList.map((project) => {
            const coverImage = project.gallery && project.gallery.length > 0 
              ? (typeof project.gallery[0] === 'string' ? project.gallery[0] : urlFor(project.gallery[0]).width(1200).url()) 
              : '';

            return (
              <div 
                key={project._id}
                className="relative group w-[70vw] max-w-[800px] aspect-[4/3] rounded-[3rem] overflow-hidden cursor-pointer bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                onClick={() => setSelectedProject(project)}
              >
                {coverImage && (
                  <img 
                    src={coverImage} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60 transition-all duration-1000 group-hover:mix-blend-normal group-hover:opacity-90 group-hover:scale-105"
                    loading="lazy" 
                    referrerPolicy="no-referrer" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col items-start transform transition-transform duration-500 pointer-events-none">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.badges || []).slice(0, 3).map(badge => (
                      <Badge key={badge} variant="secondary" className="px-4 py-1.5 bg-white/10 text-white font-sans rounded-full border border-white/20 backdrop-blur-md font-light text-xs tracking-wider">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-display text-white mb-3">{project.title}</h3>
                  <p className="text-white/70 leading-relaxed max-w-lg font-light text-lg">
                    {project.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl overflow-y-auto"
            data-lenis-prevent="true"
          >
            <section className="relative min-h-screen py-24 z-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[1200px] mx-auto px-6 w-full"
              >
                <Magnetic>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 bg-white/5 px-6 py-6 rounded-full border border-white/10 cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Return to Trail
                  </Button>
                </Magnetic>
                
                <h1 className="text-5xl md:text-7xl font-display text-foreground mb-6">{selectedProject.title}</h1>
                <p className="text-2xl text-primary mb-12 font-light italic">{selectedProject.tagline}</p>
                
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div className="relative rounded-[3rem] overflow-hidden mb-16 border border-white/10 shadow-2xl">
                    <img 
                      src={typeof selectedProject.gallery[0] === 'string' ? selectedProject.gallery[0] : urlFor(selectedProject.gallery[0]).width(1600).url()} 
                      alt={selectedProject.title} 
                      className="w-full h-[60vh] object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000" 
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-12">
                    <div>
                      <h3 className="text-3xl font-display text-foreground mb-6">The Challenge</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed font-light">{selectedProject.problem}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-display text-foreground mb-6">The Solution</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed font-light">{selectedProject.solution}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8 bg-white/5 p-8 rounded-[2rem] border border-white/10">
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.demo && (
                        <Magnetic>
                          <Button size="lg" render={<a href={selectedProject.demo} target="_blank" rel="noreferrer" />} className="w-full rounded-full h-14 bg-primary/20 text-primary hover:bg-primary/30">
                            <ExternalLink className="w-5 h-5 mr-2" /> Live Demo
                          </Button>
                        </Magnetic>
                      )}
                      {selectedProject.github && (
                        <Magnetic>
                          <Button size="lg" variant="outline" render={<a href={selectedProject.github} target="_blank" rel="noreferrer" />} className="w-full rounded-full h-14 bg-white/5 border-white/10">
                            <Github className="w-5 h-5 mr-2" /> Source Code
                          </Button>
                        </Magnetic>
                      )}
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div>
                      <span className="block text-sm text-muted-foreground uppercase tracking-widest mb-2">Technologies</span>
                      <div className="flex flex-wrap gap-2">
                        {(selectedProject.badges || []).map(badge => (
                          <span key={badge} className="px-3 py-1 bg-white/5 text-foreground/80 text-sm rounded-full border border-white/10">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
