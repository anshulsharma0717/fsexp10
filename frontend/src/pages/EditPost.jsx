import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`).then(({ data }) => {
      setForm({ title: data.title, content: data.content, tags: data.tags?.join(', ') || '' });
    });
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        content: form.content,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      await api.put(`/posts/${id}`, payload);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Edit Post</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea placeholder="Content" rows={10} required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
          <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          <button type="submit" className="btn">Update</button>
        </form>
      </div>
    </div>
  );
}
