import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts').then(({ data }) => { setPosts(data); setLoading(false); });
  }, []);

  if (loading) return <div className="center">Loading posts...</div>;

  return (
    <div className="container">
      <h2 className="page-title">Latest Posts</h2>
      {posts.length === 0 && <p className="center">No posts yet. Be the first to write one!</p>}
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
    </div>
  );
}
