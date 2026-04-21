import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">✍️ BlogSpace</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/new-post">New Post</Link>
            <span className="nav-user">👤 {user.username}</span>
            <button onClick={handleLogout} className="btn-sm">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
