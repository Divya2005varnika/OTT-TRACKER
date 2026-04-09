import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import { INITIAL_SHOWS, CATEGORIES } from "./data/constants";
import ShowCard from "./components/ShowCard";
import DetailsPage from "./components/DetailsPage";
import ShowModal from "./components/ShowModal";

function AppContent() {
  const [shows, setShows] = useState(INITIAL_SHOWS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Languages");

  const filteredShows = shows.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Languages" || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalWatched = shows.filter(s => s.status === "Completed").length;

  // --- NEW CODE: useEffect Hook ---
  // This updates the actual browser tab title whenever the 'shows' array changes
  useEffect(() => {
    document.title = `OTT Tracker (${shows.length} movies)`;
  }, [shows]);
  // --------------------------------

  const handleAddMovie = (newMovie) => {
    const movieWithId = { ...newMovie, id: Date.now() };
    setShows([...shows, movieWithId]); 
    setShowAddForm(false); 
  };

  if (!isLoggedIn) {
    return (
      <div className="simple-login">
        <h2>Login to OTT Tracker</h2>
        <input type="text" placeholder="Username" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <nav className="simple-nav">
        <h2>OTT Tracker</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/tracker">Movie List</Link>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <div>
              <h1>Welcome Home</h1>
              
              <h3>Featured Movies</h3>
              <div className="grid">
                {shows.slice(0, 6).map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} />
                ))}
              </div>

              <h3 style={{marginTop: '40px'}}>Currently Watching</h3>
              <div className="grid">
                {shows.filter(s => s.status === "Watching").map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} />
                ))}
              </div>
            </div>
          } />

          <Route path="/tracker" element={
            <div>
              <h1>All Movies</h1>
              <div className="simple-controls">
                <input type="text" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} />
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={() => setShowAddForm(true)}>Add Movie</button>
              </div>
              
              <div className="grid">
                {filteredShows.map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} />
                ))}
              </div>
            </div>
          } />

          <Route path="/watchlist" element={
            <div>
              <h1>My Watchlist</h1>
              <div className="grid">
                {shows.filter(s => s.status === "Plan to Watch").map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} />
                ))}
              </div>
            </div>
          } />

          <Route path="/profile" element={
            <div>
              <h1>My Profile</h1>
              <div className="profile-box">
                <h2>Student User</h2>
                <p>Movies Completed: {totalWatched}</p>
                <p>Total Movies in DB: {shows.length}</p>
                <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
              </div>
            </div>
          } />
        </Routes>

        {selectedMovie && <DetailsPage movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        {showAddForm && <ShowModal onSave={handleAddMovie} onClose={() => setShowAddForm(false)} />}
      </div>
    </div>
  );
}

export default function App() {
  return <Router><AppContent /></Router>;
}