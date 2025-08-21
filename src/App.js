// UNIQUE_TEST_COMMENT_20250817_1
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import CreateBotPage from './pages/CreateBotPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/create-bot" element={<CreateBotPage />} />
      </Routes>
    </Router>
  );
}

export default App;
