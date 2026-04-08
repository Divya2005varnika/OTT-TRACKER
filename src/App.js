import React, { useReducer, useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import "./styles.css";
import { INITIAL_SHOWS, CATEGORIES } from "./data/constants";
import { reducer, initialState } from "./reducer/reducer";
import ShowCard from "./components/ShowCard";
import DetailsPage from "./components/DetailsPage";
import ShowModal from "./components/ShowModal";

// --- AUTO-SAVE LOGIC ---
const getSavedShows = () => {
  const savedData = localStorage.getItem("ott_library");
  return savedData ? JSON.parse(savedData) : INITIAL_SHOWS;
};

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- AUTHENTICATION LOCK ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modal, setModal] = useState(null);
  
  const [state, dispatch] = useReducer(reducer, { ...initialState, shows: getSavedShows() });
  const { filter, sort, shows } = state;

  useEffect(() => {
    localStorage.setItem("ott_library", JSON.stringify(shows));
  }, [shows]);

  // --- SAFE PROFILE STATS ---
  const totalWatched = shows.reduce((acc, curr) => acc + (isNaN(Number(curr.watched)) ? 0 : Number(curr.watched)), 0);
  const completedShows = shows.filter(s => s.status === "Completed").length;
  const planToWatch = shows.filter(s => s.status === "Plan to Watch").length;
  
  const completedCategories = shows.filter(s => s.status === "Completed").map(s => s.category);
  const favoriteCategory = completedCategories.sort((a,b) =>
        completedCategories.filter(v => v===a).length - completedCategories.filter(v => v===b).length
  ).pop() || "Tamil";

  // --- ADVANCED SORTING ---
  const filtered = shows
    .filter(s => (filter.category === "All Languages" || s.category === filter.category))
    .filter(s => (!filter.search || s.title.toLowerCase().includes(filter.search.toLowerCase())))
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "year") return b.year - a.year;
      return a.title.localeCompare(b.title); 
    });

  // --- QUICK FAVORITES ---
  const handleFavorite = (id, e) => {
    e.stopPropagation(); 
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });
  };

  // ==========================================
  // 🛑 SECURITY GATE: IF NOT LOGGED IN, SHOW LOGIN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>OTT<span>TRACK</span></h1>
          <p>Unlimited movies and tracking</p>
          <input type="text" placeholder="Email or Username" />
          <input type="password" placeholder="Password" />
          <button className="btn-login" onClick={() => {
            setIsAuthenticated(true);
            navigate("/");            
          }}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // ✅ MAIN APP 
  // ==========================================
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate("/")}>OTT<span>Track</span></div>
        <div className="nav-links">
          <button onClick={() => navigate("/")} className={location.pathname === "/" ? "active-link" : ""}>Home</button>
          <button onClick={() => navigate("/tracker")} className={location.pathname === "/tracker" ? "active-link" : ""}>Tracker</button>
          <button onClick={() => navigate("/watchlist")} className={location.pathname === "/watchlist" ? "active-link" : ""}>Watchlist</button>
          <button onClick={() => navigate("/profile")} className={location.pathname === "/profile" ? "active-link" : ""}>Profile</button>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          {/* HOME / DASHBOARD */}
          <Route path="/" element={
            <div className="view-fade">
              <div className="hero-section">
                <h1>Welcome Back!</h1>
                <p>Your movie journey continues here.</p>
              </div>
              
              <h2>Continue Watching</h2>
              <div className="movie-grid">
                {shows.filter(s => s.status === "Watching").map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} onFavorite={handleFavorite} />
                ))}
              </div>

              <h2 style={{marginTop: '30px'}}>Recently Added</h2>
              <div className="movie-grid">
                {shows.slice(0, 8).map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} onFavorite={handleFavorite} />
                ))}
              </div>
            </div>
          } />

          {/* MOVIE TRACKER */}
          <Route path="/tracker" element={
            <div className="view-fade">
              <div className="toolbar-pro">
                <input className="search-input" placeholder="Search movies..." onChange={e => dispatch({type: "SET_FILTER", payload: {search: e.target.value}})} />
                <select className="sort-select" onChange={e => dispatch({type: "SET_FILTER", payload: {category: e.target.value}})}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select className="sort-select" onChange={e => dispatch({type: "SET_SORT", payload: e.target.value})}>
                  <option value="alphabetical">Sort: A-Z</option>
                  <option value="rating">Sort: High Rating</option>
                  <option value="year">Sort: Year</option>
                </select>
                <button className="btn-primary" onClick={() => setModal("add")}>+ Add Show</button>
              </div>
              
              <h2 style={{marginBottom: '15px'}}>All Movies ({filtered.length})</h2>
              <div className="movie-grid">
                {filtered.map(s => <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} onFavorite={handleFavorite} />)}
              </div>
            </div>
          } />

          {/* WATCHLIST */}
          <Route path="/watchlist" element={
            <div className="view-fade">
              <h1>My Watchlist ❤️</h1>
              <div className="movie-grid">
                {shows.filter(s => s.status === "Plan to Watch").map(s => (
                  <ShowCard key={s.id} show={s} onClick={() => setSelectedMovie(s)} onFavorite={handleFavorite} />
                ))}
              </div>
            </div>
          } />

          {/* PROFILE */}
          <Route path="/profile" element={
            <div className="view-fade">
              <h1 style={{marginBottom: '30px'}}>User Settings & Profile</h1>
              <div className="profile-layout">
                <div className="profile-identity">
                  <div className="avatar-large">👤</div>
                  <h2>Administrator</h2>
                  <span className="pro-badge">⭐ PRO MEMBER</span>
                  <p className="profile-email">admin@otttrack.com</p>
                  
                  <button className="btn-login" style={{marginTop:'30px', background:'#334155'}} onClick={() => { 
                    setIsAuthenticated(false); 
                    navigate("/");             
                  }}>
                    Sign Out
                  </button>
                </div>

                <div className="profile-details">
                  <h3>Viewing Statistics</h3>
                  <div className="profile-stats-grid">
                    <div className="p-stat-box"><h4>{totalWatched}</h4><p>Episodes</p></div>
                    <div className="p-stat-box"><h4>{completedShows}</h4><p>Completed</p></div>
                    <div className="p-stat-box"><h4>{planToWatch}</h4><p>Watchlist</p></div>
                    <div className="p-stat-box"><h4>{favoriteCategory}</h4><p>Top Genre</p></div>
                  </div>

                  <h3 style={{marginTop: '40px'}}>Preferences</h3>
                  <div className="settings-list">
                    <div className="setting-item"><span>Dark Mode Theme</span><label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label></div>
                    <div className="setting-item"><span>Auto-Play Trailers</span><label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label></div>
                    <div className="setting-item"><span>Email Notifications</span><label className="switch"><input type="checkbox" /><span className="slider round"></span></label></div>
                  </div>
                </div>
              </div>
            </div>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {selectedMovie && <DetailsPage movie={selectedMovie} onBack={() => setSelectedMovie(null)} />}
      </main>

      {modal && <ShowModal onSave={(m) => { dispatch({type:"ADD_SHOW", payload:m}); setModal(null); }} onClose={() => setModal(null)} />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}