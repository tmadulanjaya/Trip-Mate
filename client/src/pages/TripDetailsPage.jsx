import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TripHeader from "../components/TripHeader";
import DaySelector from "../components/DaySelector";
import ItineraryBoard from "../components/ItineraryBoard";
import PackingList from "../components/PackingList";
import ExpenseList from "../components/ExpenseList";
import PollList from "../components/PollList";
import CommentSection from "../components/CommentSection";
import { mockItineraryItems, mockPackingItems, mockExpenses, mockPolls } from "../mockData";
import { tripService } from "../services/tripService";
import "./TripDetailsPage.css";

export default function TripDetailsPage({ currentUser }) {
  const { tripId } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripService.getById(tripId)
      .then(setTrip)
      .finally(() => setLoading(false));
  }, [tripId]);

  const [activeTab, setActiveTab] = useState("itinerary");
  const [activeDay, setActiveDay] = useState(1);
  const [items, setItems] = useState(mockItineraryItems.filter((i) => i.tripId === tripId));
  const [packingItems, setPackingItems] = useState(mockPackingItems.filter((p) => p.tripId === tripId));
  const [expenses, setExpenses] = useState(mockExpenses.filter((e) => e.tripId === tripId));
  const [polls, setPolls] = useState(mockPolls.filter((p) => p.tripId === tripId));

  if (loading) {
    return <div className="container">Loading trip...</div>;
  }

  if (!trip) {
    return (
      <div className="trip-not-found container">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Trip not found</h3>
          <p>This trip doesn't exist or you don't have access.</p>
          <Link to="/dashboard" className="btn btn-primary mt-4">Back to dashboard</Link>
        </div>
      </div>
    );
  }

  const tripDays = Math.max(1, Math.round((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000) + 1);
  const dayItems = items.filter((it) => it.day === activeDay);

  return (
    <div className="trip-details-page">
      <TripHeader trip={trip} />
      <DaySelector
        activeDay={activeDay}
        onDayChange={setActiveDay}
        totalDays={tripDays}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="trip-details-body container">
        {activeTab === "itinerary" && (
          <ItineraryBoard items={dayItems} onItemsChange={(updated) => {
            setItems(items.map((it) => {
              const found = updated.find((u) => u.id === it.id);
              return found ? found : it;
            }).concat(updated.filter((u) => !items.find((it) => it.id === u.id))));
          }} />
        )}

        {activeTab === "packing" && (
          <div className="trip-details-section">
            <PackingList items={packingItems} onItemsChange={setPackingItems} />
          </div>
        )}

        {activeTab === "expenses" && (
          <div className="trip-details-section">
            <ExpenseList expenses={expenses} onExpensesChange={setExpenses} />
          </div>
        )}

        {activeTab === "polls" && (
          <div className="trip-details-section">
            <PollList polls={polls} onPollsChange={setPolls} />
          </div>
        )}

        {/* Comments always visible */}
        <div className="trip-details-comments">
          <CommentSection tripId={tripId} />
        </div>
      </div>
    </div>
  );
}