import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfessorDashboard.css'; // Reuse existing styles
import { FaBars } from 'react-icons/fa'; // Import menu icon

const StudentList = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [notification, setNotification] = useState('');
  const [students, setStudents] = useState([
    { id: 1, lastName: 'NBIGA', firstName: 'Salma', description: '' },
    { id: 2, lastName: 'LABJAOUI', firstName: 'Mohamed', description: '' },
    { id: 3, lastName: 'GHALOUA', firstName: 'Saad', description: '' },
    { id: 4, lastName: 'BOURRAT', firstName: 'Daimam', description: '' },
    { id: 5, lastName: 'MESRAR', firstName: 'Amina', description: '' },
  ]);
  const [description, setDescription] = useState(''); // Shared description state

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleDescriptionChange = (studentId, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, description: value } : student
      )
    );
  };

  const handleSaveAbsences = () => {
    setNotification('The absences saved successfully');
    setAttendance({}); // Reset attendance state
    setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
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
            <li onClick={() => navigate('/')}>Deconnection</li>
          </ul>
        </div>
      )}

      <div className="dashboard-content">
        <div className="students-container">
          <h2 className="section-title">LIST ETUDIANT:</h2>
          <div className="description-container">
            <label htmlFor="description">Description for all students:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="description-input"
            />
          </div>
          <table className="students-table">
            <thead>
              <tr>
                <th>Nom Etudiant</th>
                <th>Prenom Etudiant</th>
                <th>Noter les absences</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.lastName}</td>
                  <td>{student.firstName}</td>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={attendance[student.id] === 'absent'}
                        onChange={() => handleAttendanceChange(student.id, 'absent')}
                      />{' '}
                      Absent
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={attendance[student.id] === 'present'}
                        onChange={() => handleAttendanceChange(student.id, 'present')}
                      />{' '}
                      Present
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="absence-footer">
            <div className="professor-info">
              <label htmlFor="date">Saisir la date D'aujourd'hui</label>
              <input type="date" id="date" name="date" className="date-input" />
            </div>
            <button className="save-button" onClick={handleSaveAbsences}>Save Absences</button>
          </div>
          {notification && <div className="notification">{notification}</div>}
          <button className="back-button" onClick={() => navigate('/professor-dashboard')}>Retour</button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
