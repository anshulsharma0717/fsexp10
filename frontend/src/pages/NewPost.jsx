import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function NewPost() {
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        content: form.content,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      const { data } = await api.post('/posts', payload);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>New Post</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea placeholder="Write your post..." rows={10} required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
          <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          <button type="submit" className="btn">Publish</button>
        </form>
      </div>
    </div>
  );
}
