import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ currentUser }) {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isAuthPage = ["/login", "/register", "/signup"].includes(location.pathname);

  return (
    <nav className={`navbar ${isLanding ? "navbar-transparent" : ""} ${isAuthPage ? "navbar-auth" : ""}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
  <svg 
    className="logo-icon" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#2dd4bf" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" stroke="#0f766e" strokeWidth="2" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#2dd4bf" />
  </svg>
  <span className="logo-text">TripMate</span>
</Link>

        <div className="navbar-links">
          {isAuthPage ? null : currentUser ? (
            <>
              <Link to="/dashboard" className="nav-link">My Trips</Link>
              <Link to="/trips/new" className="btn btn-primary btn-sm">+ New Trip</Link>
              <Link to="/profile" className="nav-user" aria-label="Open your profile">
                <div className="avatar avatar-sm">{currentUser.avatar}</div>
                <span className="nav-username">{currentUser.name}</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-user nav-user-guest" aria-label="Sign in to your account">
                <div className="avatar avatar-sm avatar-guest">?</div>
              </Link>
              <Link to="/login" className="nav-link">Sign in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
