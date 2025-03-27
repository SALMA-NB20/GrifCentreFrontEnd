import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import ProfessorDashboard from './pages/ProfessorDashboard';
import Matters from './pages/Matters';
import UploadFiles from './pages/UploadFiles';
import StudentList from './pages/StudentList';
import ProfSchedule from './pages/ProfSchedule';
import AbsenceHistory from './pages/AbsenceHistory'; // Import the AbsenceHistory component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
        <Route path="/matters" element={<Matters />} />
        <Route path="/upload-files" element={<UploadFiles />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/prof-schedule" element={<ProfSchedule />} />
        <Route path="/absence-history" element={<AbsenceHistory />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
