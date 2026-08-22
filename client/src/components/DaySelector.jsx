import "./DaySelector.css";

export default function DaySelector({ activeDay, onDayChange, totalDays, activeTab, onTabChange }) {
  const tabs = [
    { key: "itinerary", label: "Itinerary" },
    { key: "packing", label: "🎒 Packing" },
    { key: "expenses", label: "💰 Expenses" },
    { key: "polls", label: "🗳️ Polls" },
  ];

  return (
    <div className="day-selector">
      <div className="container">
        <div className="day-selector-inner">
          <div className="day-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`day-tab ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => onTabChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "itinerary" && (
            <div className="day-pills">
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  className={`day-pill ${activeDay === day ? "active" : ""}`}
                  onClick={() => onDayChange(day)}
                >
                  Day {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
