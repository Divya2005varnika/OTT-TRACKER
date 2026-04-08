import React from "react";

export default function DetailsPage({ movie, onBack }) {
  return (
    <div className="modal-overlay" style={{ alignItems: 'flex-start', paddingTop: '50px', overflowY: 'auto' }}>
      <div className="modal-card" style={{ width: '600px', maxWidth: '90%' }}>
        <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}>← Close</button>
        
        <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '8rem', background: `linear-gradient(135deg, ${movie.color}22, ${movie.color}44)`, borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '200px' }}>
            {movie.poster}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: '0 0 10px 0', color: 'var(--primary)' }}>{movie.title}</h1>
            <p style={{ margin: '0 0 20px 0', color: '#94a3b8' }}>{movie.year} | {movie.genre} | {movie.category}</p>
            
            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ margin: '0 0 5px 0', textTransform: 'uppercase', fontSize: '0.8rem', color: '#94a3b8' }}>Cast</h4>
              <p style={{ margin: 0 }}>{movie.cast || "N/A"}</p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 5px 0', textTransform: 'uppercase', fontSize: '0.8rem', color: '#94a3b8' }}>Rating</h4>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#fab005' }}>⭐ {movie.rating} / 10</p>
            </div>

            <a href={movie.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              View on IMDb ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}