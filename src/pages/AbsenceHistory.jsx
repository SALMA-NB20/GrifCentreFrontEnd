import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AbsenceHistory.css';
import '../styles/ProfessorDashboard.css';
import { FaBars } from 'react-icons/fa'; // Import FaBars

const AbsenceHistory = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page
  };

  const absenceData = [
    {
      date: 'LUNDI 09\nMARS 2024',
      class: '2Bac',
      subject: 'Development',
      description: '',
      absences: [
        'MOHAMED LABJAQUI',
        'AMINA GHIBA',
        'HAMZA CHNTOUF',
        'SALMA NBIGA',
        'AHMED MOUSSIF'
      ]
    },
    {
      date: 'MARDI 10\nMARS 2024',
      class: '2BAC',
      subject: 'RESEAU INFORMATIQUE',
      description: '',
      absences: [
        'MOHAMED LABJAQUI',
        'AMINA GHIBA',
        'HAMZA CHNTOUF'
      ]
    }
  ];

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
            <li onClick={handleLogout}>Deconnection</li> {/* Updated Deconnection link */}
          </ul>
        </div>
      )}
      <div className="absence-history-content">
        <h2 className="absence-history-title">HISTORIQUE D'ABSENCES:</h2>
        
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
      </div>
      <button className="back-button" onClick={() => window.history.back()}>Retour</button>
    </div>
  );
};

export default AbsenceHistory;
