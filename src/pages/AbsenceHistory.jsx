import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AbsenceHistory.css';
import '../styles/ProfessorDashboard.css';
import { FaBars } from 'react-icons/fa';

const AbsenceHistory = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [absenceData, setAbsenceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbsenceData = async () => {
      try {
        const response = await fetch('http://your-backend-api.com/api/absences', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // if using authentication
          }
        });

        // First check if response is HTML (error page)
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          if (text.startsWith('<!DOCTYPE')) {
            throw new Error('Server returned HTML instead of JSON. Check API endpoint.');
          }
          throw new Error(`Invalid content type: ${contentType}`);
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch data');
        }

        const data = await response.json();
        setAbsenceData(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbsenceData();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token if exists
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Erreur lors du chargement des données</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="absence-history-container">
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
            <li onClick={handleLogout}>Deconnection</li>
          </ul>
        </div>
      )}

      <div className="absence-history-content">
        <h2 className="absence-history-title">HISTORIQUE D'ABSENCES:</h2>
        
        {absenceData.length === 0 ? (
          <div className="no-data-message">Aucune donnée d'absence disponible</div>
        ) : (
          <div className="absence-history-list">
            <div className="absence-header">
              <div className="header-item">Date</div>
              <div className="header-item">Classes</div>
              <div className="header-item">Matter</div>
              <div className="header-item">Description</div>
              <div className="header-item">Liste d'absences</div>
            </div>
            
            {absenceData.map((item, index) => (
              <div className="absence-item" key={index}>
                <div className="absence-date">
                  {item.date.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="absence-class">{item.class}</div>
                <div className="absence-subject">{item.subject}</div>
                <div className="absence-description">{item.description}</div>
                <div className="absence-names">
                  {item.absences.map((name, i) => (
                    <div key={i}>- {name}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="back-button" onClick={() => window.history.back()}>Retour</button>
    </div>
  );
};

export default AbsenceHistory;