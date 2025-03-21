import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfessorDashboard.css';
import { FaBell, FaFileAlt, FaDownload } from 'react-icons/fa';

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  
  const classes = [
    { id: 'DEV-001', title: 'Développement Web' },
    { id: 'RES_001', title: 'Réseaux Informatiques' },
    { id: 'CYB_001', title: 'Cybersécurité' },
    { id: 'DN-001', title: 'Design numérique' },
  ];

  const courseFiles = [
    { id: 1, name: 'Liste étudiants DEV-001.pdf', size: '1.4 MB' },
    { id: 2, name: 'Programme Réseaux.pdf', size: '2.8 MB' },
    { id: 3, name: 'Notes Cybersécurité.pdf', size: '3.2 MB' },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showFiles) setShowFiles(false);
  };

  const toggleFiles = () => {
    setShowFiles(!showFiles);
    if (showNotifications) setShowNotifications(false);
  };

  const handleDownload = (fileName) => {
    alert(`Téléchargement de ${fileName} commencé`);
  };

  const handleScheduleClick = () => {
    navigate('/prof-schedule');
  };

  const handleStudentListClick = () => {
    navigate('/student-list');
  };

  return (
    <div className="professor-dashboard">
      <header className="dashboard-header">
        <div className="logo">GrifCentre</div>
        <div className="user-info">
          <span>prof. Grif Abdeali</span>
          <div className="header-icons">
            <div className="icon-container" onClick={toggleFiles}>
              <FaFileAlt className="header-icon" />
              {!showFiles && <span className="notification-badge">3</span>}
            </div>
            <div className="icon-container" onClick={toggleNotifications}>
              <FaBell className="header-icon" />
              {!showNotifications && <span className="notification-badge">1</span>}
            </div>
            <a href="/" className="deconnection-link">Déconnexion</a>
          </div>
        </div>
      </header>

      {showNotifications && (
        <div className="dropdown-menu notifications-dropdown">
          <h3>Notifications</h3>
          <div className="notification-item">
            <p>Nouveau message du directeur</p>
            <span className="notification-time">Aujourd'hui, 09:15</span>
          </div>
        </div>
      )}

      {showFiles && (
        <div className="dropdown-menu files-dropdown">
          <h3>Fichiers de cours</h3>
          {courseFiles.map(file => (
            <div className="file-item" key={file.id}>
              <div className="file-info">
                <FaFileAlt className="file-icon" />
                <div>
                  <p className="file-name">{file.name}</p>
                  <span className="file-size">{file.size}</span>
                </div>
              </div>
              <button className="download-btn" onClick={() => handleDownload(file.name)}>
                <FaDownload />
              </button>
            </div>
          ))}
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
                  <button className="action-button">CLICK HERE</button>
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