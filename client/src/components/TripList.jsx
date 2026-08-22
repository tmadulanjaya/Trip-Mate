import { Link } from "react-router-dom";
import { mockUsers } from "../mockData";
import "./TripList.css";

function formatDateRange(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  const opts = { month: "short", day: "numeric" };
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
}

function getMember(id) {
  return mockUsers.find((u) => u.id === id);
}

export default function TripList({ trips, onDelete }) {
  if (!trips || trips.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🗺️</div>
        <h3>No trips yet</h3>
        <p>Create your first trip to get started.</p>
      </div>
    );
  }

  function handleDelete(e, trip) {
    e.preventDefault(); // stop the parent <Link> from navigating
    e.stopPropagation();
    if (window.confirm(`Delete "${trip.name}"? This can't be undone.`)) {
      onDelete?.(trip.id);
    }
  }

  return (
    <div className="trip-list">
      {trips.map((trip) => (
        <Link to={`/trips/${trip.id}`} key={trip.id} className="trip-card">
          {onDelete && (
            <button
              type="button"
              className="trip-card-delete"
              title="Delete trip"
              aria-label={`Delete ${trip.name}`}
              onClick={(e) => handleDelete(e, trip)}
            >
              🗑️
            </button>
          )}
          <div className="trip-card-cover">
            <span className="trip-cover-emoji">{trip.coverEmoji}</span>
          </div>
          <div className="trip-card-body">
            <h3 className="trip-card-name">{trip.name}</h3>
            <p className="trip-card-dest">📍 {trip.destination}</p>
            <p className="trip-card-dates">🗓️ {formatDateRange(trip.startDate, trip.endDate)}</p>
            <div className="trip-card-members">
              {trip.members.map((uid) => {
                const user = getMember(uid);
                return user ? (
                  <div className="avatar avatar-sm" key={uid} title={user.name}>
                    {user.avatar}
                  </div>
                ) : null;
              })}
              <span className="trip-member-count">{trip.members.length} members</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
