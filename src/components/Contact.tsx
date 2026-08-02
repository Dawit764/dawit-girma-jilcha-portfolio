import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Phone, Send } from 'lucide-react';

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
      <div className="font-mono text-[0.8rem] text-[var(--color-primary)] uppercase tracking-[0.2em] mb-3">
        07 // Connections
      </div>
      
      <h2 className="text-4xl md:text-[2.5rem] font-bold text-white mb-12">
        Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Something</span>
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Info Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
          <p className="text-[var(--color-text-muted)] text-[1.05rem] leading-relaxed mb-10 max-w-[480px]">
            I am always eager to hear about internship opportunities, commercial collaborations, open-source projects, and technical innovations. Let's form a partnership!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                target={link.href.startsWith('http') ? "_blank" : undefined}
                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)]/45 border border-white/5 hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary)]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                  {link.icon}
                </div>
                <div>
                  <span className="block text-[0.8rem] text-[var(--color-text-muted)] font-mono uppercase tracking-wider mb-0.5">{link.label}</span>
                  <span className="block text-[0.95rem] text-white font-medium truncate max-w-[150px]">{link.val}</span>
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[var(--color-surface)] border border-[var(--color-primary)]/10 p-5 sm:p-8 rounded-2xl shadow-xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-white/80">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="Dawit Girma"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-primary)] focus:bg-[var(--color-primary)]/5 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="recruiter@company.com"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-primary)] focus:bg-[var(--color-primary)]/5 transition-colors"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-medium text-white/80">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Summer Internship Opportunity"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-primary)] focus:bg-[var(--color-primary)]/5 transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-white/80">Message *</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                required
                placeholder="Hi Dawit, we would love to schedule a technical chat..."
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-primary)] focus:bg-[var(--color-primary)]/5 transition-colors resize-y min-h-[120px]"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={formStatus === 'submitting'}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] font-semibold px-6 py-3.5 rounded-lg transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 w-full sm:w-auto"
            >
              {formStatus === 'submitting' ? (
                <>Sending...</>
              ) : formStatus === 'success' ? (
                <>Message Sent!</>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
            
            {formStatus === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
