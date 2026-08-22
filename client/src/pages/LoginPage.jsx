import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) { setError("Enter a valid email address."); return; }
    // TODO: replace with real API call
    localStorage.setItem("tripmate_token", "mock-token");
    login({ id: "u1", name: "Pasindu", avatar: "P", email: form.email });
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <section className="auth-intro" aria-label="TripMate benefits">
        <p className="auth-kicker">Your trips, together</p>
        <h2>Make the plan. Keep the memories.</h2>
        <p>Bring every detail of your next adventure into one calm, shared space.</p>
        <ul className="auth-points"><li>Plan itineraries with your group</li><li>Track shared expenses effortlessly</li><li>Keep every decision in one place</li></ul>
      </section>
      <div className="auth-card card">
        <div className="auth-logo">✈️ TripMate</div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to continue planning.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com"
              id="login-email" autoComplete="email" required
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input className="form-input" type="password" placeholder="••••••••"
              id="login-password" autoComplete="current-password" required
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Sign in
          </button>
        </form>

        <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  );
}
