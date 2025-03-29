import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ProfessorDashboard.css';
import { FaBars } from 'react-icons/fa';

const StudentList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [notification, setNotification] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [classInfo, setClassInfo] = useState({});

  // Extract classId from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const classId = queryParams.get('classId');
    if (classId) {
      fetchClassAndStudents(classId);
    }
  }, [location]);

  const fetchClassAndStudents = async (classId) => {
    try {
      setLoading(true);
      
      // Fetch class info
      const classResponse = await fetch(`http://your-backend-api.com/api/classes/${classId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('professorToken')}`
        }
      });
      
      if (!classResponse.ok) throw new Error('Failed to fetch class info');
      const classData = await classResponse.json();
      setClassInfo(classData);

      // Fetch students
      const studentsResponse = await fetch(`http://your-backend-api.com/api/classes/${classId}/students`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('professorToken')}`
        }
      });

      if (!studentsResponse.ok) throw new Error('Failed to fetch students');
      const studentsData = await studentsResponse.json();
      setStudents(studentsData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAbsences = async () => {
    try {
      const absentStudents = Object.entries(attendance)
        .filter(([_, status]) => status === 'absent')
        .map(([studentId]) => studentId);

      const response = await fetch('http://your-backend-api.com/api/attendance', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('professorToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          classId: classInfo.id,
          date,
          absentStudents
        })
      });

      if (!response.ok) throw new Error('Failed to save attendance');
      
      setNotification('Les absences ont été enregistrées avec succès');
      setAttendance({});
      setTimeout(() => setNotification(''), 3000);
      
    } catch (err) {
      setNotification(`Erreur: ${err.message}`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('professorToken');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des étudiants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Erreur lors du chargement</h3>
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
            <li onClick={handleLogout}>Déconnexion</li>
          </ul>
        </div>
      )}

      <div className="dashboard-content">
        <div className="students-container">
          <h2 className="section-title">
            LISTE ÉTUDIANTS: {classInfo.name && `Classe ${classInfo.name}`}
          </h2>
          
          {students.length === 0 ? (
            <div className="no-students-message">Aucun étudiant dans cette classe</div>
          ) : (
            <>
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Présence</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.lastName}</td>
                      <td>{student.firstName}</td>
                      <td className="attendance-cell">
                        <label>
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            checked={attendance[student.id] === 'present'}
                            onChange={() => handleAttendanceChange(student.id, 'present')}
                          /> Présent
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            checked={attendance[student.id] === 'absent'}
                            onChange={() => handleAttendanceChange(student.id, 'absent')}
                          /> Absent
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="absence-footer">
                <div className="attendance-date">
                  <label>Date: </label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="date-input"
                  />
                </div>
                <button 
                  className="save-button" 
                  onClick={handleSaveAbsences}
                  disabled={Object.keys(attendance).length === 0}
                >
                  Enregistrer les absences
                </button>
              </div>
            </>
          )}
          
          {notification && (
            <div className={`notification ${notification.includes('Erreur') ? 'error' : 'success'}`}>
              {notification}
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
    </div>
  );
};

export default StudentList;