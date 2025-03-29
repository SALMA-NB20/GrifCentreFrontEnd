import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ProfessorDashboard.css';
import { FaBars } from 'react-icons/fa';

const ProfSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  // Extract classId from URL if present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const classId = queryParams.get('classId');
    setSelectedClass(classId);
  }, [location]);

  // Fetch schedule data from API
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        let url = 'http://your-backend-api.com/api/professor/schedule';
        if (selectedClass) {
          url += `?classId=${selectedClass}`;
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('professorToken')}`,
            'Content-Type': 'application/json'
          }
        });

        // Check if response is JSON
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
          throw new Error(errorData.message || 'Failed to fetch schedule');
        }

        const data = await response.json();
        setScheduleData(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, [selectedClass]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('professorToken');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement de l'emploi du temps...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Erreur lors du chargement du planning</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

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
            <li onClick={handleLogout}>Deconnection</li>
          </ul>
        </div>
      )}

      <div className="dashboard-prof-content">
        <h2 className="section-title">
          EMPLOI DU TEMPS
          {selectedClass && ` - Classe ${selectedClass}`}
        </h2>
        
        {scheduleData.length === 0 ? (
          <div className="no-schedule-message">
            Aucun cours programmé{selectedClass ? ` pour cette classe` : ''}
          </div>
        ) : (
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
        )}

        <button 
          className="back-button" 
          onClick={() => navigate('/professor-dashboard')}
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default ProfSchedule;