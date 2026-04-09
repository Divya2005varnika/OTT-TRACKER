import React, { useState } from "react";
import { STATUS, CATEGORIES, PLATFORMS } from "../data/constants";

export default function ShowModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    title: "",
    year: 2024,
    rating: 5,
    status: "Plan to Watch",
    category: "Tamil",
    genre: "Action",     
    platform: "Netflix", 
    poster: "🎬"
  });

  return (
    <div className="overlay">
      <div className="modal-box">
        <h2>Add Movie</h2>
        <div className="form-content">
          <div className="form-group">
            <label>Movie Name:</label>
            <input type="text" placeholder="Enter title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Genre:</label>
              <input type="text" placeholder="e.g. Action" onChange={(e) => setForm({ ...form, genre: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Platform:</label>
              <select onChange={(e) => setForm({ ...form, platform: e.target.value })}>
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Release Year:</label>
              <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })} />
            </div>
            <div className="form-group">
              <label>Rating (1-10):</label>
              <input type="number" min="1" max="10" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} />
            </div>
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="modal-actions">
            <button className="save-btn" onClick={() => onSave(form)}>Save Movie</button>
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}