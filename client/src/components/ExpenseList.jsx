import { useState } from "react";
import { mockUsers } from "../mockData";
import "./ExpenseList.css";

function getUser(id) { return mockUsers.find((u) => u.id === id); }

export default function ExpenseList({ expenses, onExpensesChange }) {
  const [form, setForm] = useState({ title: "", amount: "", paidBy: "u1", category: "other" });
  const [adding, setAdding] = useState(false);

  const totalCost = expenses.reduce((s, e) => s + e.amount, 0);

  const paidByUser = {};
  expenses.forEach((e) => {
    paidByUser[e.paidBy] = (paidByUser[e.paidBy] || 0) + e.amount;
  });

  function addExpense() {
    if (!form.title.trim() || !form.amount) return;
    onExpensesChange([...expenses, {
      id: `e-${Date.now()}`,
      tripId: expenses[0]?.tripId || "t1",
      title: form.title.trim(),
      amount: parseFloat(form.amount),
      paidBy: form.paidBy,
      category: form.category,
      participants: mockUsers.map((u) => u.id),
    }]);
    setForm({ title: "", amount: "", paidBy: "u1", category: "other" });
    setAdding(false);
  }

  return (
    <div className="expense-list">
      <div className="expense-summary card">
        <h2 className="expense-heading">💰 Expenses</h2>
        <div className="expense-total">
          <span className="expense-total-label">Total trip cost</span>
          <span className="expense-total-amount">${totalCost.toFixed(2)}</span>
        </div>
        <div className="expense-breakdown">
          {Object.entries(paidByUser).map(([uid, amount]) => {
            const u = getUser(uid);
            return u ? (
              <div className="expense-breakdown-row" key={uid}>
                <div className="avatar avatar-sm">{u.avatar}</div>
                <span>{u.name} paid</span>
                <span className="expense-breakdown-amount">${amount.toFixed(2)}</span>
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="expense-items card">
        <div className="expense-items-header">
          <h3>All expenses</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setAdding(true)}>+ Add</button>
        </div>
        {expenses.map((exp) => {
          const payer = getUser(exp.paidBy);
          return (
            <div key={exp.id} className="expense-row">
              <div className="expense-row-info">
                <span className="expense-row-title">{exp.title}</span>
                <span className="expense-row-meta">Paid by {payer?.name} · {exp.category}</span>
              </div>
              <span className="expense-row-amount">${exp.amount.toFixed(2)}</span>
            </div>
          );
        })}
        {expenses.length === 0 && <p className="text-muted text-sm">No expenses recorded yet.</p>}
      </div>

      {adding && (
        <div className="expense-form card">
          <h3>New expense</h3>
          <div className="form-group"><label className="form-label">Title</label>
            <input className="form-input" placeholder="e.g. Flight tickets" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="form-group"><label className="form-label">Amount ($)</label>
            <input className="form-input" type="number" placeholder="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div className="form-group"><label className="form-label">Paid by</label>
            <select className="form-input form-select" value={form.paidBy} onChange={(e) => setForm({ ...form, paidBy: e.target.value })}>
              {mockUsers.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div className="expense-form-actions">
            <button className="btn btn-outline" onClick={() => setAdding(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={addExpense}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
