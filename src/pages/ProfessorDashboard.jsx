import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfessorDashboard.css';
import { FaBars } from 'react-icons/fa';

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const classes = [
    { id: 'DEV-001', title: 'Développement Web' },
    { id: 'RES_001', title: 'Réseaux Informatiques' },
    { id: 'CYB_001', title: 'Cybersécurité' },
    { id: 'DN-001', title: 'Design numérique' },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMattersClick = () => {
    navigate('/matters');
  };

  const handleStudentListClick = () => {
    navigate('/student-list');
  };

  const handleScheduleClick = () => {
    navigate('/prof-schedule');
  };

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page
  };

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
            <li onClick={handleLogout}>Deconnection</li> {/* Updated Deconnection link */}
          </ul>
        </div>
      )}

      <div className="dashboard-content">
        <div className="classes-container">
          <h2 className="classes-title">MES CLASSES:</h2>
          <div className="classes-table">
            <div className="table-header">
              <div className="header-cell">Classes</div>
              <div className="header-cell">List Matiers</div>
              <div className="header-cell">Liste Etudiant</div>
              <div className="header-cell">Emploi Du Temps</div>
            </div>
            
            {classes.map((classItem) => (
              <div className="table-row" key={classItem.id}>
                <div className="table-cell id-cell">{classItem.id}</div>
                <div className="table-cell action-cell">
                  <button className="action-button" onClick={handleMattersClick}>CLICK HERE</button>
                </div>
                <div className="table-cell action-cell">
                  <button className="action-button" onClick={handleStudentListClick}>CLICK HERE</button>
                </div>
                <div className="table-cell action-cell">
                  <button className="action-button" onClick={handleScheduleClick}>CLICK HERE</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
