import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Schedule.css';

const Schedule = () => {
  const navigate = useNavigate();
  
  const scheduleData = [
    { day: 'LUNDI', startTime: '8:00', endTime: '10:00', subject: 'DÉVELOPPEMENT WEB' },
    { day: 'MARDI', startTime: '17:00', endTime: '19:00', subject: 'RÉSEAUX INFORMATIQUES' },
    { day: 'MERCREDI', startTime: '20:00', endTime: '22:00', subject: 'CYBERSÉCURITÉ' },
    { day: 'JEUDI', startTime: '8:00', endTime: '10:00', subject: 'DESIGN NUMÉRIQUE' },
  ];

  const handleReturn = () => {
    navigate('/dashboard');
  };

  return (
    <div className="schedule-page">
      <header className="schedule-header">
        <div className="logo">GrifCentre</div>
        <div className="user-info">
          <span>Mohamed LABJAOUI</span>
          <div className="notification-icon">
            <span className="notification-badge">1</span>
          </div>
        </div>
      </header>

      <div className="student-schedule-content">
        <h2 className="schedule-title">EMPLOI DU TEMPS:</h2>
        
        <div className="student-schedule-table">
          <div className="student-table-header">
            <div className="header-cell">Day</div>
            <div className="header-cell">Start Time</div>
            <div className="header-cell">End Time</div>
            <div className="header-cell">Matiers</div>
          </div>
          
          {scheduleData.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell day-cell">{item.day}</div>
              <div className="table-cell time-cell">{item.startTime}</div>
              <div className="table-cell time-cell">{item.endTime}</div>
              <div className="table-cell subject-cell">{item.subject}</div>
            </div>
          ))}
        </div>

        <button className="return-button" onClick={handleReturn}>
          <span className="return-icon">←</span> RETOUR
        </button>
      </div>
    </div>
  );
};

export default Schedule;