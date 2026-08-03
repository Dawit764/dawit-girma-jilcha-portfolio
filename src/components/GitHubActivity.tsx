import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, Users, BookOpen, Star } from 'lucide-react';

interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

export default function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = localStorage.getItem('github_stats');
    const cachedTime = localStorage.getItem('github_stats_time');
    
    // Check if we have cached data that is less than 1 hour old
    if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < 3600000) {
      setStats(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        // Try to fetch from our serverless function first (works in production/Vercel)
        const res = await fetch('/api/github-stats');
        if (!res.ok) throw new Error('Serverless function not available');
        
        const data = await res.json();
        
        const newStats = {
          followers: data.followers || 0,
          following: data.following || 0,
          public_repos: data.public_repos || 0, // Serverless API already handles private repo math
          public_gists: data.public_gists || 0,
        };
        
        setStats(newStats);
        localStorage.setItem('github_stats', JSON.stringify(newStats));
        localStorage.setItem('github_stats_time', Date.now().toString());
        setLoading(false);
      } catch (err) {
        console.warn("Falling back to public GitHub API", err);
        // Fallback to public GitHub API if serverless function fails or isn't available locally
        fetch('https://api.github.com/users/Dawit764')
          .then((res) => res.json())
          .then((data) => {
            if (data.message && data.message.includes("API rate limit exceeded")) {
              console.warn("GitHub API rate limit exceeded. Showing placeholder or cached data.");
              setLoading(false);
              return;
            }
            
            // Offset to account for private repositories not returned by the public API
            const PRIVATE_REPOS_COUNT = 1;

            const newStats = {
              followers: data.followers || 0,
              following: data.following || 0,
              public_repos: (data.public_repos || 0) + PRIVATE_REPOS_COUNT,
              public_gists: data.public_gists || 0,
            };
            
            setStats(newStats);
            localStorage.setItem('github_stats', JSON.stringify(newStats));
            localStorage.setItem('github_stats_time', Date.now().toString());
            setLoading(false);
          })
          .catch((fallbackErr) => {
            console.error("Failed to fetch GitHub stats", fallbackErr);
            setLoading(false);
          });
      }
    };

    fetchStats();
  }, []);

  // Custom theme using the portfolio's cyan primary color
  const customTheme = {
    dark: ['#1a1a2e', '#0f3a40', '#176b70', '#1e9b9c', '#00f5ff'],
  };

  return (
    <section id="github-activity" className="relative py-24 bg-[var(--color-background)] z-10 overflow-hidden border-t border-[var(--color-primary)]/10">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-[var(--color-primary)]/10 rounded-2xl mb-6 border border-[var(--color-primary)]/20">
            <Github className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-bold text-white mb-4">
            Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">Contributions</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">
            My daily coding activity and real-time statistics pulled directly from GitHub.
          </p>
        </motion.div>

        {/* Live Stats Row */}
        {!loading && stats && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            <div className="bg-[var(--color-surface)] border border-[var(--color-primary)]/10 rounded-2xl p-6 text-center shadow-lg hover:border-[var(--color-primary)]/30 transition-colors">
              <BookOpen className="w-6 h-6 text-[var(--color-primary)] mx-auto mb-3" />
              <div className="text-3xl font-display font-bold text-white mb-1">{stats.public_repos}</div>
              <div className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">Public Repos</div>
            </div>
            
            <div className="bg-[var(--color-surface)] border border-[var(--color-primary)]/10 rounded-2xl p-6 text-center shadow-lg hover:border-[var(--color-primary)]/30 transition-colors">
              <Users className="w-6 h-6 text-[var(--color-secondary)] mx-auto mb-3" />
              <div className="text-3xl font-display font-bold text-white mb-1">{stats.followers}</div>
              <div className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">Followers</div>
            </div>
            
            <div className="bg-[var(--color-surface)] border border-[var(--color-primary)]/10 rounded-2xl p-6 text-center shadow-lg hover:border-[var(--color-primary)]/30 transition-colors">
              <Star className="w-6 h-6 text-[var(--color-accent)] mx-auto mb-3" />
              <div className="text-3xl font-display font-bold text-white mb-1">{stats.following}</div>
              <div className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">Following</div>
            </div>
            
            <div className="bg-[var(--color-surface)] border border-[var(--color-primary)]/10 rounded-2xl p-6 text-center shadow-lg hover:border-[var(--color-primary)]/30 transition-colors">
              <Github className="w-6 h-6 text-white mx-auto mb-3" />
              <div className="text-3xl font-display font-bold text-white mb-1">{stats.public_gists}</div>
              <div className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">Gists</div>
            </div>
          </motion.div>
        )}

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[var(--color-surface)] border border-[var(--color-primary)]/15 rounded-3xl p-4 sm:p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col items-start md:items-center overflow-x-auto hide-scrollbar"
        >
          <div className="w-full min-w-[800px] flex justify-start md:justify-center">
            <GitHubCalendar 
              username="Dawit764" 
              colorScheme="dark"
              theme={customTheme}
              fontSize={14}
              blockSize={14}
              blockMargin={6}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
