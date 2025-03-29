import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Schedule.css';

const Schedule = () => {
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch schedule data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch schedule data
        const scheduleResponse = await fetch('http://your-backend-api.com/api/student/schedule', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('studentToken')}`,
            'Content-Type': 'application/json'
          }
        });

        // Check if response is JSON
        const contentType = scheduleResponse.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await scheduleResponse.text();
          if (text.startsWith('<!DOCTYPE')) {
            throw new Error('Server returned HTML instead of JSON. Check API endpoint.');
          }
          throw new Error(`Invalid content type: ${contentType}`);
        }

        if (!scheduleResponse.ok) {
          const errorData = await scheduleResponse.json();
          throw new Error(errorData.message || 'Failed to fetch schedule');
        }

        const scheduleData = await scheduleResponse.json();
        setScheduleData(scheduleData);

        // Fetch notification count
        const notifResponse = await fetch('http://your-backend-api.com/api/student/notifications/count', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('studentToken')}`
          }
        });

        if (notifResponse.ok) {
          const notifData = await notifResponse.json();
          setNotificationCount(notifData.count);
        }

      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReturn = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
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
    <div className="schedule-page">
      <header className="schedule-header">
        <div className="logo">GrifCentre</div>
        <div className="user-info">
          <span>Mohamed LABJAOUI</span>
          <div className="notification-icon" onClick={() => navigate('/notifications')}>
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </div>
          <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
        </div>
      </header>

      <div className="student-schedule-content">
        <h2 className="schedule-title">EMPLOI DU TEMPS:</h2>
        
        {scheduleData.length === 0 ? (
          <div className="no-schedule-message">Aucun cours programmé</div>
        ) : (
          <div className="student-schedule-table">
            <div className="student-table-header">
              <div className="header-cell">Jour</div>
              <div className="header-cell">Heure de début</div>
              <div className="header-cell">Heure de fin</div>
              <div className="header-cell">Matières</div>
            </div>
            
            {scheduleData.map((item, index) => (
              <div className="table-row" key={index}>
                <div className="table-cell day-cell">{item.day}</div>
                <div className="table-cell time-cell">{item.startTime}</div>
                <div className="table-cell time-cell">{item.endTime}</div>
                <div className="table-cell subject-cell">{item.subject}</div>
              </div>
            ))}
          </div>
        )}

        <button className="return-button" onClick={handleReturn}>
          <span className="return-icon">←</span> RETOUR
        </button>
      </div>
    </div>
  );
};

export default Schedule;