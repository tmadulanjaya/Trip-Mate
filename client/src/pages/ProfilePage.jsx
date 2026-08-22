import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./ProfilePage.css";

export default function ProfilePage({ currentUser }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <section className="profile-page">
      <div className="profile-shell">
        <p className="profile-kicker">Account</p>
        <h1>Your profile</h1>
        <p className="profile-subtitle">Your TripMate details and account controls.</p>
        <div className="profile-card card">
          <div className="profile-avatar avatar avatar-lg">{currentUser.avatar}</div>
          <div className="profile-details">
            <span className="profile-label">Name</span>
            <strong>{currentUser.name}</strong>
            <span className="profile-label">Email</span>
            <strong>{currentUser.email || "No email added"}</strong>
          </div>
          <button type="button" className="btn btn-outline profile-logout" onClick={handleLogout}>Sign out</button>
        </div>
      </div>
    </section>
  );
}