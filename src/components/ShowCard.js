import React from "react";

export default function ShowCard({ show, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-icon">{show.poster}</div>
      <h3>{show.title}</h3>
      <p>Rating: {show.rating}/10</p>
      <p>{show.year}</p>
    </div>
  );
}