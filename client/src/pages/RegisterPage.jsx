import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    // TODO: replace with real API call
    localStorage.setItem("tripmate_token", "mock-token");
    login({ id: "u1", name: form.name, avatar: form.name.charAt(0).toUpperCase(), email: form.email });
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <section className="auth-intro" aria-label="TripMate benefits">
        <p className="auth-kicker">Start your next chapter</p>
        <h2>More exploring. Less coordinating.</h2>
        <p>Build a trip your whole group can get excited about, from the first idea to the final booking.</p>
        <ul className="auth-points"><li>Invite everyone into the plan</li><li>Turn ideas into a shared itinerary</li><li>Make decisions without the group chat chaos</li></ul>
      </section>
      <div className="auth-card card">
        <div className="auth-logo">✈️ TripMate</div>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Start planning trips with your group.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">Full name</label>
            <input className="form-input" type="text" placeholder="Pasindu Malshan"
              id="register-name" autoComplete="name" required
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="register-email">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com"
              id="register-email" autoComplete="email" required
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="register-password">Password</label>
            <input className="form-input" type="password" placeholder="min. 6 characters"
              id="register-password" autoComplete="new-password" required
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="register-confirm">Confirm password</label>
            <input className="form-input" type="password" placeholder="••••••••"
              id="register-confirm" autoComplete="new-password" required
              value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Create account
          </button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
