import { useState } from "react";
import BoardColumn from "./BoardColumn";
import Modal from "./Modal";
import { STATUSES, STATUS_LABELS, CATEGORY_ICONS } from "../mockData";
import "./ItineraryBoard.css";

export default function ItineraryBoard({ items, onItemsChange }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [addingToStatus, setAddingToStatus] = useState(null);
  const [newItem, setNewItem] = useState({ title: "", description: "", category: "activity", estimatedCost: "" });

  function handleStatusChange(itemId, newStatus) {
    onItemsChange(
      items.map((it) =>
        it.id === itemId ? { ...it, status: newStatus, version: it.version + 1 } : it
      )
    );
  }

  function handleAddCard(status) {
    setAddingToStatus(status);
    setNewItem({ title: "", description: "", category: "activity", estimatedCost: "" });
  }

  function handleSaveNewCard() {
    if (!newItem.title.trim()) return;
    const card = {
      id: `i-${Date.now()}`,
      tripId: items[0]?.tripId || "t1",
      title: newItem.title.trim(),
      description: newItem.description.trim(),
      day: 1,
      status: addingToStatus,
      category: newItem.category,
      estimatedCost: newItem.estimatedCost ? parseFloat(newItem.estimatedCost) : null,
      assignedTo: null,
      version: 0,
    };
    onItemsChange([...items, card]);
    setAddingToStatus(null);
  }

  function handleDeleteItem(itemId) {
    onItemsChange(items.filter((it) => it.id !== itemId));
    setSelectedItem(null);
  }

  return (
    <>
      <div className="itinerary-board">
        {STATUSES.map((status) => (
          <BoardColumn
            key={status}
            status={status}
            label={STATUS_LABELS[status]}
            items={items.filter((it) => it.status === status)}
            onCardOpen={setSelectedItem}
            onStatusChange={handleStatusChange}
            statuses={STATUSES}
            onAddCard={handleAddCard}
          />
        ))}
      </div>

      {/* Detail modal */}
      {selectedItem && (
        <Modal title={selectedItem.title} onClose={() => setSelectedItem(null)}>
          <div className="item-detail">
            <div className="item-detail-row">
              <span className="item-detail-label">Category</span>
              <span>{CATEGORY_ICONS[selectedItem.category]} {selectedItem.category}</span>
            </div>
            <div className="item-detail-row">
              <span className="item-detail-label">Status</span>
              <span className={`badge badge-${selectedItem.status}`}>{selectedItem.status}</span>
            </div>
            {selectedItem.estimatedCost != null && (
              <div className="item-detail-row">
                <span className="item-detail-label">Estimated cost</span>
                <span>${selectedItem.estimatedCost}</span>
              </div>
            )}
            {selectedItem.description && (
              <div className="item-detail-row item-detail-desc">
                <span className="item-detail-label">Notes</span>
                <p>{selectedItem.description}</p>
              </div>
            )}
            <div className="item-detail-row">
              <span className="item-detail-label">Version</span>
              <span className="text-muted text-sm">v{selectedItem.version}</span>
            </div>
            <div className="item-detail-actions">
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(selectedItem.id)}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add card modal */}
      {addingToStatus && (
        <Modal title={`Add to ${STATUS_LABELS[addingToStatus]}`} onClose={() => setAddingToStatus(null)}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              className="form-input"
              placeholder="e.g. Visit the Louvre"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <input
              className="form-input"
              placeholder="Any details..."
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input form-select"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              {Object.entries(CATEGORY_ICONS).map(([key, icon]) => (
                <option key={key} value={key}>{icon} {key}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Estimated cost ($)</label>
            <input
              className="form-input"
              type="number"
              placeholder="0"
              value={newItem.estimatedCost}
              onChange={(e) => setNewItem({ ...newItem, estimatedCost: e.target.value })}
            />
          </div>
          <div className="modal-footer-actions">
            <button className="btn btn-outline" onClick={() => setAddingToStatus(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSaveNewCard}>Add card</button>
          </div>
        </Modal>
      )}
    </>
  );
}
