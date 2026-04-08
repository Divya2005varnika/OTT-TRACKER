import React from "react";
import StatCard from "./StatCard";

const StatsStrip = ({ shows, totalEps }) => (
  <div className="stats-strip">
    <StatCard num={shows.length} label="Total Shows" color="var(--accent)" />
    <StatCard num={shows.filter(s => s.status === "Watching").length} label="Now Watching" color="var(--accent3)" />
    <StatCard num={shows.filter(s => s.status === "Completed").length} label="Completed" color="#7c6af7" />
    <StatCard num={totalEps} label="Episodes Watched" color="var(--accent2)" />
  </div>
);
export default StatsStrip;