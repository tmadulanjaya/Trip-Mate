import ItineraryCard from "./ItineraryCard";
import "./BoardColumn.css";

const COLUMN_COLORS = {
  ideas: "#f59e0b",
  shortlisted: "#8b5cf6",
  booked: "#0d9488",
  completed: "#10b981",
};

export default function BoardColumn({ status, label, items, onCardOpen, onStatusChange, statuses, onAddCard }) {
  const accentColor = COLUMN_COLORS[status] || "#64748b";

  return (
    <div className="board-column">
      <div className="board-column-header" style={{ borderTopColor: accentColor }}>
        <div className="board-column-title">
          <span className="board-column-label">{label}</span>
          <span className="board-column-count">{items.length}</span>
        </div>
        <button
          className="board-column-add"
          onClick={() => onAddCard(status)}
          title={`Add to ${label}`}
        >+</button>
      </div>

      <div className="board-column-body">
        {items.length === 0 ? (
          <div className="board-column-empty">
            <p>No items here yet.</p>
            <button className="btn btn-ghost btn-sm" onClick={() => onAddCard(status)}>
              + Add item
            </button>
          </div>
        ) : (
          items.map((item) => (
            <ItineraryCard
              key={item.id}
              item={item}
              onOpen={onCardOpen}
              onStatusChange={onStatusChange}
              statuses={statuses}
            />
          ))
        )}
      </div>
    </div>
  );
}
