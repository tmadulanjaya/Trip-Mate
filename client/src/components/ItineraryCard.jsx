import { mockUsers, CATEGORY_ICONS } from "../mockData";
import "./ItineraryCard.css";

function getUser(id) {
  return mockUsers.find((u) => u.id === id);
}

export default function ItineraryCard({ item, onOpen, onStatusChange, statuses }) {
  const assignee = getUser(item.assignedTo);
  const categoryIcon = CATEGORY_ICONS[item.category] || "📌";

  function handleMoveLeft(e) {
    e.stopPropagation();
    const idx = statuses.indexOf(item.status);
    if (idx > 0) onStatusChange(item.id, statuses[idx - 1]);
  }
  function handleMoveRight(e) {
    e.stopPropagation();
    const idx = statuses.indexOf(item.status);
    if (idx < statuses.length - 1) onStatusChange(item.id, statuses[idx + 1]);
  }

  return (
    <div className="itinerary-card" onClick={() => onOpen(item)}>
      <div className="icard-top">
        <span className="icard-category-icon">{categoryIcon}</span>
        <span className={`badge badge-${item.status}`}>{item.status}</span>
      </div>

      <h4 className="icard-title">{item.title}</h4>

      {item.description && (
        <p className="icard-desc">{item.description}</p>
      )}

      <div className="icard-footer">
        <div className="icard-meta">
          {item.estimatedCost != null && (
            <span className="icard-cost">💵 ${item.estimatedCost}</span>
          )}
          {assignee && (
            <div className="icard-assignee" title={`Assigned to ${assignee.name}`}>
              <div className="avatar avatar-sm">{assignee.avatar}</div>
              <span>{assignee.name}</span>
            </div>
          )}
        </div>
        <div className="icard-actions">
          <button
            className="icard-move-btn"
            onClick={handleMoveLeft}
            disabled={statuses.indexOf(item.status) === 0}
            title="Move left"
          >←</button>
          <button
            className="icard-move-btn"
            onClick={handleMoveRight}
            disabled={statuses.indexOf(item.status) === statuses.length - 1}
            title="Move right"
          >→</button>
        </div>
      </div>
    </div>
  );
}
