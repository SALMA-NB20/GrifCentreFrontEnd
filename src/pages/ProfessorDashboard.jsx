import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfessorDashboard.css';
import { FaBars } from 'react-icons/fa';

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch classes data from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://your-backend-api.com/api/professor/classes', {
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
          throw new Error(errorData.message || 'Failed to fetch classes');
        }

        const data = await response.json();
        setClasses(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMattersClick = (classId) => {
    navigate(`/matters?classId=${classId}`);
  };

  const handleStudentListClick = (classId) => {
    navigate(`/student-list?classId=${classId}`);
  };

  const handleScheduleClick = (classId) => {
    navigate(`/prof-schedule?classId=${classId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('professorToken');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des classes en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Erreur lors du chargement des classes</h3>
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

      <div className="dashboard-content">
        <div className="classes-container">
          <h2 className="classes-title">MES CLASSES:</h2>
          
          {classes.length === 0 ? (
            <div className="no-classes-message">Aucune classe assignée</div>
          ) : (
            <div className="classes-table">
              <div className="table-header">
                <div className="header-cell">Classes</div>
                <div className="header-cell">List Matiers</div>
                <div className="header-cell">Liste Etudiant</div>
                <div className="header-cell">Emploi Du Temps</div>
              </div>
              
              {classes.map((classItem) => (
                <div className="table-row" key={classItem.id}>
                  <div className="table-cell id-cell">{classItem.code}</div>
                  <div className="table-cell action-cell">
                    <button 
                      className="action-button" 
                      onClick={() => handleMattersClick(classItem.id)}
                    >
                      CLICK HERE
                    </button>
                  </div>
                  <div className="table-cell action-cell">
                    <button 
                      className="action-button" 
                      onClick={() => handleStudentListClick(classItem.id)}
                    >
                      CLICK HERE
                    </button>
                  </div>
                  <div className="table-cell action-cell">
                    <button 
                      className="action-button" 
                      onClick={() => handleScheduleClick(classItem.id)}
                    >
                      CLICK HERE
                    </button>
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

export default ProfessorDashboard;