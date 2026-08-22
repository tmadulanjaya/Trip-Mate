import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ currentUser }) {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav className={`navbar ${isLanding ? "navbar-transparent" : ""}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✈️</span>
          <span className="logo-text">TripMate</span>
        </Link>

        <div className="navbar-links">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="nav-link">My Trips</Link>
              <Link to="/trips/new" className="btn btn-primary btn-sm">+ New Trip</Link>
              <div className="nav-user">
                <div className="avatar avatar-sm">{currentUser.avatar}</div>
                <span className="nav-username">{currentUser.name}</span>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Sign in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
