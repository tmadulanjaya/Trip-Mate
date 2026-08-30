import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TripList from "../components/TripList";
import { tripService } from "../services/tripService";
import "./DashboardPage.css";

export default function DashboardPage({ currentUser }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    tripService.getAll().then(setTrips);
  }, []);

  function handleDeleteTrip(tripId) {
    tripService.remove(tripId).then(() => {
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
    });
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">My Trips</h1>
            <p className="dashboard-sub">Welcome back, {currentUser?.name} 👋</p>
          </div>
          <Link to="/trips/new" className="btn btn-primary">+ New Trip</Link>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-number">{trips.length}</span>
            <span className="stat-label">Total trips</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{trips.filter(t => new Date(t.endDate) >= new Date()).length}</span>
            <span className="stat-label">Upcoming</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{[...new Set(trips.flatMap(t => t.members))].length}</span>
            <span className="stat-label">Travel companions</span>
          </div>
        </div>

        <TripList trips={trips} onDelete={handleDeleteTrip} />
      </div>
    </div>
  );
}