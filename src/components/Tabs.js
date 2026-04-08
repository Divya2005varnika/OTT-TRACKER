import React from "react";

const Tabs = ({ activeTab, onTabChange }) => (
  <nav className="tabs">
    {[["tracker", "📋 Tracker"], ["dashboard", "📊 Dashboard"]].map(([id, label]) => (
      <button key={id} className={`tab ${activeTab === id ? "active" : ""}`} onClick={() => onTabChange(id)}>{label}</button>
    ))}
  </nav>
);
export default Tabs;