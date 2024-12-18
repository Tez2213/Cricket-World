import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import LiveScores from './components/LiveScores';
import TeamRankings from './components/TeamRankings';
import PlayerStats from './components/PlayerStats';


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/live-scores" element={<LiveScores />} />
            <Route path="/rankings" element={<TeamRankings />} />
            <Route path="/player-stats" element={<PlayerStats />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;