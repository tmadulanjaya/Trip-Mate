import { mockUsers } from "../mockData";
import "./TripHeader.css";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function TripHeader({ trip }) {
  if (!trip) return null;

  const members = trip.members.map((id) => mockUsers.find((u) => u.id === id)).filter(Boolean);

  return (
    <div className="trip-header">
      <div className="trip-header-cover">
        <span className="trip-header-emoji">{trip.coverEmoji}</span>
        <div className="trip-header-overlay" />
        <div className="trip-header-info">
          <h1 className="trip-header-name">{trip.name}</h1>
          <div className="trip-header-meta">
            <span>📍 {trip.destination}</span>
            <span className="trip-header-sep">·</span>
            <span>🗓️ {formatDate(trip.startDate)} – {formatDate(trip.endDate)}</span>
          </div>
        </div>
      </div>
      <div className="trip-header-bar container">
        <div className="trip-header-members">
          <span className="text-sm text-muted">Members:</span>
          {members.map((u) => (
            <div className="trip-member-chip" key={u.id}>
              <div className="avatar avatar-sm">{u.avatar}</div>
              <span>{u.name}</span>
            </div>
          ))}
          <button className="btn btn-ghost btn-sm">+ Invite</button>
        </div>
        <button className="btn btn-outline btn-sm">Edit trip</button>
      </div>
    </div>
  );
}
