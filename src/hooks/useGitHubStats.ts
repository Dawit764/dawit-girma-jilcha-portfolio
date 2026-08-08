import { useState, useEffect, useRef } from 'react';

export interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Prevent double-fetching in React 18 strict mode
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    let isMounted = true;
    const CACHE_KEY = `github_stats_${username}`;
    const CACHE_TIME_KEY = `github_stats_time_${username}`;
    const CACHE_DURATION = 3600000; // 1 hour

    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

    if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_DURATION) {
      if (isMounted) {
        setStats(JSON.parse(cachedData));
        setLoading(false);
      }
      return;
    }

    const fetchStats = async () => {
      try {
        // Try the serverless function first (handles authentication and private repos)
        const res = await fetch('/api/github-stats');
        if (!res.ok) throw new Error('Serverless function not available');
        
        const data = await res.json();
        const newStats: GitHubStats = {
          followers: data.followers || 0,
          following: data.following || 0,
          public_repos: data.public_repos || 0,
          public_gists: data.public_gists || 0,
        };
        
        if (isMounted) {
          setStats(newStats);
          setLoading(false);
        }
        
        localStorage.setItem(CACHE_KEY, JSON.stringify(newStats));
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        
      } catch (err) {
        console.warn("Falling back to public GitHub API", err);
        
        try {
          // Fallback to public GitHub API (rate-limited, no private repos)
          const fallbackRes = await fetch(`https://api.github.com/users/${username}`);
          const fallbackData = await fallbackRes.json();
          
          if (fallbackData.message && fallbackData.message.includes("API rate limit exceeded")) {
            throw new Error("GitHub API rate limit exceeded.");
          }
          
          const newStats: GitHubStats = {
            followers: fallbackData.followers || 0,
            following: fallbackData.following || 0,
            public_repos: fallbackData.public_repos || 0,
            public_gists: fallbackData.public_gists || 0,
          };
          
          if (isMounted) {
            setStats(newStats);
            setLoading(false);
          }
          
          localStorage.setItem(CACHE_KEY, JSON.stringify(newStats));
          localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
          
        } catch (fallbackErr: any) {
          console.error("Failed to fetch GitHub stats from both endpoints", fallbackErr);
          if (isMounted) {
            setError(fallbackErr);
            setLoading(false);
          }
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { stats, loading, error };
}
