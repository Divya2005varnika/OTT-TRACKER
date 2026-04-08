import React from "react";

const ShowCard = ({ show, onClick, onFavorite }) => {
  return (
    <div className="show-card" onClick={onClick}>
      <div className="card-banner" style={{ background: `linear-gradient(135deg, ${show.color}22, ${show.color}44)` }}>
        
        {/* QUICK FAVORITES TOGGLE BUTTON */}
        <button className="quick-fav-btn" onClick={(e) => onFavorite(show.id, e)}>
          {show.favorite ? "❤️" : "🤍"}
        </button>

        <span style={{ fontSize: "4rem" }}>{show.poster}</span>
      </div>

      <div className="card-body">
        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px' }}>{show.title}</div>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>{show.genre} | {show.year}</div>
        <div style={{ color: '#fab005', fontWeight: 'bold' }}>⭐ {show.rating}/10</div>
      </div>
    </div>
  );
};

export default ShowCard;