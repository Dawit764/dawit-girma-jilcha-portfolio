export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const username = 'Dawit764';
  
  try {
    const headers = {
      'User-Agent': 'Portfolio-Dashboard',
      'Accept': 'application/vnd.github.v3+json',
    };
    
    // Add token if it exists in the environment variables
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // If a token is provided, calling /user gives us the authenticated user's details, 
    // including their private repositories (if the token has the correct scopes).
    // Otherwise, we fallback to the public /users/:username endpoint.
    const endpoint = token ? 'https://api.github.com/user' : `https://api.github.com/users/${username}`;
    
    const response = await fetch(endpoint, { headers });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: `GitHub API error: ${response.statusText}` });
    }
    
    const data = await response.json();
    
    // If authenticated, we can access total_private_repos
    // We add this to public_repos to get the accurate total count.
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
