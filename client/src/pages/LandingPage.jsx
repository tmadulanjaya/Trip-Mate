import { Link } from "react-router-dom";
import "./LandingPage.css";

const FEATURES = [
  { icon: "🗺️", title: "Plan together", desc: "Create shared trips and invite your group — everyone collaborates in one place." },
  { icon: "📋", title: "Kanban itinerary", desc: "Move items from Ideas → Shortlisted → Booked → Completed as plans solidify." },
  { icon: "⚡", title: "Real-time updates", desc: "See every change the moment it happens — no refresh needed." },
  { icon: "🔒", title: "Conflict detection", desc: "Stale edits are caught and flagged so no one silently overwrites another's work." },
  { icon: "💰", title: "Expense tracking", desc: "Log who paid what and see the trip total at a glance." },
  { icon: "🗳️", title: "Group polls", desc: "Can't decide on a restaurant? Put it to a vote." },
];

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <div className="hero-badge">✈️ Collaborative travel planning</div>
          <h1 className="hero-headline">Plan trips together,<br /><span className="hero-accent">without the chaos.</span></h1>
          <p className="hero-sub">TripMate keeps your whole group aligned — itineraries, packing lists, expenses, and live updates, all in one shared workspace.</p>
          <div className="hero-cta">
            <Link to="/register" className="btn btn-primary btn-lg">Get started free</Link>
            <Link to="/dashboard" className="btn btn-outline btn-lg">See a demo trip</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features container">
        <h2 className="features-title">Everything your trip needs</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-name">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="cta-strip">
        <div className="container cta-strip-inner">
          <h2>Ready to plan your next adventure?</h2>
          <Link to="/register" className="btn btn-primary btn-lg">Create your first trip →</Link>
        </div>
      </section>
    </div>
  );
}
