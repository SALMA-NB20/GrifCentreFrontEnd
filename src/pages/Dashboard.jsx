import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { FaBell, FaFileAlt, FaDownload } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [formations, setFormations] = useState([]);
  const [courseFiles, setCourseFiles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState({
    formations: true,
    files: true,
    notifications: true
  });
  const [error, setError] = useState({
    formations: null,
    files: null,
    notifications: null
  });

  // Fetch formations data
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await fetch('http://your-backend-api.com/api/formations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch formations');
        const data = await response.json();
        setFormations(data);
      } catch (err) {
        setError(prev => ({...prev, formations: err.message}));
      } finally {
        setLoading(prev => ({...prev, formations: false}));
      }
    };

    fetchFormations();
  }, []);

  // Fetch course files
  useEffect(() => {
    const fetchCourseFiles = async () => {
      try {
        const response = await fetch('http://your-backend-api.com/api/course-files', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch course files');
        const data = await response.json();
        setCourseFiles(data);
      } catch (err) {
        setError(prev => ({...prev, files: err.message}));
      } finally {
        setLoading(prev => ({...prev, files: false}));
      }
    };

    fetchCourseFiles();
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://your-backend-api.com/api/notifications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(prev => ({...prev, notifications: err.message}));
      } finally {
        setLoading(prev => ({...prev, notifications: false}));
      }
    };

    fetchNotifications();
  }, []);

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

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await fetch(`http://your-backend-api.com/api/files/${fileId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      // Handle file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert(`Download error: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading.formations || loading.files || loading.notifications) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-student-header">
        <div className="logo">GrifCentre</div>
        <div className="user-info">
          <span>Mohamed LABJAOUI</span>
          <div className="header-icons">
            <div className="icon-container" onClick={toggleFiles}>
              <FaFileAlt className="header-icon" />
              {!showFiles && courseFiles.length > 0 && (
                <span className="notification-badge">{courseFiles.length}</span>
              )}
            </div>
            <div className="icon-container" onClick={toggleNotifications}>
              <FaBell className="header-icon" />
              {!showNotifications && notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </div>
            <button className="deconnection-link" onClick={handleLogout}>Déconnexion</button>
          </div>
        </div>
      </header>

      {showNotifications && (
        <div className="dropdown-menu notifications-dropdown">
          <h3>Notifications</h3>
          {error.notifications ? (
            <div className="error-message">{error.notifications}</div>
          ) : notifications.length === 0 ? (
            <div className="no-data-message">Aucune notification</div>
          ) : (
            notifications.map((notification, index) => (
              <div className="notification-item" key={index}>
                <p>{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {showFiles && (
        <div className="dropdown-menu files-dropdown">
          <h3>Fichiers de cours</h3>
          {error.files ? (
            <div className="error-message">{error.files}</div>
          ) : courseFiles.length === 0 ? (
            <div className="no-data-message">Aucun fichier disponible</div>
          ) : (
            courseFiles.map(file => (
              <div className="file-item" key={file.id}>
                <div className="file-info">
                  <FaFileAlt className="file-icon" />
                  <div>
                    <p className="file-name">{file.name}</p>
                    <span className="file-size">{file.size}</span>
                  </div>
                </div>
                <button 
                  className="download-btn" 
                  onClick={() => handleDownload(file.id, file.name)}
                >
                  <FaDownload />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      <div className="dashboard-content">
        <div className="formations-container">
          <h2 className="formations-title">MES FORMATION:</h2>
          
          {error.formations ? (
            <div className="error-message">{error.formations}</div>
          ) : formations.length === 0 ? (
            <div className="no-data-message">Aucune formation disponible</div>
          ) : (
            <div className="formations-table">
              <div className="formations-table-header">
                <div className="formations-header-cell">Classes</div>
                <div className="formations-header-cell">Matiers</div>
                <div className="formations-header-cell">Emploi Du Temps</div>
                <div className="formations-header-cell">Montant</div>
                <div className="formations-header-cell">Status</div>
              </div>
              
              {formations.map((formation) => (
                <div className="formations-table-row" key={formation.id}>
                  <div className="table-cell id-cell">{formation.id}</div>
                  <div className="table-cell title-cell">{formation.title}</div>
                  <div className="table-cell action-cell">
                    <button 
                      className="action-button" 
                      onClick={handleScheduleClick}
                    >
                      CLICK HERE
                    </button>
                  </div>
                  <div className="table-cell hours-cell">{formation.hours}</div>
                  <div className={`table-cell status-cell ${formation.status === 'Payee' ? 'paid' : 'unpaid'}`}>
                    {formation.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;