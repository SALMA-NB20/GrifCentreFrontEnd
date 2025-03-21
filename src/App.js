import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import ProfessorDashboard from './pages/ProfessorDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
