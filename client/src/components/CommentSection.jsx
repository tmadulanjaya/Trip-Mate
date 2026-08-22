import { useState } from "react";
import { mockUsers } from "../mockData";
import "./CommentSection.css";

const CURRENT_USER = mockUsers[0];

export default function CommentSection({ tripId }) {
  const [comments, setComments] = useState([
    { id: "c1", author: "u2", body: "Can't wait for the Eiffel Tower!", createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: "c2", author: "u3", body: "Should we book the Seine cruise in advance?", createdAt: new Date(Date.now() - 1800000).toISOString() },
  ]);
  const [draft, setDraft] = useState("");

  function postComment() {
    if (!draft.trim()) return;
    setComments([...comments, { id: `c-${Date.now()}`, author: CURRENT_USER.id, body: draft.trim(), createdAt: new Date().toISOString() }]);
    setDraft("");
  }

  function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso)) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  return (
    <div className="comment-section card">
      <h3 className="comment-title">💬 Trip comments</h3>
      <div className="comment-list">
        {comments.map((c) => {
          const author = mockUsers.find((u) => u.id === c.author);
          return (
            <div key={c.id} className="comment">
              <div className="avatar">{author?.avatar}</div>
              <div className="comment-body">
                <div className="comment-meta">
                  <span className="comment-author">{author?.name}</span>
                  <span className="comment-time">{timeAgo(c.createdAt)}</span>
                </div>
                <p className="comment-text">{c.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="comment-compose">
        <div className="avatar">{CURRENT_USER.avatar}</div>
        <input
          className="form-input"
          placeholder="Write a comment..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && postComment()}
        />
        <button className="btn btn-primary btn-sm" onClick={postComment}>Send</button>
      </div>
    </div>
  );
}
