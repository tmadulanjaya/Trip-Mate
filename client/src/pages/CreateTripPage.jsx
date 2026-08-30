import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tripService } from "../services/tripService";
import "./CreateTripPage.css";

const EMOJIS = ["🗼", "🗾", "🏖️", "🏔️", "🌍", "🌏", "🗺️", "🚢", "🏛️", "🌴"];

export default function CreateTripPage({ currentUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", destination: "", startDate: "", endDate: "", coverEmoji: "🗼",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.destination || !form.startDate || !form.endDate) {
      setError("Please fill in all required fields.");
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError("End date must be after start date.");
      return;
    }

    try {
      await tripService.create({
        ...form,
        owner: currentUser?.id,
        members: [currentUser?.id],
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong creating the trip. Please try again.");
    }
  }

  return (
    <div className="create-trip-page">
      <div className="container">
        <div className="create-trip-header">
          <h1>Plan a new trip ✈️</h1>
          <p>Start with the basics — you can add more details later.</p>
        </div>

        <div className="create-trip-form card">
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Trip name *</label>
              <input className="form-input" placeholder="e.g. Paris Adventure"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Destination *</label>
              <input className="form-input" placeholder="e.g. Paris, France"
                value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
            </div>

            <div className="create-trip-dates">
              <div className="form-group">
                <label className="form-label">Start date *</label>
                <input className="form-input" type="date"
                  value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">End date *</label>
                <input className="form-input" type="date"
                  value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Cover emoji</label>
              <div className="emoji-picker">
                {EMOJIS.map((em) => (
                  <button type="button" key={em}
                    className={`emoji-btn ${form.coverEmoji === em ? "selected" : ""}`}
                    onClick={() => setForm({ ...form, coverEmoji: em })}
                  >{em}</button>
                ))}
              </div>
            </div>

            <div className="create-trip-actions">
              <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create trip →</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}