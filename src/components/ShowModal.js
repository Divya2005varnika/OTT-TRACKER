import React, { useState } from "react";
import { CATEGORIES, STATUS } from "../data/constants";

export default function ShowModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    title: "", category: "Tamil", status: "Plan to Watch", 
    genre: "Action", year: 2024, rating: 10, poster: "🎬", link: "", cast: "", watched: 0, episodes: 1
  });

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 style={{margin:0, color:'var(--primary)'}}>Add New Show</h2>
        <input placeholder="Movie Name" required onChange={e => setForm({...form, title: e.target.value})} />
        <input placeholder="Cast Members" onChange={e => setForm({...form, cast: e.target.value})} />
        <input placeholder="IMDb Website Link" onChange={e => setForm({...form, link: e.target.value})} />
        
        <div style={{display:'flex', gap:'10px'}}>
          <select onChange={e => setForm({...form, category: e.target.value})}>
            {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{display:'flex', gap:'10px', marginTop:'15px'}}>
          <button className="btn-login" style={{background:'#334155'}} onClick={onClose}>Cancel</button>
          <button className="btn-login" onClick={() => onSave(form)}>Save Show</button>
        </div>
      </div>
    </div>
  );
}