import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import { INITIAL_SHOWS, CATEGORIES } from "./data/constants";
import ShowCard from "./components/ShowCard";
import DetailsPage from "./components/DetailsPage";
import ShowModal from "./components/ShowModal";

function AppContent() {
  // PERSISTENCE: Load from localStorage or use INITIAL_SHOWS if empty [cite: 115]
  const [shows, setShows] = useState(() => {
    const savedData = localStorage.getItem("ott_tracker_data");
    return savedData ? JSON.parse(savedData) : INITIAL_SHOWS;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Languages");

  // PERSISTENCE: Save to localStorage whenever the 'shows' state changes [cite: 127-129]
  useEffect(() => {
    localStorage.setItem("ott_tracker_data", JSON.stringify(shows));
    document.title = `OTT Tracker | ${shows.length} Titles`;
  }, [shows]);

  const filteredShows = shows.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Languages" || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id, e) => {
    e.stopPropagation(); 
    setShows(shows.filter(s => s.id !== id));
  };

  const handleAddMovie = (newMovie) => {
    setShows([...shows, { ...newMovie, id: Date.now() }]);
    setShowAddForm(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <div className="simple-login">
          <h2>OTT Track Login</h2>
          <div className="login-form">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={() => setIsLoggedIn(true)}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="simple-nav">
        <h2 className="logo">OTT Track</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/tracker">Tracker</Link>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <div>
              <div className="hero">
                <h1>Welcome Back!</h1>
                <p>Your movie journey continues here.</p>
                <h2 className="section-title">Continue Watching</h2>
              </div>
              <div className="grid">
                {shows.filter(s => s.status === "Watching").slice(0, 4).map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} onDelete={(e) => handleDelete(s.id, e)} />
                ))}
              </div>
              <h2 className="section-title" style={{padding: '40px 5% 0'}}>Recently Added</h2>
              <div className="grid">
                {[...shows].reverse().slice(0, 4).map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} onDelete={(e) => handleDelete(s.id, e)} />
                ))}
              </div>
            </div>
          } />

          <Route path="/tracker" element={
            <div className="tracker-page">
              <div className="tracker-header">
                <h1 className="section-title">Movie List</h1>
                <div className="filters-group">
                  <input type="text" placeholder="Search for movies..." onChange={(e) => setSearchQuery(e.target.value)} />
                  <select onChange={(e) => setSelectedCategory(e.target.value)}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="actions-header">
                <button className="add-btn-premium" onClick={() => setShowAddForm(true)}>+ Add New Movie</button>
                <p className="results-count">Showing {filteredShows.length} results</p>
              </div>

              <div className="grid">
                {filteredShows.map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} onDelete={(e) => handleDelete(s.id, e)} />
                ))}
              </div>
            </div>
          } />

          <Route path="/watchlist" element={
            <div>
              <h1 className="section-title" style={{padding: '0 5%'}}>My Watchlist</h1>
              <div className="grid">
                {shows.filter(s => s.status === "Plan to Watch").map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} onDelete={(e) => handleDelete(s.id, e)} />
                ))}
              </div>
            </div>
          } />

          <Route path="/profile" element={
            <div className="profile-page">
              <h1 className="section-title">User Settings & Profile</h1>
              <div className="profile-container">
                <div className="user-sidebar">
                  <div className="avatar-circle">👤</div>
                  <h2 className="user-name">Administrator</h2>
                  <div className="pro-badge">⭐ PRO MEMBER</div>
                  <p className="user-email">admin@otttrack.com</p>
                  <button className="signout-btn" onClick={() => setIsLoggedIn(false)}>Sign Out</button>
                </div>
                <div className="stats-main">
                  <h3 className="stats-label">VIEWING STATISTICS</h3>
                  <div className="stats-row">
                    <div className="stat-card">
                      <span className="stat-value">{shows.length * 2}</span>
                      <span className="stat-desc">Episodes</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-value">{shows.filter(s => s.status === "Completed").length}</span>
                      <span className="stat-desc">Completed</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-value">{shows.filter(s => s.status === "Plan to Watch").length}</span>
                      <span className="stat-desc">Watchlist</span>
                    </div>
                    <div className="stat-card highlight">
                      <span className="stat-value">Bollywood</span>
                      <span className="stat-desc">Top Genre</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
      {selectedMovie && <DetailsPage movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      {showAddForm && <ShowModal onSave={handleAddMovie} onClose={() => setShowAddForm(false)} />}
    </div>
  );
}

export default function App() {
  return <Router><AppContent /></Router>;
}