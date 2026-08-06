import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Phone, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Add Web3Forms access key
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
      icon: <Phone className="w-5 h-5" />,
      label: "Cellular Call",
      val: "+251936125929",
      href: "tel:+251936125929"
    }
  ];

  return (
    <section id="contact" className="relative py-[100px] max-w-[1200px] mx-auto px-6 z-10">
      <div className="font-mono text-[0.8rem] text-primary uppercase tracking-[0.2em] mb-3">
        07 // Connections
      </div>
      
      <h2 className="text-4xl md:text-[2.5rem] font-bold text-foreground mb-16">
        Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff]">Something</span>
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24">
        
        {/* Info Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
          <p className="text-muted-foreground text-[1.05rem] leading-relaxed mb-12 max-w-[480px] font-light">
            I am always eager to hear about internship opportunities, commercial collaborations, open-source projects, and technical innovations. Let's form a partnership!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                target={link.href.startsWith('http') ? "_blank" : undefined}
                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-4 p-6 rounded-3xl bg-card/40 backdrop-blur-xl border border-white/5 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(var(--primary),0.15)]"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-[inset_0_0_10px_rgba(var(--primary),0.1)]">
                  {link.icon}
                </div>
                <div>
                  <span className="block text-[0.75rem] text-muted-foreground font-mono uppercase tracking-widest mb-1.5">{link.label}</span>
                  <span className="block text-[0.95rem] text-foreground font-medium truncate max-w-full">{link.val}</span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
        
        {/* Form Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="bg-card/60 backdrop-blur-2xl border-white/10 p-2 md:p-4 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/80 pl-1">Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="Dawit Girma"
                      className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80 pl-1">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder="recruiter@company.com"
                      className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground/80 pl-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="Summer Internship Opportunity"
                    className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                  />
                </div>
                
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/80 pl-1">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required
                    placeholder="Hi Dawit, we would love to schedule a technical chat..."
                    className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-y min-h-[140px] shadow-inner"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={formStatus === 'submitting'}
                  className="mt-4 rounded-full h-14 bg-gradient-to-r from-primary to-[#00d2ff] text-primary-foreground font-bold text-[1.05rem] shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/40 active:scale-[0.98]"
                >
                  {formStatus === 'submitting' ? (
                    <>Sending...</>
                  ) : formStatus === 'success' ? (
                    <>Message Sent!</>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
                
                {formStatus === 'error' && (
                  <p className="text-red-400 text-sm mt-2 text-center">{errorMessage}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
