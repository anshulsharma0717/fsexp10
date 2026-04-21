import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/posts')
      .then(({ data }) => setPosts(data))
      .catch(() => setError('Backend offline — posts unavailable.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero — always visible, no API needed */}
      <div className="hero-section">
        <h1>Welcome to <span className="accent">BlogSpace</span></h1>
        <p>Read, write and share stories with the world.</p>
        <div className="hero-btns">
          <Link to="/register" className="btn-hero">Get Started</Link>
          <Link to="/login" className="btn-hero outline">Login</Link>
        </div>
      </div>

      {/* Posts */}
      <div className="container">
        <h2 className="page-title">Latest Posts</h2>

        {loading && (
          <div className="posts-grid">
            {[1,2,3].map(i => <div key={i} className="post-card skeleton" />)}
          </div>
        )}

        {!loading && error && (
          <div className="offline-box">
            <span>⚠️</span>
            <p>{error}</p>
            <small>Deploy the backend on Render and set <code>VITE_API_URL</code> in Netlify.</small>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="center">No posts yet. <Link to="/new-post" style={{color:'#38bdf8'}}>Write the first one!</Link></p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="posts-grid">
            {posts.map(post => (
              <Link to={`/posts/${post._id}`} key={post._id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-excerpt">{post.content.slice(0, 120)}...</p>
                <div className="post-meta">
                  <span>✍️ {post.author?.username}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                {post.tags?.length > 0 && (
                  <div className="tags">
                    {post.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
