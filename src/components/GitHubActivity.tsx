import { motion } from 'motion/react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, Users, BookOpen, Star } from 'lucide-react';
import { useGitHubStats } from '../hooks/useGitHubStats';

export default function GitHubActivity() {
  const { stats, loading } = useGitHubStats('Dawit764');

  // Earthy, moss green color scheme for the calendar
  const customTheme = {
    dark: ['#1c201d', '#284033', '#396b51', '#4ba474', '#59d992'],
  };

  return (
    <section id="github-activity" className="relative py-32 z-10">
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary/80 text-xs tracking-widest uppercase mb-6">
            Open Source
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-foreground">
            Activity Trace
          </h2>
        </motion.div>

        {!loading && stats && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-8 mb-20"
          >
            {[
              { icon: BookOpen, label: "Public Repos", value: stats.public_repos },
              { icon: Users, label: "Followers", value: stats.followers },
              { icon: Star, label: "Following", value: stats.following },
              { icon: Github, label: "Gists", value: stats.public_gists }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-full w-40 h-40 transition-transform duration-500 hover:scale-105 hover:bg-white/10">
                <stat.icon className="w-6 h-6 text-primary/70 mb-3" />
                <div className="text-3xl font-display text-foreground/90">{stat.value}</div>
                <div className="text-[0.65rem] text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-[3rem] p-10 md:p-16 flex flex-col items-center overflow-x-auto hide-scrollbar">
            <div className="w-full min-w-[800px] flex justify-center relative z-10 github-calendar-wrapper opacity-90 mix-blend-screen">
              <GitHubCalendar 
                username="Dawit764" 
                colorScheme="dark"
                theme={customTheme}
                fontSize={14}
                blockSize={16}
                blockMargin={8}
                blockRadius={4}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
