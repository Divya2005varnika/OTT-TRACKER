import React from "react";
import { getStatusClass } from "../utils/helpers";

const ShowListItem = ({ show, onEdit, onDelete }) => {
  const pct = show.episodes > 0 ? Math.round((show.watched / show.episodes) * 100) : 0;
  return (
    <div className="show-list-item">
      <div className="list-poster">{show.poster}</div>
      <div className="list-info">
        <div className="list-title">{show.title}</div>
        <div className="list-sub">{show.platform} • {show.genre} • {show.year}</div>
      </div>
      <span className={`card-status-dot ${getStatusClass(show.status)}`} style={{ flexShrink: 0 }}>{show.status}</span>
      <div className="list-progress">
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        <div className="progress-label" style={{ marginTop: 4 }}><span>{show.watched}/{show.episodes}</span><span>{pct}%</span></div>
      </div>
      <div className="rating-display" style={{ flexShrink: 0 }}>⭐ {show.rating > 0 ? show.rating : "—"}</div>
      <div className="list-actions">
        <button className="action-btn action-btn-edit" onClick={() => onEdit(show)}>✏️</button>
        <button className="action-btn action-btn-del" onClick={() => onDelete(show.id)}>🗑️</button>
      </div>
    </div>
  );
};
export default ShowListItem;