import React from "react";

const Header = ({ showsCount, totalEps, darkMode, onToggleTheme }) => (
  <header className="header">
    <div className="logo">OTT<span>TRACK</span></div>
    <div className="header-right">
      <span style={{ fontSize: "0.8rem", color: "var(--text2)" }}>🎬 {showsCount} shows • {totalEps} eps</span>
      <button className="theme-btn" onClick={onToggleTheme}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  </header>
);
export default Header;