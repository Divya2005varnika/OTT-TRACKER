import React from "react";

export default function AnalyticsPage({ shows }) {
  const genres = ["Action", "Sci-Fi", "Drama", "Romance"];
  return (
    <div className="view-fade">
      <h1>Library Analytics 📊</h1>
      <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: '30px', marginTop: '30px' }}>
        <h3>Genre Distribution</h3>
        {genres.map(g => {
          const count = shows.filter(s => s.genre === g).length;
          const pct = (count / shows.length) * 100;
          return (
            <div key={g} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{g}</span><span>{count} Shows</span>
              </div>
              <div style={{ height: '10px', background: '#0f172a', borderRadius: '10px', marginTop: '5px' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: 'var(--primary)', borderRadius: '10px' }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}