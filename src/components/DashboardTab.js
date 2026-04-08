import React from "react";
import StatCard from "./StatCard";
import { PLATFORMS } from "../data/constants";
import { getPlatformEmoji, getStatusClass } from "../utils/helpers";

const DashboardTab = ({ shows }) => {
  const totalEps = shows.reduce((a, s) => a + s.watched, 0);
  const completed = shows.filter(s => s.status === "Completed").length;
  const recent = [...shows].sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div className="dashboard">
      <div className="section-title">📊 Overview</div>
      <div className="stats-strip" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <StatCard num={shows.length} label="Total Shows" color="var(--accent)" />
        <StatCard num={completed} label="Completed" color="var(--accent3)" />
        <StatCard num={totalEps} label="Episodes Watched" color="var(--accent2)" />
      </div>
      <div className="section-title">🕐 Recently Added</div>
      <div className="activity-list">
        {recent.map(s => (
          <div className="activity-item" key={s.id}>
            <span className="activity-icon">{s.poster}</span>
            <div className="activity-text"><strong>{s.title}</strong> — {s.platform}</div>
            <span className={`card-status-dot ${getStatusClass(s.status)}`} style={{ marginLeft: "auto" }}>{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DashboardTab;