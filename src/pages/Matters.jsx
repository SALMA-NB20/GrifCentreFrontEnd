import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Matters.css';
import '../styles/ProfessorDashboard.css';
import { FaBars } from 'react-icons/fa';

const Matters = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const subjects = [
    'Development',
    'Frensh',
    'Arabic',
    'English',
  ];

  return (
    <div className="professor-dashboard">
      <header className="dashboard-header">
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

      {/* Main Content */}
      <div className="matters-content">
        <h1 className="matters-title">LISTE MATIER:</h1>
        
        <div className="matters-list">
          <div className="matters-list-header">
            <span>Matters</span>
          </div>
          {subjects.map((subject, index) => (
            <div className="matters-list-item" key={index}>
              <span>{subject}</span>
            </div>
          ))}
        </div>

        <button className="back-button" onClick={() => window.history.back()}>Retour</button>
      </div>
    </div>
  );
};

export default Matters;