export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const username = 'Dawit764';
  
  // Set caching headers: cache at edge for 1 hour (3600s), 
  // allow serving stale content for up to 12 hours (43200s) while revalidating
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=43200');

  try {
    const headers = {
      'User-Agent': 'Portfolio-Dashboard',
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const endpoint = token 
      ? 'https://api.github.com/user' 
      : `https://api.github.com/users/${username}`;
    
    const response = await fetch(endpoint, { headers });
    
    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ 
        error: `GitHub API error: ${response.statusText}` 
      });
    }
    
    const data = await response.json();
    
    // Add total_private_repos if authenticated, to reflect accurately
    const privateRepos = data.total_private_repos || 0;
    const totalRepos = (data.public_repos || 0) + privateRepos;

    res.status(200).json({
      followers: data.followers || 0,
      following: data.following || 0,
      public_repos: totalRepos, 
      public_gists: data.public_gists || 0,
      is_authenticated: !!token
    });
  } catch (error) {
    console.error('Error in github-stats serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
