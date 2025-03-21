import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { FaBell, FaFileAlt, FaDownload } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  
  const formations = [
    { id: 'DEV-001', title: 'Développement Web', hours: '300DH', status: 'Payee' },
    { id: 'RES_001', title: 'Réseaux Informatiques', hours: '200dh', status: 'Non-Payee' },
    { id: 'CYB_001', title: 'Cybersécurité', hours: '150dh', status: 'Non-Payee' },
    { id: 'DN-001', title: 'Design numérique', hours: '300dh', status: 'Payee' },
  ];

  const courseFiles = [
    { id: 1, name: 'Développement Web - Introduction.pdf', size: '2.4 MB' },
    { id: 2, name: 'Réseaux - Chapitre 1.pdf', size: '1.8 MB' },
    { id: 3, name: 'Cybersécurité - Notes.pdf', size: '3.2 MB' },
  ];

  const handleScheduleClick = () => {
    navigate('/schedule');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showFiles) setShowFiles(false);
  };

  const toggleFiles = () => {
    setShowFiles(!showFiles);
    if (showNotifications) setShowNotifications(false);
  };

  const handleDownload = (fileName) => {
    // In a real app, this would trigger an actual file download
    alert(`Téléchargement de ${fileName} commencé`);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">GrifCentre</div>
        <div className="user-info">
          <span>Mohamed LABJAOUI</span>
          <div className="header-icons">
            <div className="icon-container" onClick={toggleFiles}>
              <FaFileAlt className="header-icon" />
              {!showFiles && <span className="notification-badge">3</span>}
            </div>
            <div className="icon-container" onClick={toggleNotifications}>
                    `   ;`              <FaBell className="header-icon" />
              {!showNotifications && <span className="notification-badge">2</span>}
            </div>
            <a href="/" className="deconnection-link">Déconnexion</a>
          </div>
        </div>
      </header>

      {showNotifications && (
        <div className="dropdown-menu notifications-dropdown">
          <h3>Notifications</h3>
          <div className="notification-item">
            <p>ALERT! VOUS AVEZ UN RETARD DE PAIMENT</p>
            <span className="notification-time">Aujourd'hui, 10:30</span>
          </div>
          <div className="notification-item">
            <p>ALERT! VOUS AVEZ UN RETARD DE PAIMENT</p>
            <span className="notification-time">Hier, 15:45</span>
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
        <div className="formations-container">
          <h2 className="formations-title">MES FORMATION:</h2>
          
          <div className="formations-table">
            <div className="table-header">
              <div className="header-cell">Classes</div>
              <div className="header-cell">Matiers</div>
              <div className="header-cell">Emploi Du Temps</div>
              <div className="header-cell">Montant</div>
              <div className="header-cell">Status</div>
            </div>
            
            {formations.map((formation) => (
              <div className="table-row" key={formation.id}>
                <div className="table-cell id-cell">{formation.id}</div>
                <div className="table-cell title-cell">{formation.title}</div>
                <div className="table-cell action-cell">
                  <button className="action-button" onClick={handleScheduleClick}>CLICK HERE</button>
                </div>
                <div className="table-cell hours-cell">{formation.hours}</div>
                <div className={`table-cell status-cell ${formation.status === 'Payee' ? 'paid' : 'unpaid'}`}>
                  {formation.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;