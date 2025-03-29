import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Matters.css';
import '../styles/ProfessorDashboard.css';
import { FaBars } from 'react-icons/fa';

const Matters = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subjects data from API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://your-backend-api.com/api/subjects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
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
          throw new Error(errorData.message || 'Failed to fetch subjects');
        }

        const data = await response.json();
        setSubjects(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
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
        <h3>Erreur lors du chargement des matières</h3>
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

      {/* Main Content */}
      <div className="matters-content">
        <h1 className="matters-title">LISTE MATIER:</h1>
        
        {subjects.length === 0 ? (
          <div className="no-data-message">Aucune matière disponible</div>
        ) : (
          <div className="matters-list">
            <div className="matters-list-header">
              <span>Matters</span>
            </div>
            {subjects.map((subject, index) => (
              <div className="matters-list-item" key={index}>
                <span>{subject.name}</span>
              </div>
            ))}
          </div>
        )}

        <button className="back-button" onClick={() => window.history.back()}>Retour</button>
      </div>
    </div>
  );
};

export default Matters;