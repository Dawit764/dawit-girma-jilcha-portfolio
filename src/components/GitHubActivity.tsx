import { motion } from 'motion/react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, Users, BookOpen, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

import { useGitHubStats } from '../hooks/useGitHubStats';

export default function GitHubActivity() {
  const { stats, loading } = useGitHubStats('Dawit764');

  const customTheme = {
    dark: ['#1a1a2e', '#0f3a40', '#176b70', '#1e9b9c', '#00f5ff'],
  };

  return (
    <section id="github-activity" className="relative py-24 bg-background z-10 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6 border border-primary/20 shadow-[inset_0_0_10px_rgba(var(--primary),0.1)]">
            <Github className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-bold text-foreground mb-4">
            Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00d2ff]">Contributions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            My daily coding activity and real-time statistics pulled directly from GitHub.
          </p>
        </motion.div>

        {!loading && stats && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: BookOpen, label: "Public Repos", value: stats.public_repos, color: "text-primary" },
              { icon: Users, label: "Followers", value: stats.followers, color: "text-secondary" },
              { icon: Star, label: "Following", value: stats.following, color: "text-accent" },
              { icon: Github, label: "Gists", value: stats.public_gists, color: "text-foreground" }
            ].map((stat, idx) => (
              <Card key={idx} className="bg-card/40 backdrop-blur-xl border-white/5 rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(var(--primary),0.2)] hover:-translate-y-1 group">
                <CardContent className="p-6 text-center flex flex-col items-center">
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-4xl font-display font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="bg-card/60 backdrop-blur-2xl border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] flex flex-col items-start md:items-center overflow-x-auto hide-scrollbar relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none rounded-[2.5rem]" />
            <div className="w-full min-w-[800px] flex justify-start md:justify-center relative z-10 github-calendar-wrapper">
              <GitHubCalendar 
                username="Dawit764" 
                colorScheme="dark"
                theme={customTheme}
                fontSize={14}
                blockSize={14}
                blockMargin={6}
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
