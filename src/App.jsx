import { useState } from "react";
import "./App.css";

const calls = [
  {
    id: 1,
    name: "Anita Sharma",
    status: "answered",
    duration_secs: 137,
    summary: "Booked a follow-up for Friday.",
  },
  {
    id: 2,
    name: "Rahul Shah",
    status: "failed",
    duration_secs: 0,
    summary: "",
  },
  {
    id: 3,
    name: null,
    status: "answered",
    duration_secs: 64,
    summary: "Asked about clinic timings.",
  },
  {
    id: 4,
    name: "Mohammed Irfan Abdul Rahman Siddiqui",
    status: "answered",
    duration_secs: 3725,
    summary:
      "Called about his mother's knee surgery. Wanted to know the cost, how many days she would stay, whether insurance is accepted, what to bring on the day, and if the doctor could call him back personally before he decides. Asked the same questions again for his father.",
  },
  {
    id: 5,
    name: "Priya Nair",
    status: "no_answer",
    duration_secs: 0,
    summary: "",
  },
  {
    id: 6,
    name: "Deepak Verma",
    status: "answered",
    duration_secs: 212,
    summary: "Said the doctor was <b>very</b> helpful.",
  },
  {
    id: 7,
    name: "Sunita Rao",
    status: "answered",
    duration_secs: 59,
    summary: "Rescheduled to Monday.",
  },
  {
    id: 7,
    name: "Sunita Rao",
    status: "answered",
    duration_secs: 59,
    summary: "Rescheduled to Monday.",
  },
];

function formatDuration(seconds) {
  if (!seconds) return "0 sec";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  return `${remainingSeconds}s`;
}

function renderSummary(summary) {
  if (!summary) {
    return <span className="muted">No summary available</span>;
  }

  const parts = summary.split(/(<b>.*?<\/b>)/gi);

  return parts.map((part, index) => {
    if (/^<b>.*<\/b>$/i.test(part)) {
      return <strong key={index}>{part.replace(/<\/?b>/gi, "")}</strong>;
    }

    return <span key={index}>{part}</span>;
  });
}

function getStatusLabel(status) {
  if (status === "answered") return "Answered";
  if (status === "failed") return "Failed";
  if (status === "no_answer") return "No answer";
  return status;
}

function App() {
  const [search, setSearch] = useState("");

  const filteredCalls = calls.filter((call) =>
    (call.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">CLINIC DASHBOARD</p>
          <h1>Call List</h1>
          <p className="subtitle">
            Review recent patient calls and their summaries.
          </p>
        </div>

        <div className="call-count">
          <strong>{filteredCalls.length}</strong>
          <span>calls</span>
        </div>
      </header>

      <section className="search-section">
        <label htmlFor="search">Search callers</label>

        <div className="search-box">
          <span>⌕</span>

          <input
            id="search"
            type="search"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="clear-button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </section>

      <section className="call-list" aria-live="polite">
        {filteredCalls.length > 0 ? (
          filteredCalls.map((call, index) => (
            <article className="call-card" key={`${call.id}-${index}`}>
              <div className="card-top">
                <div className="caller">
                  <div className="avatar">
                    {(call.name || "?").charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h2>{call.name || "Unknown caller"}</h2>
                    <span className="duration">
                      {formatDuration(call.duration_secs)}
                    </span>
                  </div>
                </div>

                <span className={`status ${call.status}`}>
                  {getStatusLabel(call.status)}
                </span>
              </div>

              <div className="summary">
                {renderSummary(call.summary)}
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <h2>No calls found</h2>
            <p>
              No caller matches <strong>"{search}"</strong>.
            </p>
            <button onClick={() => setSearch("")}>Clear search</button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
