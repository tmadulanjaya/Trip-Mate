import { useState } from "react";
import { mockUsers } from "../mockData";
import "./PackingList.css";

export default function PackingList({ items, onItemsChange }) {
  const [newName, setNewName] = useState("");

  function togglePacked(id) {
    onItemsChange(items.map((it) => it.id === id ? { ...it, packed: !it.packed } : it));
  }
  function addItem() {
    if (!newName.trim()) return;
    onItemsChange([...items, { id: `p-${Date.now()}`, name: newName.trim(), quantity: 1, packed: false, assignedTo: null }]);
    setNewName("");
  }
  function removeItem(id) {
    onItemsChange(items.filter((it) => it.id !== id));
  }

  const packed = items.filter((i) => i.packed).length;

  return (
    <div className="packing-list card">
      <div className="packing-header">
        <h2 className="packing-title">🎒 Packing List</h2>
        <span className="packing-progress">{packed}/{items.length} packed</span>
      </div>

      <div className="packing-progress-bar">
        <div className="packing-progress-fill" style={{ width: items.length ? `${(packed / items.length) * 100}%` : "0%" }} />
      </div>

      <div className="packing-items">
        {items.map((item) => {
          const assignee = mockUsers.find((u) => u.id === item.assignedTo);
          return (
            <div key={item.id} className={`packing-item ${item.packed ? "packed" : ""}`}>
              <input
                type="checkbox"
                className="packing-check"
                checked={item.packed}
                onChange={() => togglePacked(item.id)}
              />
              <span className="packing-name">{item.name}</span>
              {item.quantity > 1 && <span className="packing-qty">×{item.quantity}</span>}
              {assignee && <div className="avatar avatar-sm" title={assignee.name}>{assignee.avatar}</div>}
              <button className="packing-remove" onClick={() => removeItem(item.id)}>✕</button>
            </div>
          );
        })}
      </div>

      <div className="packing-add">
        <input
          className="form-input"
          placeholder="Add packing item..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <button className="btn btn-primary btn-sm" onClick={addItem}>Add</button>
      </div>
    </div>
  );
}
