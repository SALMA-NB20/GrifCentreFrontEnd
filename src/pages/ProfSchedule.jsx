import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfessorDashboard.css'; // Reuse existing styles
import { FaBars } from 'react-icons/fa';

const ProfSchedule = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const scheduleData = [
    { day: 'LUNDI', startTime: '8:00', endTime: '10:00', subject: 'DÉVELOPPEMENT WEB', class: 'DEV-001' },
    { day: 'LUNDI', startTime: '10:00', endTime: '12:00', subject: 'DÉVELOPPEMENT WEB', class: 'DEV-002' },
    { day: 'JEUDI', startTime: '17:00', endTime: '19:00', subject: 'RÉSEAUX INFORMATIQUES', class: 'RES_002' },
    { day: 'JEUDI', startTime: '19:00', endTime: '21:00', subject: 'RÉSEAUX INFORMATIQUES', class: 'RES_001' },
  ];

  return (
    <div className="professor-dashboard">
      <header className="dashboard-student-header">
        <div className="logo">GrifCentre</div>
        <div className="user-info">
          <span>prof. Grif Abdeali</span>
          <FaBars className="menu-icon" onClick={toggleMenu} />
        </div>
      </header>

      {showMenu && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={() => navigate('/professor-dashboard')}>Mes classes</li>
            <li onClick={() => navigate('/absence-history')}>Historique d'absences</li>
            <li onClick={() => navigate('/upload-files')}>Upload files</li>
            <li onClick={() => navigate('/')}>Deconnection</li>
          </ul>
        </div>
      )}

<div className="dashboard-prof-content">
  <h2 className="section-title">EMPLOI DU TEMPS</h2>
  
  <div className="schedule-prof-table">
    <div className="table-header">
      <div className="header-cell">Jour</div>
      <div className="header-cell">Début</div>
      <div className="header-cell">Fin</div>
      <div className="header-cell">Matière</div>
      <div className="header-cell">Classe</div>
    </div>
    {scheduleData.map((item, index) => (
      <div className="table-row" key={index}>
        <div className="table-cell day-cell">{item.day}</div>
        <div className="table-cell time-cell">{item.startTime}</div>
        <div className="table-cell time-cell">{item.endTime}</div>
        <div className="table-cell subject-cell">{item.subject}</div>
        <div className="table-cell class-cell">{item.class}</div>
      </div>
    ))}
  </div>

  <button className="back-button" onClick={() => navigate('/professor-dashboard')}>Retour</button>
</div>

    </div>
  );
};

export default ProfSchedule;

