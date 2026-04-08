import React, { useState } from "react";
import { STATUS, CATEGORIES } from "../data/constants";

export default function ShowModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    title: "", 
    year: 2024, 
    rating: 5, 
    status: "Plan to Watch", 
    category: "Tamil",
    poster: "🎬"
  });

  return (
    <div className="overlay">
      <div className="modal-box">
        <h2>Add Movie</h2>
        
        <label>Movie Name:</label>
        <input type="text" onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <label>Category:</label>
        <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label>Status:</label>
        <select onChange={(e) => setForm({ ...form, status: e.target.value })}>
          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <br />
        <button onClick={() => onSave(form)} style={{ background: 'green', color: 'white', padding: '10px', marginRight: '10px' }}>Save</button>
        <button onClick={onClose} style={{ background: 'red', color: 'white', padding: '10px' }}>Cancel</button>
      </div>
    </div>
  );
}