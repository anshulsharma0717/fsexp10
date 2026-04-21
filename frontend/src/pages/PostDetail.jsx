import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../AuthContext';

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/posts/${id}`).then(({ data }) => setPost(data));
    api.get(`/comments/${id}`).then(({ data }) => setComments(data));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    await api.delete(`/posts/${id}`);
    navigate('/');
  };

  const handleComment = async e => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const { data } = await api.post(`/comments/${id}`, { content: commentText });
      setComments([data, ...comments]);
      setCommentText('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment');
    }
  };

  const handleDeleteComment = async (cid) => {
    await api.delete(`/comments/${cid}`);
    setComments(comments.filter(c => c._id !== cid));
  };

  if (!post) return <div className="center">Loading...</div>;

  return (
    <div className="container post-detail">
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>✍️ {post.author?.username}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {post.tags?.length > 0 && (
          <div className="tags">{post.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
        )}
        {user?.id === post.author?._id && (
          <div className="post-actions">
            <button className="btn-sm" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
            <button className="btn-sm danger" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>

      <div className="post-body">{post.content}</div>

      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        {user ? (
          <form onSubmit={handleComment} className="comment-form">
            <textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn">Post Comment</button>
          </form>
        ) : (
          <p><a href="/login">Login</a> to leave a comment.</p>
        )}

        <div className="comments-list">
          {comments.map(c => (
            <div key={c._id} className="comment-card">
              <div className="comment-meta">
                <strong>{c.author?.username}</strong>
                <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                {user?.id === c.author?._id && (
                  <button className="btn-xs danger" onClick={() => handleDeleteComment(c._id)}>✕</button>
                )}
              </div>
              <p>{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
