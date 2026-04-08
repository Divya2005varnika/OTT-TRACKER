import React from "react";

export default function DetailsPage({ movie, onClose }) {
  return (
    <div className="overlay">
      <div className="modal-box">
        <h2>{movie.title}</h2>
        <div style={{ fontSize: '50px' }}>{movie.poster}</div>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Platform:</strong> {movie.platform}</p>
        <p><strong>Status:</strong> {movie.status}</p>
        <br />
        <button onClick={onClose} style={{ padding: '10px', cursor: 'pointer' }}>Close Details</button>
      </div>
    </div>
  );
}