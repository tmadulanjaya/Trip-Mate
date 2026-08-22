import { useState } from "react";
import "./PollList.css";

const CURRENT_USER = "u1";

export default function PollList({ polls, onPollsChange }) {
  const [newQ, setNewQ] = useState("");

  function vote(pollId, optionId) {
    onPollsChange(polls.map((poll) => {
      if (poll.id !== pollId) return poll;
      const alreadyVoted = poll.options.some((o) => o.votes.includes(CURRENT_USER));
      return {
        ...poll,
        options: poll.options.map((opt) => {
          if (alreadyVoted) {
            return { ...opt, votes: opt.id === optionId ? [CURRENT_USER] : opt.votes.filter((v) => v !== CURRENT_USER) };
          }
          return opt.id === optionId ? { ...opt, votes: [...opt.votes, CURRENT_USER] } : opt;
        }),
      };
    }));
  }

  function addPoll() {
    if (!newQ.trim()) return;
    onPollsChange([...polls, {
      id: `po-${Date.now()}`,
      tripId: polls[0]?.tripId || "t1",
      question: newQ.trim(),
      options: [
        { id: `op-${Date.now()}-1`, text: "Option A", votes: [] },
        { id: `op-${Date.now()}-2`, text: "Option B", votes: [] },
      ],
      closesAt: null,
    }]);
    setNewQ("");
  }

  return (
    <div className="poll-list">
      <div className="poll-list-header">
        <h2 className="poll-list-title">🗳️ Polls</h2>
      </div>

      {polls.map((poll) => {
        const totalVotes = poll.options.reduce((s, o) => s + o.votes.length, 0);
        const userVote = poll.options.find((o) => o.votes.includes(CURRENT_USER));

        return (
          <div key={poll.id} className="poll-card card">
            <p className="poll-question">{poll.question}</p>
            <div className="poll-options">
              {poll.options.map((opt) => {
                const pct = totalVotes > 0 ? Math.round((opt.votes.length / totalVotes) * 100) : 0;
                const isVoted = opt.votes.includes(CURRENT_USER);
                return (
                  <button
                    key={opt.id}
                    className={`poll-option ${isVoted ? "voted" : ""}`}
                    onClick={() => vote(poll.id, opt.id)}
                  >
                    <div className="poll-option-bar" style={{ width: `${pct}%` }} />
                    <span className="poll-option-text">{opt.text}</span>
                    <span className="poll-option-pct">{pct}%</span>
                  </button>
                );
              })}
            </div>
            <p className="poll-meta">{totalVotes} vote{totalVotes !== 1 ? "s" : ""}{userVote ? " · You voted" : ""}</p>
          </div>
        );
      })}

      <div className="poll-add card">
        <h3 className="poll-add-title">+ New poll</h3>
        <div className="form-group">
          <input className="form-input" placeholder="Ask the group a question..." value={newQ} onChange={(e) => setNewQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPoll()} />
        </div>
        <button className="btn btn-primary btn-sm" onClick={addPoll}>Create poll</button>
      </div>
    </div>
  );
}
