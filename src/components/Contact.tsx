import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Phone, Send, Calendar } from 'lucide-react';
import { PopupModal } from 'react-calendly';
import Magnetic from './ui/Magnetic';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    data.access_key = "662245c4-f272-4ae8-b71c-8073505a1c16";
    data.from_name = data.name;
    data.replyto = data.email;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        throw new Error(result.message || "Submission failed.");
      }
    } catch (error: any) {
      console.error(error);
      setFormStatus('error');
      setErrorMessage(error.message || "Something went wrong.");
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  const contactLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Direct Email",
      val: "girmadawit612@gmail.com",
      href: "mailto:girmadawit612@gmail.com"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      val: "Dawit Girma Jilcha",
      href: "https://www.linkedin.com/in/dawit-girma-6b497537b"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      val: "github.com/Dawit764",
      href: "https://github.com/Dawit764"
    },
    {
      icon: <Send className="w-5 h-5" />,
      label: "Telegram",
      val: "Dave_girma",
      href: "https://t.me/Dave_girma"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Cellular",
      val: "+251936125929",
      href: "tel:+251936125929"
    }
  ];

  return (
    <>
    <section id="contact" className="relative py-32 max-w-[1200px] mx-auto px-6 z-10">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24"
      >
        <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary/80 text-xs tracking-widest uppercase mb-6">
          Connections
        </div>
        <h2 className="text-4xl md:text-5xl font-display text-foreground">
          Let's Form A Partnership
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Info Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col h-full"
        >
          <p className="text-muted-foreground/80 text-lg leading-[1.8] mb-12 max-w-[480px] font-light">
            I am always eager to hear about internship opportunities, commercial collaborations, open-source projects, and technical innovations. Let's build something natural.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactLinks.map((link, idx) => (
              <Magnetic key={idx}>
                <a 
                  href={link.href}
                  target={link.href.startsWith('http') || link.href.startsWith('mailto') || link.href.startsWith('tel') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center justify-center text-center p-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-700 hover:scale-105"
                >
                  <div className="w-12 h-12 rounded-full bg-black/20 text-primary/70 flex items-center justify-center mb-4 group-hover:text-primary transition-colors duration-500 border border-white/5">
                    {link.icon}
                  </div>
                  <div>
                    <span className="block text-[0.65rem] text-muted-foreground/60 font-mono uppercase tracking-widest mb-2">{link.label}</span>
                    <span className="block text-sm text-foreground/80 font-light truncate max-w-[150px]">{link.val}</span>
                  </div>
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="mt-12 flex justify-center sm:justify-start">
            <Magnetic>
              <button 
                onClick={() => setIsCalendlyOpen(true)}
                className="w-full sm:w-auto px-8 rounded-full h-14 bg-primary text-primary-foreground font-medium text-sm transition-all hover:bg-primary/90 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 duration-500"
              >
                <Calendar className="w-5 h-5" />
                Book a Meeting on Calendly
              </button>
            </Magnetic>
          </div>
        </motion.div>
        
        {/* Form Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-[3.5rem]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 pl-4">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Dawit Girma"
                    className="bg-black/20 border border-white/10 rounded-full px-6 py-4 text-foreground/90 placeholder:text-muted-foreground/30 font-light focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all w-full"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 pl-4">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="hello@earth.com"
                    className="bg-black/20 border border-white/10 rounded-full px-6 py-4 text-foreground/90 placeholder:text-muted-foreground/30 font-light focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all w-full"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <label htmlFor="subject" className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 pl-4">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="Collaboration Opportunity"
                  className="bg-black/20 border border-white/10 rounded-full px-6 py-4 text-foreground/90 placeholder:text-muted-foreground/30 font-light focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all w-full"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 pl-4">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  required
                  placeholder="How can we work together?"
                  className="bg-black/20 border border-white/10 rounded-[2rem] px-6 py-5 text-foreground/90 placeholder:text-muted-foreground/30 font-light focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all resize-none w-full"
                />
              </div>
              
              <Magnetic>
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full mt-2 rounded-full h-16 bg-white/10 border border-white/20 text-foreground/90 font-light text-lg transition-all duration-500 hover:bg-white/20 flex items-center justify-center disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : formStatus === 'success' ? (
                    <span className="text-primary">Message Sent</span>
                  ) : (
                    <>
                      Transmit
                      <Send className="w-5 h-5 ml-3 opacity-60" />
                    </>
                  )}
                </button>
              </Magnetic>
              
              {formStatus === 'error' && (
                <p className="text-red-400/80 text-sm mt-2 text-center font-light">{errorMessage}</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>

      {/* Calendly Modal */}
      <PopupModal
        url="https://calendly.com/dave1212gir/30min"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById("root")!}
      />
    </>
  );
}
